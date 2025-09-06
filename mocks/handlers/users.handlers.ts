import { http, HttpResponse } from "msw";
import { API_ENDPOINTS } from "../../lib/api/endpoints";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const usersHandlers = [
  // Get Users List (already handled in auth.handlers.ts)
  // Create User (already handled in auth.handlers.ts)
];
