import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import {
  authInterceptor,
  handleApiError,
  rateLimitInterceptor,
} from "./interceptors";
import { membershipInterceptor } from "./interceptors/membership.interceptor";

function createApiClient(baseURL: string): AxiosInstance {
  const client = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptors
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Apply interceptors in sequence
      return Promise.resolve(config)
        .then(rateLimitInterceptor)
        .then(authInterceptor)
        .then(membershipInterceptor);
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  client.interceptors.response.use(
    (response) => response,
    (error) => handleApiError(error, client)
  );

  return client;
}

// Create base API client
const apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || "");

export const unauthenticatedClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create v1 API client
export const v1ApiClient = createApiClient(
  process.env.NEXT_PUBLIC_API_V1_PREFIX || ""
);

export default apiClient;
