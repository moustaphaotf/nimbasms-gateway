import { Sender, CreateSenderRequest, SenderStatus, UpdateSenderStatusRequest, PaginatedResponse } from '../types';
import { API_ENDPOINTS } from '../endpoints';
import { v1ApiClient } from '../client';

export const sendersService = {
  getSenders: async () => {
    const { data } = await v1ApiClient.get<PaginatedResponse<Sender>>(API_ENDPOINTS.SENDERS.LIST);
    return data;
  },

  createSender: async (sender: CreateSenderRequest) => {
    const { data } = await v1ApiClient.post<Sender>(API_ENDPOINTS.SENDERS.CREATE, sender);
    return data;
  },

  updateStatus: async (senderId: string, status: UpdateSenderStatusRequest) => {
    const { data } = await v1ApiClient.patch<Sender>(
      API_ENDPOINTS.SENDERS.UPDATE_STATUS(senderId),
      status
    );
    return data;
  },
};