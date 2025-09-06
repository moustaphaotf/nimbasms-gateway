import { http, HttpResponse } from "msw";
import { API_ENDPOINTS } from "../../lib/api/endpoints";
import { AccountInfo } from "../../lib/api/types/account";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const accountHandlers = [
  // Get Account Info
  http.get(`${BASE_URL}/v1${API_ENDPOINTS.ACCOUNT.INFO}`, () => {
    const accountInfo: AccountInfo = {
      balance: 1500.75,
      api_key: "sk_1234567890abcdef",
      webhook_url: "https://example.com/webhook",
    };
    return HttpResponse.json(accountInfo);
  }),

  // Regenerate API Key
  http.post(`${BASE_URL}/v1${API_ENDPOINTS.ACCOUNT.REGENERATE_KEY}`, () => {
    const accountInfo: AccountInfo = {
      balance: 1500.75,
      api_key: "sk_" + Math.random().toString(36).substring(2, 18),
      webhook_url: "https://example.com/webhook",
    };
    return HttpResponse.json(accountInfo);
  }),

  // Update Webhook URL
  http.patch(
    `${BASE_URL}/v1${API_ENDPOINTS.ACCOUNT.WEBHOOK}`,
    async ({ request }) => {
      const { webhook_url } = (await request.json()) as {
        webhook_url: string | null;
      };

      const accountInfo: AccountInfo = {
        balance: 1500,
        api_key: "mtn_live_1234567890abcdef",
        webhook_url: webhook_url,
      };
      return HttpResponse.json(accountInfo);
    }
  ),
];
