import { http, HttpResponse } from "msw";
import { API_ENDPOINTS } from "../../lib/api/endpoints";
import { Export, ExportStatus, ReportType } from "../../lib/api/types/export";
import { PaginatedResponse } from "../../lib/api/types/common";
import { CreateExportFormData } from "../../lib/schemas/export.schema";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Mock data generator
const generateMockExport = (id: number): Export => ({
  uid: `export-${id}`,
  report_url: Math.random() > 0.5 ? `https://example.com/exports/export_${id}.csv` : "",
  report_type: ["MANUAL", "AUTOMATIC"][Math.floor(Math.random() * 2)] as ReportType,
  sender_name: `SENDER_${id}`,
  start_date: new Date(
    Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
  ).toISOString().split('T')[0],
  end_date: new Date(
    Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
  ).toISOString().split('T')[0],
  file_size: Math.floor(Math.random() * 5000000) + 50000,
  status: ["PENDING", "SUCCESS", "FAILED"][Math.floor(Math.random() * 3)] as ExportStatus,
  owner: Math.floor(Math.random() * 100) + 1,
  exported_at: new Date(
    Date.now() - Math.random() * 6 * 24 * 60 * 60 * 1000
  ).toISOString(),
  created_at: new Date(
    Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
  ).toISOString(),
});

export const exportsHandlers = [
  // Get Exports List
  http.get(`${BASE_URL}/v1${API_ENDPOINTS.EXPORTS.LIST}`, ({ request }) => {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "20");
    const offset = parseInt(url.searchParams.get("offset") || "0");
    const status = url.searchParams.get("status");

    let mockExports = Array.from({ length: 25 }, (_, i) =>
      generateMockExport(i + 1)
    );

    // Apply filters
    if (status) {
      mockExports = mockExports.filter((exp) => exp.status === status);
    }

    const paginatedExports = mockExports.slice(offset, offset + limit);

    const response: PaginatedResponse<Export> = {
      count: mockExports.length,
      next:
        offset + limit < mockExports.length
          ? `${API_ENDPOINTS.EXPORTS.LIST}?offset=${
              offset + limit
            }&limit=${limit}`
          : null,
      previous:
        offset > 0
          ? `${API_ENDPOINTS.EXPORTS.LIST}?offset=${Math.max(
              0,
              offset - limit
            )}&limit=${limit}`
          : null,
      results: paginatedExports,
    };
    return HttpResponse.json(response);
  }),

  // Create Export
  http.post(`${BASE_URL}/v1${API_ENDPOINTS.EXPORTS.CREATE}`, async ({ request }) => {
      const exportData = await request.json() as CreateExportFormData;

      const newExport: Export = {
        uid: `export-${Date.now()}`,
        report_url: "",
        report_type: "MANUAL",
        sender_name: exportData.sender_name || "DEFAULT_SENDER",
        start_date: exportData.start_date,
        end_date: exportData.end_date,
        file_size: 0,
        status: "PENDING",
        owner: 1,
        exported_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      };

      return HttpResponse.json(newExport);
    }
  ),
];
