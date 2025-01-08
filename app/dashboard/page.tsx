"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { RecentMessages } from "@/components/dashboard/recent-messages";
import { SMSBalance } from "@/components/dashboard/sms-balance";
import { useAccountInfo } from "@/hooks/api/use-account";
import { useMessages } from "@/hooks/api/use-messages";
import { Skeleton } from "@/components/ui/skeleton";
import { UsageChart } from "@/components/dashboard/usage-chart";
import { useStatistics } from "@/hooks/api/use-statistics";
import { PageHeader } from "@/components/layout/app-header";
import { useSearchParams } from "next/navigation";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import OrganizationList from "@/components/dashboard/change-organization";
import { Suspense } from "react";

export default function DashboardPage() {
  const { data: accountInfo, isLoading: isLoadingAccount } = useAccountInfo();
  const { data: statistics, isLoading: isLoadingStats } = useStatistics();
  const { data: messages, isLoading: isLoadingMessages } = useMessages({
    limit: 5,
    ordering: "-created_at",
  });

  const breadcrumbs = [{ label: "Tableau de bord" }];

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Tableau de bord" breadcrumbs={breadcrumbs} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          change={0}
          title="Messages Envoyés"
          value={statistics?.total_messages_sent.toString() || "0"}
        />
        <StatsCard
          change={0}
          title="Messages Reçus"
          value={statistics?.total_messages_received.toString() || "0"}
        />
        <StatsCard
          change={0}
          title="Messages Echoués"
          value={statistics?.total_messages_failure.toString() || "0"}
        />
        <StatsCard
          change={0}
          title="Noms d'Expéditeur"
          value={statistics?.total_senders.toString() || "0"}
        />
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

      {/* Usage Chart */}
      <div className="">
        <h2 className="text-lg font-semibold mb-4">
          Nombre de SMS envoyés par jour
        </h2>

        {isLoadingStats ? (
          <Skeleton className="h-[400px]" />
        ) : (
          <UsageChart data={statistics?.daily_usage || []} />
        )}
      </div>

      <Suspense>
        <MyOrganizationsDialog />
      </Suspense>
    </div>
  );
}

function MyOrganizationsDialog() {
  const searchParams = useSearchParams();
  const showDialog = searchParams.has("change-organization");

  return (
    <AlertDialog open={showDialog}>
      <AlertDialogContent>
        <OrganizationList />
      </AlertDialogContent>
    </AlertDialog>
  );
}
