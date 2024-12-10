export type SenderStatus = "pending" | "approved" | "rejected";

export interface Sender {
  uid: string;
  name: string;
  status: SenderStatus;
  added_at: string;
}

export interface CreateSenderRequest {
  name: string;
  status: SenderStatus;
  owner: number;
}

export interface UpdateSenderStatusRequest {
  status: SenderStatus;
}

export interface SenderFilters {
  offset?: number;
  limit?: number;
  search?: string;
  status?: SenderStatus;
}