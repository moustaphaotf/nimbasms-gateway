import { InternalAxiosRequestConfig } from "axios";

export function membershipInterceptor(config: InternalAxiosRequestConfig) {
    const orgId = localStorage.getItem("orgId");
    if (orgId) {
      config.headers["X-Membership-ID"] = orgId;
    }
  return config;
}
