import {
  Sender,
  CreateSenderRequest,
  SenderStatus,
  UpdateSenderStatusRequest,
  PaginatedResponse,
  SenderFilters,
} from "../types";
import { API_ENDPOINTS } from "../endpoints";
import { v1ApiClient } from "../client";

export const sendersService = {
  getSenders: async (filters?: SenderFilters) => {
    const { data } = await v1ApiClient.get<PaginatedResponse<Sender>>(
      API_ENDPOINTS.SENDERS.LIST,
      { params: filters }
    );
    return data;
  },

  createSender: async (sender: CreateSenderRequest) => {
    const { data } = await v1ApiClient.post<Sender>(
      API_ENDPOINTS.SENDERS.CREATE,
      sender
    );
    return data;
  },

  updateStatus: async (senderId: string, status: UpdateSenderStatusRequest) => {
    const { data } = await v1ApiClient.patch<Sender>(
      API_ENDPOINTS.SENDERS.DETAIL(senderId),
      status
    );
    return data;
  },
};
