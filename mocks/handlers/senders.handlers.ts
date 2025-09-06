import { http, HttpResponse } from "msw";
import { API_ENDPOINTS } from "../../lib/api/endpoints";
import { Sender, SenderStatus } from "../../lib/api/types/senders";
import { PaginatedResponse } from "../../lib/api/types/common";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Mock data generator
const generateMockSender = (id: number): Sender => ({
  uid: `sender-${id}`,
  name: `Sender ${id}`,
  status: (["pending", "accepted", "refused"] as SenderStatus[])[
    Math.floor(Math.random() * 3)
  ],
  added_at: new Date(
    Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
  ).toISOString(),
  owner: {
    email: `owner${id}@example.com`,
  },
});

export const sendersHandlers = [
  // Get Senders List
  http.get(`${BASE_URL}/v1${API_ENDPOINTS.SENDERS.LIST}`, ({ request }) => {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "20");
    const offset = parseInt(url.searchParams.get("offset") || "0");
    const status = url.searchParams.get("status");
    const search = url.searchParams.get("search");

    let mockSenders = Array.from({ length: 50 }, (_, i) =>
      generateMockSender(i + 1)
    );

    // Apply filters
    if (status) {
      mockSenders = mockSenders.filter((sender) => sender.status === status);
    }
    if (search) {
      mockSenders = mockSenders.filter(
        (sender) =>
          sender.name.toLowerCase().includes(search.toLowerCase()) ||
          sender.uid.toLowerCase().includes(search.toLowerCase())
      );
    }

    const paginatedSenders = mockSenders.slice(offset, offset + limit);

    const response: PaginatedResponse<Sender> = {
      count: mockSenders.length,
      next:
        offset + limit < mockSenders.length
          ? `${API_ENDPOINTS.SENDERS.LIST}?offset=${
              offset + limit
            }&limit=${limit}`
          : null,
      previous:
        offset > 0
          ? `${API_ENDPOINTS.SENDERS.LIST}?offset=${Math.max(
              0,
              offset - limit
            )}&limit=${limit}`
          : null,
      results: paginatedSenders,
    };
    return HttpResponse.json(response);
  }),

  // Create Sender
  http.post(`${BASE_URL}/v1${API_ENDPOINTS.SENDERS.CREATE}`, async ({ request }) => {
      const senderData = (await request.json()) as { name: string };

      const sender: Sender = {
        uid: `sender-${Math.floor(Math.random() * 1000) + 100}`,
        name: senderData.name,
        status: "pending",
        added_at: new Date().toISOString(),
        owner: {
          email: "owner@example.com",
        },
      };
      return HttpResponse.json(sender);
    }
  ),

  // Update Sender Status
  http.patch(
    `${BASE_URL}/v1/senders/:senderId/`,
    async ({ params, request }) => {
      const senderId = params.senderId as string;
      const statusData = (await request.json()) as { status: SenderStatus };

      const mockSender = generateMockSender(1);

      const updatedSender: Sender = {
        ...mockSender,
        uid: senderId,
        status: statusData.status,
        added_at: mockSender.added_at,
      };
      return HttpResponse.json(updatedSender);
    }
  ),
];
