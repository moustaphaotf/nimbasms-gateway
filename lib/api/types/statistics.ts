export interface DailyUsage {
  day: string;
  count: number;
}

export interface Statistics {
  total_users: number;
  total_senders: number;
  total_messages_sent: number;
  total_messages_received: number;
  total_messages_failure: number;
  daily_usage: DailyUsage[];
}

export type CompanyUsageFilters = {
  end_date?: string;
  start_date?: string;
  sender?: string;
  owners?: string;
};

export interface CompanyUsage {
  owner__uid: string;
  owner__email: string;
  owner__company_name: string;
  message_count_sent: number;
  message_count_delivered: number;
  message_count_failure: number;
}
