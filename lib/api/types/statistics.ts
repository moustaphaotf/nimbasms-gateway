export interface DailyUsage {
  day: string;
  count: number;
}

export interface Statistics {
  total_users: number;
  total_senders: number;
  total_messages_sent: number;
  total_messages_received: number;
  daily_usage: DailyUsage[];
}
