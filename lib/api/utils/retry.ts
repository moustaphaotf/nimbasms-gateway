import { API_CONSTANTS } from "@/lib/constants/api";

export function calculateRetryDelay(retryCount: number): number {
  // Calculate base delay with exponential backoff
  const baseDelay = Math.min(
    API_CONSTANTS.INITIAL_RETRY_DELAY * Math.pow(API_CONSTANTS.RETRY_BACKOFF_FACTOR, retryCount),
    API_CONSTANTS.MAX_RETRY_DELAY
  );

  // Add random jitter
  const jitter = baseDelay * API_CONSTANTS.RETRY_RANDOM_FACTOR;
  const randomJitter = Math.random() * jitter * 2 - jitter; // Random value between -jitter and +jitter

  return baseDelay + randomJitter;
}

export function shouldRetry(status: number, retryCount: number): boolean {
  // Don't retry if we've hit the max retries
  if (retryCount >= API_CONSTANTS.MAX_RETRIES) {
    return false;
  }

  // Only retry server errors
  return status >= API_CONSTANTS.HTTP_STATUS.SERVER_ERROR_START && 
         status <= API_CONSTANTS.HTTP_STATUS.SERVER_ERROR_END;
}