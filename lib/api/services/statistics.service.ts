import {
  CompanyUsage,
  Statistics,
  CompanyUsageFilters,
} from "../types/statistics";
import { API_ENDPOINTS } from "../endpoints";
import { v1ApiClient } from "../client";

export const statisticsService = {
  getStatistics: async () => {
    const { data } = await v1ApiClient.get<Statistics>(
      API_ENDPOINTS.DASHBOARD.STATS
    );
    return data;
  },
  getCompanyUsage: async (params: CompanyUsageFilters = {}) => {
    const { data } = await v1ApiClient.get<CompanyUsage[]>(
      API_ENDPOINTS.DASHBOARD.REPORTING,
      { params }
    );
    return data;
  },
};
