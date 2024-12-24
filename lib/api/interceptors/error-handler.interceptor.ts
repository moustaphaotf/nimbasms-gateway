import { AxiosError, AxiosHeaders, AxiosInstance } from "axios";
import { auth } from "@/lib/auth";
import { API_CONSTANTS } from "@/lib/constants/api";
import { shouldRetry, calculateRetryDelay } from "../utils/retry";
import { rateLimiter } from "../utils/rate-limit";
import { toast } from "react-toastify";
import { ExtendedRequestConfig } from "../types/api";
import { ApiErrorResponse } from "../types";
import { authService } from "../services";
import { PUBLIC_ROUTES } from "@/lib/constants";

export async function handleApiError(
  error: AxiosError<ApiErrorResponse>,
  instance: AxiosInstance
): Promise<any> {
  if (!error.isAxiosError || !error.config) {
    return Promise.reject(error);
  }

  const config = error.config as ExtendedRequestConfig;
  const retryCount = config._retryCount || 0;

  // Check rate limiting
  if (rateLimiter.isRateLimited()) {
    const timeUntilReset = rateLimiter.getTimeUntilReset();
    toast.error(
      `Trop de requêtes. Réessayez dans ${Math.ceil(
        timeUntilReset / 1000
      )} secondes.`
    );
    return Promise.reject(error);
  }

  if (error.response) {
    const status = error.response.status;

    switch (status) {
      case API_CONSTANTS.HTTP_STATUS.UNAUTHORIZED: {
        return handleUnauthorizedError(error, instance, config);
      }

      case API_CONSTANTS.HTTP_STATUS.FORBIDDEN: {
        if (typeof window !== "undefined") {
          window.location.href = PUBLIC_ROUTES.FORBIDDEN;
        }
        return Promise.reject(error);
      }

      default: {
        return handleRetryableError(
          error,
          instance,
          status,
          config,
          retryCount
        );
      }
    }
  }

  toast.error("Une erreur de connexion est survenue. Veuillez réessayer.");
  return Promise.reject(error);
}

async function handleUnauthorizedError(
  error: AxiosError,
  instance: AxiosInstance,
  config: ExtendedRequestConfig
) {
  try {
    const refreshToken = auth.getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token");
    }

    const { access } = await authService.refreshToken(refreshToken);

    auth.setTokens(access, refreshToken);

    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }
    config.headers.Authorization = `Bearer ${access}`;

    return instance(config);
  } catch (refreshError) {
    auth.logout();
    return Promise.reject(error);
  }
}

async function handleRetryableError(
  error: AxiosError<ApiErrorResponse>,
  instance: AxiosInstance,
  status: number,
  config: ExtendedRequestConfig,
  retryCount: number
) {
  if (shouldRetry(status, retryCount)) {
    config._retryCount = retryCount + 1;
    const delay = calculateRetryDelay(retryCount);
    await new Promise((resolve) => setTimeout(resolve, delay));
    return instance(config);
  }

  if (error.response?.data?.detail) {
    let errorMessage = "";
    if (typeof error.response?.data.detail === "string") {
      errorMessage = error.response?.data.detail;
    } else if (Array.isArray(error.response?.data.detail)) {
      errorMessage = error.response?.data.detail[0];
    }

    if (errorMessage) {
      toast.error(errorMessage, {
        delay: 2000,
      });
    }
  }
  return Promise.reject(error);
}
