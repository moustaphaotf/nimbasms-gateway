export type MessageStatus = "pending" | "sent" | "failure" | "delivered";

export interface Message {
  messageid: string;
  contact: string;
  message: string;
  sender: string;
  status: MessageStatus;
  created_at: string;
  operator: string;
  sent_at: string;
  message_len: number;
  owner: number;
}

export interface MessageFilters {
  offset?: number;
  limit?: number;
  search?: string;
  sender?: string;
  status?: string;
  ordering?: string;
  start_date?: string;
  end_date?: string;
}
