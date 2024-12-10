import { 
  ChangePasswordRequest, 
  CreateUserRequest,
  RequestOTPResponse,
  ValidateOTPRequest,
  AuthTokens,
  RefreshTokenRequest,
  RefreshTokenResponse
} from '../types';
import { API_ENDPOINTS } from '../endpoints';
import apiClient from '../client';

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

  changePassword: async (passwords: ChangePasswordRequest) => {
    const { data } = await apiClient.post(
      API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
      passwords
    );
    return data;
  },

  createUser: async (user: CreateUserRequest) => {
    const { data } = await apiClient.post(
      API_ENDPOINTS.AUTH.CREATE_USER,
      user
    );
    return data;
  },
};