import axios, { AxiosError } from 'axios';
import { auth } from '@/lib/auth';
import { authService } from './services/auth.service';
import { toast } from 'react-toastify';

// Create base API client
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create v1 API client that includes the v1 prefix
export const v1ApiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_V1_PREFIX}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configure interceptors for both clients
[apiClient, v1ApiClient].forEach(client => {
  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      const token = auth.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config;

      // Handle 401 errors
      if (error.response?.status === 401 && !originalRequest?._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = auth.getRefreshToken();
          if (!refreshToken) {
            throw new Error('No refresh token');
          }

          // Try to refresh the token
          const { access } = await authService.refreshToken(refreshToken);
          
          // Update the token
          auth.setTokens(access, refreshToken);
          
          // Retry the original request
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${access}`;
          }
          return client(originalRequest);
        } catch (refreshError) {
          // If refresh fails, logout
          auth.logout();
          return Promise.reject(refreshError);
        }
      }

      // Handle error responses
      if (error.response?.data?.detail) {
        toast.error(error.response.data.detail);
      } else {
        // Fallback error message
        toast.error('Une erreur est survenue. Veuillez réessayer.');
      }

      return Promise.reject(error);
    }
  );
});

export default apiClient;