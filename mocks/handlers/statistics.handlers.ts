import { http, HttpResponse } from "msw";
import { API_ENDPOINTS } from "../../lib/api/endpoints";
import { Statistics, CompanyUsage } from "../../lib/api/types/statistics";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const statisticsHandlers = [
  // Get Statistics
  http.get(`${BASE_URL}/v1${API_ENDPOINTS.DASHBOARD.STATS}`, () => {
    const statistics: Statistics = {
      total_users: 125,
      total_senders: 8,
      total_messages_sent: 15420,
      total_messages_received: 14890,
      total_messages_failure: 655,
      daily_usage: Array.from({ length: 30 }, (_, i) => ({
        day: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        count: Math.floor(Math.random() * 200) + 50,
      })).reverse(),
    };
    return HttpResponse.json(statistics);
  }),

  // Get Company Usage
  http.get(`${BASE_URL}/v1${API_ENDPOINTS.DASHBOARD.REPORTING}`, ({ request }) => {
    const companyUsage: CompanyUsage[] = Array.from({ length: 5 }, (_, i) => ({
      owner__uid: `user-${i + 1}`,
      owner__email: `user${i + 1}@example.com`,
      owner__company_name: `Company ${i + 1}`,
      count: [
        {
          operator: "MTN",
          count: Math.floor(Math.random() * 500) + 100,
        },
        {
          operator: "Orange",
          count: Math.floor(Math.random() * 300) + 50,
        },
      ],
    }));

    return HttpResponse.json(companyUsage);
  }),
];
