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

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}