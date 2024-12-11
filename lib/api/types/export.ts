export type ReportType = "MANUAL" | "AUTOMATIC";
export type ExportStatus = "PENDING" | "SUCCESS" | "FAILED";

export interface Export {
  uid: string;
  report_url: string;
  report_type: ReportType;
  sender_name: string;
  start_date: string;
  end_date: string;
  file_size: number;
  status: ExportStatus;
  owner: number;
  exported_at: string;
  created_at: string;
}

export interface CreateExportRequest {
  sender_name: string;
  start_date: string;
  end_date: string;
}

export interface ExportFilters {
  offset?: number;
  limit?: number;
  search?: string;
  ordering?: string;
}