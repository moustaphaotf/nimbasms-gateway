export interface Message {
  id: string;
  contact: string;
  content: string;
  status: "delivered" | "failed" | "pending";
  created_at: string;
}

export interface MessageFilters {
  offset?: number;
  limit?: number;
  search?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
}