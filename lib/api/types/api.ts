import { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

export interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  _retryCount?: number;
}

export interface ExtendedRequestConfig extends InternalAxiosRequestConfig {
  _retryCount?: number;
}

export interface ApiErrorResponse {
  status: number;
  data?: {
    detail?: string;
    message?: string;
    [key: string]: unknown;
  };
}

export interface ApiError extends Error {
  config: ExtendedAxiosRequestConfig;
  response?: ApiErrorResponse;
  isAxiosError: boolean;
}
