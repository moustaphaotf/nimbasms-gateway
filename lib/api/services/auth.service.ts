import {
  RequestOTPResponse,
  ValidateOTPRequest,
  AuthTokens,
  RefreshTokenResponse,
  UpdateProfileRequest,
  ProfileInfo,
  CheckUserResponse,
  ValidateGoogleOTPRequest,
} from "../types";
import { API_ENDPOINTS } from "../endpoints";
import apiClient from "../client";
import { RegisterFormData } from "@/lib/schemas/auth.schema";

export const authService = {
  registerUser: async (userData: RegisterFormData) => {
    const { data } = await apiClient.post(
      API_ENDPOINTS.AUTH.CREATE_USER,
      userData
    );
    return data;
  },

  requestEmailOTP: async (email: string) => {
    const { data } = await apiClient.post<RequestOTPResponse>(
      API_ENDPOINTS.AUTH.REQUEST_EMAIL_OTP,
      { email }
    );
    return data;
  },

  requestGoogleOTP: async (email: string) => {
    const { data } = await apiClient.post<CheckUserResponse>(
      API_ENDPOINTS.AUTH.REQUEST_GOOGLE_OTP,
      { email }
    );
    return data;
  },

  validateGoogleOTP: async (payload: ValidateGoogleOTPRequest) => {
    const { data } = await apiClient.post<AuthTokens>(
      API_ENDPOINTS.AUTH.VALIDATE_GOOGLE_OTP,
      payload
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
