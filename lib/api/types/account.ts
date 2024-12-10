export interface AccountInfo {
  balance: number;
  api_key: string;
  webhook_url: string | null;
}

export interface WebhookUpdate {
  webhook_url: string | null;
}