import { http, HttpResponse } from "msw";
import { API_ENDPOINTS } from "../../lib/api/endpoints";
import type {
  RequestOTPResponse,
  AuthTokens,
  RefreshTokenResponse,
  ProfileInfo,
  User,
} from "../../lib/api/types/auth";
import type { PaginatedResponse } from "../../lib/api/types/common";
import { createTokenForUser, MOCK_USERS, decodeJWT } from "../utils/jwt";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const authHandlers = [
  // Request Email OTP
  http.post(`${API_ENDPOINTS.AUTH.REQUEST_EMAIL_OTP}`, async ({ request }) => {
    const { email } = (await request.json()) as { email: string };
    console.log({ email });
    // Check if email is one of our mock users
    const validEmails = Object.keys(MOCK_USERS);
    if (!validEmails.includes(email)) {
      return HttpResponse.json({ error: "User not found" }, { status: 404 });
    }

    const response: RequestOTPResponse = {
      pin_uid: `mock-pin-uid-${email.split("@")[0]}`,
      message: `OTP sent to ${email}`,
    };

    return HttpResponse.json(response);
  }),

  // Request Mobile OTP
  http.post(
    `${BASE_URL}${API_ENDPOINTS.AUTH.REQUEST_MOBILE_OTP}`,
    async ({ request }) => {
      const { phone } = (await request.json()) as { phone: string };

      const response: RequestOTPResponse = {
        pin_uid: "mock-pin-uid-456",
        message: `OTP sent to ${phone}`,
      };
      return HttpResponse.json(response);
    }
  ),

  // Validate Email OTP
  http.post(
    `${BASE_URL}${API_ENDPOINTS.AUTH.VALIDATE_EMAIL_OTP}`,
    async ({ request }) => {
      const { pin_uid, otp } = (await request.json()) as {
        pin_uid: string;
        otp: string;
      };

      // Mock validation - accept OTP 123456
      if (otp === "123456") {
        // Extract email from pin_uid
        const emailPrefix = pin_uid.replace("mock-pin-uid-", "");
        const email = `${emailPrefix}@nimbasms.com`;

        // Check if user exists
        if (!MOCK_USERS[email]) {
          return HttpResponse.json({ error: "Invalid user" }, { status: 400 });
        }

        // Create JWT token with user data
        const accessToken = createTokenForUser(email);

        const tokens: AuthTokens = {
          access: accessToken,
          refresh: `refresh-token-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2)}`,
        };
        return HttpResponse.json(tokens);
      }

      return HttpResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }
  ),

  // Validate Mobile OTP
  http.post(
    `${BASE_URL}${API_ENDPOINTS.AUTH.VALIDATE_MOBILE_OTP}`,
    async ({ request }) => {
      const { pin_uid, otp } = (await request.json()) as {
        pin_uid: string;
        otp: string;
      };

      // Simulate OTP validation
      if (otp === "123456") {
        const tokens: AuthTokens = {
          access: "mock-access-token-" + Date.now(),
          refresh: "mock-refresh-token-" + Date.now(),
        };
        return HttpResponse.json(tokens);
      }

      return HttpResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }
  ),

  // Refresh Token
  http.post(
    `${BASE_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`,
    async ({ request }) => {
      const { refresh } = (await request.json()) as { refresh: string };

      const response: RefreshTokenResponse = {
        access: "mock-new-access-token-" + Date.now(),
      };
      return HttpResponse.json(response);
    }
  ),

  // Profile Info
  http.get(
    `${BASE_URL}${API_ENDPOINTS.AUTH.PROFILE_INFO}`,
    async ({ request }) => {
      const authHeader = request.headers.get("Authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return HttpResponse.json(
          { error: "Authentication required" },
          { status: 401 }
        );
      }

      // Extract and decode JWT token
      const token = authHeader.replace("Bearer ", "");
      const decodedToken = decodeJWT(token);

      if (!decodedToken) {
        return HttpResponse.json({ error: "Invalid token" }, { status: 401 });
      }

      const profile: ProfileInfo = {
        first_name: decodedToken.first_name,
        last_name: decodedToken.last_name,
        email: decodedToken.email,
        phone: decodedToken.phone,
      };

      return HttpResponse.json(profile);
    }
  ),

  // Update Profile
  http.patch(
    `${BASE_URL}${API_ENDPOINTS.AUTH.PROFILE_INFO}`,
    async ({ request }) => {
      const authHeader = request.headers.get("Authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return HttpResponse.json(
          { error: "Authentication required" },
          { status: 401 }
        );
      }

      // Extract and decode JWT token
      const token = authHeader.replace("Bearer ", "");
      const decodedToken = decodeJWT(token);

      if (!decodedToken) {
        return HttpResponse.json({ error: "Invalid token" }, { status: 401 });
      }

      const updateData = (await request.json()) as Partial<ProfileInfo>;

      const profile: ProfileInfo = {
        first_name: updateData.first_name || decodedToken.first_name,
        last_name: updateData.last_name || decodedToken.last_name,
        email: updateData.email || decodedToken.email,
        phone: updateData.phone || decodedToken.phone,
      };
      return HttpResponse.json(profile);
    }
  ),

  // Get Users List
  http.get(`${BASE_URL}${API_ENDPOINTS.AUTH.USER_LIST}`, ({ request }) => {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const offset = parseInt(url.searchParams.get("offset") || "0");

    const mockUsers: User[] = Array.from({ length: 25 }, (_, i) => ({
      uid: `user-${i + 1}`,
      email: `user${i + 1}@example.com`,
      phone: `+224625${String(i + 1).padStart(6, "0")}`,
      first_name: `User${i + 1}`,
      last_name: "Test",
      created_at: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - i * 12 * 60 * 60 * 1000).toISOString(),
    }));

    const paginatedUsers = mockUsers.slice(offset, offset + limit);

    const response: PaginatedResponse<User> = {
      count: mockUsers.length,
      next:
        offset + limit < mockUsers.length
          ? `${API_ENDPOINTS.AUTH.USER_LIST}?offset=${
              offset + limit
            }&limit=${limit}`
          : null,
      previous:
        offset > 0
          ? `${API_ENDPOINTS.AUTH.USER_LIST}?offset=${Math.max(
              0,
              offset - limit
            )}&limit=${limit}`
          : null,
      results: paginatedUsers,
    };
    return HttpResponse.json(response);
  }),

  // Create User
  http.post(
    `${BASE_URL}${API_ENDPOINTS.AUTH.CREATE_USER}`,
    async ({ request }) => {
      const userData = (await request.json()) as Partial<User>;

      const user: User = {
        uid: `user-${Math.floor(Math.random() * 1000) + 100}`,
        email: userData.email || "",
        phone: userData.phone || "",
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      return HttpResponse.json(user);
    }
  ),
];
