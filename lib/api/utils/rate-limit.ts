import { API_CONSTANTS } from "@/lib/constants/api";

class RateLimiter {
  private requests: number[] = [];

  isRateLimited(): boolean {
    const now = Date.now();
    
    // Remove expired timestamps
    this.requests = this.requests.filter(
      timestamp => now - timestamp < API_CONSTANTS.RATE_LIMIT_WINDOW
    );

    // Check if we're over the limit
    if (this.requests.length >= API_CONSTANTS.RATE_LIMIT_REQUESTS) {
      return true;
    }

    // Add current request timestamp
    this.requests.push(now);
    return false;
  }

  getRemainingRequests(): number {
    const now = Date.now();
    this.requests = this.requests.filter(
      timestamp => now - timestamp < API_CONSTANTS.RATE_LIMIT_WINDOW
    );
    return API_CONSTANTS.RATE_LIMIT_REQUESTS - this.requests.length;
  }

  getTimeUntilReset(): number {
    if (this.requests.length === 0) return 0;
    const oldestRequest = Math.min(...this.requests);
    return Math.max(0, API_CONSTANTS.RATE_LIMIT_WINDOW - (Date.now() - oldestRequest));
  }
}

export const rateLimiter = new RateLimiter();