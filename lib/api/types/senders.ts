export type SenderStatus = "pending" | "accepted" | "refused";

export interface Sender {
  uid: string;
  name: string;
  status: SenderStatus;
  added_at: string;
  owner: {
    email: string;
  }
}

export interface SenderResponse extends Sender {
  owner: {
    email: string;
    first_name: string;
    last_name: string;
  };
}

export interface UpdateSenderStatusRequest {
  status: SenderStatus;
}

export interface SenderFilters {
  offset?: number;
  limit?: number;
  search?: string;
  status?: SenderStatus;
  ordering?: string;
}
