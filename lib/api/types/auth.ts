export interface User {
  id: number;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
}

export interface AccessTokenUser {
  userId: string;
  isStaff: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface DecodedToken {
  token_type: "access";
  exp: number;
  iat: number;
  jti: string;
  user_id: string;
  is_staff: boolean;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
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

export interface ProfileInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface UpdateProfileRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
}
