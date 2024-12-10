import { AccountInfo, WebhookUpdate } from '../types';
import { API_ENDPOINTS } from '../endpoints';
import { v1ApiClient } from '../client';

export const accountService = {
  getInfo: async () => {
    const { data } = await v1ApiClient.get<AccountInfo>(API_ENDPOINTS.ACCOUNT.INFO);
    return data;
  },

  regenerateApiKey: async () => {
    const { data } = await v1ApiClient.post<AccountInfo>(API_ENDPOINTS.ACCOUNT.REGENERATE_KEY);
    return data;
  },

  updateWebhook: async (webhookUrl: string | null) => {
    const { data } = await v1ApiClient.patch<AccountInfo>(API_ENDPOINTS.ACCOUNT.WEBHOOK, {
      webhook_url: webhookUrl,
    });
    return data;
  },
};