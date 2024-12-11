import { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { auth } from '@/lib/auth';

export function authInterceptor(config: InternalAxiosRequestConfig) {
  const token = auth.getToken();
  if (token) {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}