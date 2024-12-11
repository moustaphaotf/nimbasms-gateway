export const API_ENDPOINTS = {
  AUTH: {
    REQUEST_EMAIL_OTP: "/auth/email-token",
    REQUEST_MOBILE_OTP: "/auth/mobile-token",
    VALIDATE_EMAIL_OTP: "/auth/email-token/validate",
    VALIDATE_MOBILE_OTP: "/auth/mobile-token/confirm",
    REFRESH_TOKEN: "/auth/revoke-token",
    CHANGE_PASSWORD: "/auth/change-password",
    CREATE_USER: "/auth/create",
    USER_LIST: "/auth/user-list",
    PROFILE_INFO: "/auth/profile-info",
  },
  ACCOUNT: {
    INFO: "/account/info/",
    REGENERATE_KEY: "/account/regenerate-key/",
    WEBHOOK: "/account/webhook/",
  },
  MESSAGES: {
    LIST: "/messages/",
    DETAIL: (messageId: string) => `/messages/${messageId}/`,
    EXPORT: "/messages/export/",
  },
  SENDERS: {
    LIST: "/senders/",
    CREATE: "/senders/",
    DETAIL: (senderId: string) => `/senders/${senderId}/`,
  },
  DASHBOARD: {
    STATS: "/statistics/",
  },
  EXPORTS: {
    LIST: "/exports/",
    CREATE: "/exports/",
  }
} as const;
