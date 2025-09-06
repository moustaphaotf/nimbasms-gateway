import { DecodedToken } from "../../lib/api/types/auth";

// Simple JWT encoder/decoder for mocking (not for production)
const JWT_SECRET = "mock-jwt-secret-key";

// Base64 URL encode
function base64UrlEncode(str: string): string {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

// Base64 URL decode
function base64UrlDecode(str: string): string {
  str += "=".repeat((4 - (str.length % 4)) % 4);
  return atob(str.replace(/-/g, "+").replace(/_/g, "/"));
}

// Create JWT token
export function createJWT(payload: DecodedToken): string {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const headerEncoded = base64UrlEncode(JSON.stringify(header));
  const payloadEncoded = base64UrlEncode(JSON.stringify(payload));

  // Simple signature (for mocking only)
  const signature = base64UrlEncode(
    `${headerEncoded}.${payloadEncoded}.${JWT_SECRET}`
  );

  return `${headerEncoded}.${payloadEncoded}.${signature}`;
}

// Decode JWT token
export function decodeJWT(token: string): DecodedToken | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = JSON.parse(base64UrlDecode(parts[1]));
    return payload as DecodedToken;
  } catch {
    return null;
  }
}

// Mock users data
export const MOCK_USERS: Record<
  string,
  Omit<DecodedToken, "token_type" | "exp" | "iat" | "jti">
> = {
  "admin@nimbasms.com": {
    user_id: "user-admin-001",
    is_staff: true,
    first_name: "Super",
    last_name: "Admin",
    email: "admin@nimbasms.com",
    phone: "+224627010001",
    organizations: [
      {
        uid: "org-nimba-001",
        is_active: true,
        company_name: process.env.NEXT_PUBLIC_APP_NAME!,
        role: "Owner",
      },
    ],
  },
  "owner@nimbasms.com": {
    user_id: "user-owner-001",
    is_staff: false,
    first_name: "Organization",
    last_name: "Owner",
    email: "owner@nimbasms.com",
    phone: "+224627010002",
    organizations: [
      {
        uid: "org-nimba-001",
        is_active: true,
        company_name: process.env.NEXT_PUBLIC_APP_NAME!,
        role: "Owner",
      },
    ],
  },
  "developer@nimbasms.com": {
    user_id: "user-dev-001",
    is_staff: false,
    first_name: "Lead",
    last_name: "Developer",
    email: "developer@nimbasms.com",
    phone: "+224627010003",
    organizations: [
      {
        uid: "org-nimba-001",
        is_active: true,
        company_name: process.env.NEXT_PUBLIC_APP_NAME!,
        role: "Developer",
      },
    ],
  },
  "member@nimbasms.com": {
    user_id: "user-member-001",
    is_staff: false,
    first_name: "Team",
    last_name: "Member",
    email: "member@nimbasms.com",
    phone: "+224627010004",
    organizations: [
      {
        uid: "org-nimba-001",
        is_active: true,
        company_name: process.env.NEXT_PUBLIC_APP_NAME!,
        role: "Member",
      },
    ],
  },
};

export function createTokenForUser(email: string): string {
  const userData = MOCK_USERS[email as keyof typeof MOCK_USERS];
  if (!userData) {
    throw new Error(`User not found: ${email}`);
  }

  const now = Math.floor(Date.now() / 1000);
  const payload: DecodedToken = {
    token_type: "access",
    exp: now + 24 * 60 * 60, // 24 hours
    iat: now,
    jti: `jti-${Date.now()}-${Math.random().toString(36).substring(2)}`,
    ...userData,
  };

  return createJWT(payload);
}
