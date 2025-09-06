import { Message, MessageFilters, PaginatedResponse } from "../types";
import { API_ENDPOINTS } from "../endpoints";
import { v1ApiClient } from "../client";
import {
  GrouppedMessageFormData,
  SingleMessageFormData,
  UploadSendMessagesFormData,
} from "@/lib/schemas/message.shema";
import { headers } from "next/headers";

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

  createMessage: async (message: SingleMessageFormData) => {
    const { data } = await v1ApiClient.post<Message>(
      API_ENDPOINTS.MESSAGES.LIST,
      message
    );
    return data;
  },

  sendUploadedMessages: async (body: UploadSendMessagesFormData) => {
    const formData = new FormData();
    formData.append("column_mapping", JSON.stringify(body.column_mapping));
    body.file && formData.append("file", body.file);

    const { data } = await v1ApiClient.post(
      API_ENDPOINTS.MESSAGES.UPLOAD_SEND,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return data;
  },

  sendGrouppedMessages: async (body: Omit<GrouppedMessageFormData, "contacts"> & { contacts: string[]}) => {
    const { data } = await v1ApiClient.post(
      API_ENDPOINTS.MESSAGES.GROUP_SEND,
      body
    );
    return data;
  },

  requestExport: async () => {
    const { data } = await v1ApiClient.post(API_ENDPOINTS.MESSAGES.EXPORT);
    return data;
  },
};
