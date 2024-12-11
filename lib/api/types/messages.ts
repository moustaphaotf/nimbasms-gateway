export type MessageStatus = "pending" | "sent" | "failure" | "delivered";

export interface Message {
  messageid: string;
  contact: string;
  message: string;
  sender: string;
  status: MessageStatus;
  created_at: string;
  operator: "string";
  sent_at: "2024-12-11T02:40:44.543Z";
  message_len: 0;
  owner: 0;
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
