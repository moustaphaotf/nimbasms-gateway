import { Message, MessageFilters, PaginatedResponse } from "../types";
import { API_ENDPOINTS } from "../endpoints";
import { v1ApiClient } from "../client";
import { CreateMessageFormData } from "@/lib/schemas/message.shema";

export const messagesService = {
  getMessages: async (filters?: MessageFilters) => {
    const { data } = await v1ApiClient.get<PaginatedResponse<Message>>(
      API_ENDPOINTS.MESSAGES.LIST,
      {
        params: filters,
      }
    );
    return data;
  },

  getMessage: async (messageId: string) => {
    const { data } = await v1ApiClient.get<Message>(
      API_ENDPOINTS.MESSAGES.DETAIL(messageId)
    );
    return data;
  },

  createMessage: async (message: CreateMessageFormData) => {
    const { data } = await v1ApiClient.post<Message>(
      API_ENDPOINTS.MESSAGES.LIST,
      message
    );
    return data;
  },

  requestExport: async () => {
    const { data } = await v1ApiClient.post(API_ENDPOINTS.MESSAGES.EXPORT);
    return data;
  },
};
