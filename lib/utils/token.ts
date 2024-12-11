import { jwtDecode } from "jwt-decode";
import { DecodedToken, AccessTokenUser } from "@/lib/api/types";

export function parseToken(token: string): AccessTokenUser | null {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    
    return {
      userId: decoded.user_id,
      isStaff: decoded.is_staff,
      firstName: decoded.first_name,
      lastName: decoded.last_name,
      email: decoded.email,
      phone: decoded.phone,
    };
  } catch (error) {
    console.error("Error parsing token:", error);
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
}