export interface User {
  id: number;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface RequestOTPResponse {
  pin_uid: string;
  message: string;
}

export interface ValidateOTPRequest {
  pin_uid: string;
  otp: string;
}

export interface RefreshTokenRequest {
  refresh: string;
}

export interface RefreshTokenResponse {
  access: string;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

export interface CreateUserRequest {
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  password: string;
}