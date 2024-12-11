export const API_CONSTANTS = {
    // Retry configuration
    MAX_RETRIES: 3,
    INITIAL_RETRY_DELAY: 500, // 500ms
    MAX_RETRY_DELAY: 10000, // 10 seconds
    RETRY_BACKOFF_FACTOR: 2,
    RETRY_RANDOM_FACTOR: 0.2, // ±20% random jitter
  
    // Rate limiting
    RATE_LIMIT_REQUESTS: 50, // requests
    RATE_LIMIT_WINDOW: 60000, // 1 minute in milliseconds
    
    // HTTP Status codes
    HTTP_STATUS: {
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      SERVER_ERROR_START: 500,
      SERVER_ERROR_END: 599
    }
  } as const;