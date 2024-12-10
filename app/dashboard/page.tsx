"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { RecentMessages } from "@/components/dashboard/recent-messages";
import { SMSBalance } from "@/components/dashboard/sms-balance";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useAccountInfo } from "@/hooks/api/use-account";
import { useMessages } from "@/hooks/api/use-messages";
import { Skeleton } from "@/components/ui/skeleton";

const chartData = [
  { name: "Jan", sent: 4000, received: 2400 },
  { name: "Feb", sent: 3000, received: 1398 },
  { name: "Mar", sent: 2000, received: 9800 },
  { name: "Apr", sent: 2780, received: 3908 },
  { name: "May", sent: 1890, received: 4800 },
  { name: "Jun", sent: 2390, received: 3800 },
  { name: "Jul", sent: 3490, received: 4300 },
];

export default function DashboardPage() {
  const { data: accountInfo, isLoading: isLoadingAccount } = useAccountInfo();
  const { data: messages, isLoading: isLoadingMessages } = useMessages({
    limit: 5,
    ordering: "-created_at",
  });

  return (
    <div className="space-y-6 p-6">
      <header className="border-b pb-4">
        <h1 className="text-2xl font-semibold">Tableau de Bord</h1>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Nombre de messages envoyés"
          value={messages?.count.toString() || "0"}
          change={42}
        />
        <StatsCard title="Contacts" value="52403" change={22} />
        <StatsCard title="Campagnes" value="32" change={-32} />
        <StatsCard title="DSO Moyen" value="7 jours" change={12} />
      </div>

      {/* Recent Messages and SMS Balance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Messages récents</h2>
          {isLoadingMessages ? (
            <div className="space-y-4">
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
              <Skeleton className="h-12" />
            </div>
          ) : (
            <RecentMessages messages={messages?.results || []} />
          )}
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4">Solde SMS</h2>
          {isLoadingAccount ? (
            <Skeleton className="h-[200px]" />
          ) : (
            <SMSBalance balance={accountInfo?.balance || 0} />
          )}
        </div>
      </div>

      {/* Chart */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Rapports</h2>
        <div className="h-[400px] rounded-lg border bg-card p-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Line
                type="monotone"
                dataKey="sent"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="received"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
