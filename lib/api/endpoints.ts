export const API_ENDPOINTS = {
  AUTH: {
    REQUEST_EMAIL_OTP: '/auth/request-email-otp/',
    REQUEST_MOBILE_OTP: '/auth/request-mobile-otp/',
    VALIDATE_EMAIL_OTP: '/auth/validate-email-otp/',
    VALIDATE_MOBILE_OTP: '/auth/validate-mobile-otp/',
    REFRESH_TOKEN: '/auth/refresh-token/',
    CHANGE_PASSWORD: '/auth/change-password/',
    CREATE_USER: '/auth/users/',
    USER_LIST: '/auth/users/',
  },
  ACCOUNT: {
    INFO: '/account/info/',
    REGENERATE_KEY: '/account/regenerate-key/',
    WEBHOOK: '/account/webhook/',
  },
  MESSAGES: {
    LIST: '/messages/',
    DETAIL: (messageId: string) => `/messages/${messageId}/`,
    EXPORT: '/messages/export/',
  },
  SENDERS: {
    LIST: '/senders/',
    CREATE: '/senders/',
    UPDATE_STATUS: (senderId: string) => `/senders/${senderId}/status/`,
  },
  DASHBOARD: {
    STATS: '/dashboard/stats/',
    RECENT_CONTACTS: '/dashboard/recent-contacts/',
    SMS_BALANCE: '/dashboard/sms-balance/',
    USAGE_CHART: '/dashboard/usage-chart/',
  },
} as const;