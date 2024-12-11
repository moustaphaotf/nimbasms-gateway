import { Statistics } from '../types/statistics';
import { API_ENDPOINTS } from '../endpoints';
import { v1ApiClient } from '../client';

export const statisticsService = {
  getStatistics: async () => {
    const { data } = await v1ApiClient.get<Statistics>(API_ENDPOINTS.DASHBOARD.STATS);
    return data;
  },
};