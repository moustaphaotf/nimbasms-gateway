import {
  RequestOTPResponse,
  ValidateOTPRequest,
  AuthTokens,
  RefreshTokenResponse,
  UpdateProfileRequest,
  ProfileInfo,
} from "../types";
import { API_ENDPOINTS } from "../endpoints";
import apiClient from "../client";

export const authService = {
  requestEmailOTP: async (email: string) => {
    const { data } = await apiClient.post<RequestOTPResponse>(
      API_ENDPOINTS.AUTH.REQUEST_EMAIL_OTP,
      { email }
    );
    return data;
  },

  requestMobileOTP: async (phone: string) => {
    const { data } = await apiClient.post<RequestOTPResponse>(
      API_ENDPOINTS.AUTH.REQUEST_MOBILE_OTP,
      { phone }
    );
    return data;
  },

  validateEmailOTP: async (payload: ValidateOTPRequest) => {
    const { data } = await apiClient.post<AuthTokens>(
      API_ENDPOINTS.AUTH.VALIDATE_EMAIL_OTP,
      payload
    );
    return data;
  },

  validateMobileOTP: async (payload: ValidateOTPRequest) => {
    const { data } = await apiClient.post<AuthTokens>(
      API_ENDPOINTS.AUTH.VALIDATE_MOBILE_OTP,
      payload
    );
    return data;
  },

  refreshToken: async (refresh: string) => {
    const { data } = await apiClient.post<RefreshTokenResponse>(
      API_ENDPOINTS.AUTH.REFRESH_TOKEN,
      { refresh }
    );
    return data;
  },
  getProfileInfo: async () => {
    const { data } = await apiClient.get<ProfileInfo>(
      API_ENDPOINTS.AUTH.PROFILE_INFO
    );
    return data;
  },
  updateProfile: async (data: UpdateProfileRequest) => {
    const { data: response } = await apiClient.patch<ProfileInfo>(
      API_ENDPOINTS.AUTH.PROFILE_INFO,
      data
    );
    return response;
  },
};
