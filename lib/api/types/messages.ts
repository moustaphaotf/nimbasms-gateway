export type MessageStatus = "pending" | "sent" | "failure" | "delivered";

export interface Message {
  id: string;
  contact: string;
  content: string;
  status: MessageStatus;
  created_at: string;
}

export interface MessageFilters {
  offset?: number;
  limit?: number;
  search?: string;
  status?: string;
  ordering?: string;
  start_date?: string;
  end_date?: string;
}
