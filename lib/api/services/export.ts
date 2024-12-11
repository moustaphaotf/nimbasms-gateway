import { Export, ExportFilters } from '../types/export';
import { PaginatedResponse } from '../types/common';
import { API_ENDPOINTS } from '../endpoints';
import { v1ApiClient } from '../client';
import { CreateExportFormData } from '@/lib/schemas/export.schema';

export const exportsService = {
  getExports: async (filters?: ExportFilters) => {
    const { data } = await v1ApiClient.get<PaginatedResponse<Export>>(
      API_ENDPOINTS.EXPORTS.LIST,
      { params: filters }
    );
    return data;
  },

  createExport: async (exportData: CreateExportFormData) => {
    const { data } = await v1ApiClient.post<Export>(
      API_ENDPOINTS.EXPORTS.CREATE,
      exportData
    );
    return data;
  },
};