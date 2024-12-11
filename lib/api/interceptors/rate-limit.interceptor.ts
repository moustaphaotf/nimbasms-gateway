import { InternalAxiosRequestConfig } from 'axios';
import { rateLimiter } from '../utils/rate-limit';

export function rateLimitInterceptor(config: InternalAxiosRequestConfig) {
  if (rateLimiter.isRateLimited()) {
    return Promise.reject(new Error('Rate limit exceeded'));
  }
  return config;
}