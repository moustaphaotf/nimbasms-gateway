import { http, HttpResponse } from "msw";
import { API_ENDPOINTS } from "../../lib/api/endpoints";
import { Message, MessageStatus } from "../../lib/api/types/messages";
import { PaginatedResponse } from "../../lib/api/types/common";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Mock data generator
const generateMockMessage = (id: number): Message => ({
  messageid: `msg-${id}`,
  contact: `+224625${String(id).padStart(6, "0")}`,
  message: `Message de test ${id}`,
  sender: "SENDER",
  status: (["pending", "sent", "failure", "delivered"] as MessageStatus[])[
    Math.floor(Math.random() * 4)
  ],
  created_at: new Date(
    Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
  ).toISOString(),
  operator: ["MTN", "Orange", "Moov"][Math.floor(Math.random() * 3)],
  sent_at: new Date(
    Date.now() - Math.random() * 6 * 24 * 60 * 60 * 1000
  ).toISOString(),
  message_len: `Message de test ${id}`.length,
  owner: {
    email: "owner@example.com",
    first_name: "John",
    last_name: "Doe",
  },
});

export const messagesHandlers = [
  // Get Messages List
  http.get(`${BASE_URL}/v1${API_ENDPOINTS.MESSAGES.LIST}`, ({ request }) => {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "20");
    const offset = parseInt(url.searchParams.get("offset") || "0");
    const status = url.searchParams.get("status");
    const search = url.searchParams.get("search");

    let mockMessages = Array.from({ length: 150 }, (_, i) =>
      generateMockMessage(i + 1)
    );

    // Apply filters
    if (status) {
      mockMessages = mockMessages.filter((msg) => msg.status === status);
    }
    if (search) {
      mockMessages = mockMessages.filter(
        (msg) =>
          msg.message.toLowerCase().includes(search.toLowerCase()) ||
          msg.contact.includes(search)
      );
    }

    const paginatedMessages = mockMessages.slice(offset, offset + limit);

    const response: PaginatedResponse<Message> = {
      count: mockMessages.length,
      next:
        offset + limit < mockMessages.length
          ? `${API_ENDPOINTS.MESSAGES.LIST}?offset=${
              offset + limit
            }&limit=${limit}`
          : null,
      previous:
        offset > 0
          ? `${API_ENDPOINTS.MESSAGES.LIST}?offset=${Math.max(
              0,
              offset - limit
            )}&limit=${limit}`
          : null,
      results: paginatedMessages,
    };
    return HttpResponse.json(response);
  }),

  // Get Single Message
  http.get(`${BASE_URL}/v1/messages/:messageId/`, ({ params }) => {
    const messageId = parseInt(params.messageId as string);

    if (isNaN(messageId)) {
      return HttpResponse.json(
        { error: "Invalid message ID" },
        { status: 400 }
      );
    }

    return HttpResponse.json(generateMockMessage(messageId));
  }),

  // Create Message
  http.post(
    `${BASE_URL}/v1${API_ENDPOINTS.MESSAGES.LIST}`,
    async ({ request }) => {
      const messageData = (await request.json()) as {
        message: string;
        contact: string;
        sender?: string;
      };

      const message: Message = {
        messageid: `msg-${Math.floor(Math.random() * 1000) + 1000}`,
        contact: messageData.contact,
        message: messageData.message,
        sender: messageData.sender || "SENDER",
        status: "pending",
        created_at: new Date().toISOString(),
        operator: ["MTN", "Orange", "Moov"][Math.floor(Math.random() * 3)],
        sent_at: new Date().toISOString(),
        message_len: messageData.message.length,
        owner: {
          email: "owner@example.com",
          first_name: "John",
          last_name: "Doe",
        },
      };
      return HttpResponse.json(message);
    }
  ),

  // Upload and Send Messages
  http.post(
    `${BASE_URL}/v1${API_ENDPOINTS.MESSAGES.UPLOAD_SEND}`,
    async ({ request }) => {
      // Simulate file upload processing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return HttpResponse.json({
        success: true,
        message: "Messages uploaded and queued for sending",
        data: {
          total_messages: Math.floor(Math.random() * 100) + 50,
          queued: Math.floor(Math.random() * 100) + 50,
          failed: Math.floor(Math.random() * 5),
          batch_id: "batch_" + Date.now(),
        },
      });
    }
  ),

  // Send Grouped Messages
  http.post(
    `${BASE_URL}/v1${API_ENDPOINTS.MESSAGES.GROUP_SEND}`,
    async ({ request }) => {
      const { message, contacts, sender } = (await request.json()) as {
        message: string;
        contacts: string[];
        sender?: string;
      };

      return HttpResponse.json({
        success: true,
        message: `Message sent to ${contacts.length} contacts`,
        data: {
          total_recipients: contacts.length,
          queued: contacts.length,
          failed: 0,
          batch_id: "group_" + Date.now(),
          estimated_cost: contacts.length * 25,
          currency: "XOF",
        },
      });
    }
  ),

  // Request Export
  http.post(
    `${BASE_URL}/v1${API_ENDPOINTS.MESSAGES.EXPORT}`,
    async ({ request }) => {
      const filters = (await request.json()) as Record<string, any>;

      return HttpResponse.json({
        success: true,
        message: "Export request created",
        data: {
          export_id: "export_" + Date.now(),
          status: "processing",
          estimated_completion: new Date(
            Date.now() + 5 * 60 * 1000
          ).toISOString(),
          download_url: null,
        },
      });
    }
  ),
];
