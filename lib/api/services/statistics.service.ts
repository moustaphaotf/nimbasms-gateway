import { ApiResponse } from '../types';
import { API_ENDPOINTS } from '../endpoints';
import apiClient from '../client';

interface DashboardStats {
  messagesSent: number;
  contacts: number;
  campaigns: number;
  averageDSO: number;
}

interface UsageChartData {
  date: string;
  sent: number;
  received: number;
}

export const dashboardService = {
  getStats: async () => {
    const response = await apiClient.get<ApiResponse<DashboardStats>>(
      API_ENDPOINTS.DASHBOARD.STATS
    );
    return response.data;
  },

  getRecentContacts: async () => {
    const response = await apiClient.get(API_ENDPOINTS.DASHBOARD.RECENT_CONTACTS);
    return response.data;
  },

  getSMSBalance: async () => {
    const response = await apiClient.get<ApiResponse<number>>(
      API_ENDPOINTS.DASHBOARD.SMS_BALANCE
    );
    return response.data;
  },

  getUsageChart: async (period: 'daily' | 'monthly' | 'yearly' = 'monthly') => {
    const response = await apiClient.get<ApiResponse<UsageChartData[]>>(
      API_ENDPOINTS.DASHBOARD.USAGE_CHART,
      {
        params: { period },
      }
    );
    return response.data;
  },
};