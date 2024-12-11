"use client";

import { useAccountInfo } from "@/hooks/api/use-account";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiKeyForm } from "@/components/api-keys/api-keys-form";
import { WebhookForm } from "@/components/api-keys/webhook-form";
import { ApiDocumentation } from "@/components/api-keys/api-documentation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { PageHeader } from "@/components/layout/app-header";
import { PROTECTED_ROUTES } from "@/lib/constants";

export default function ApiKeysPage() {
  const { data: accountInfo, isLoading } = useAccountInfo();

  const breadcrumbs = [
    { label: "Tableau de bord", href: PROTECTED_ROUTES.DASHBOARD.url },
    { label: "Clés API et Webhooks" },
  ];

  const header = (
    <PageHeader breadcrumbs={breadcrumbs} title="Clés API et Webhooks" />
  );

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        {header}

        <div className="space-y-4">
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {header}

      <div className="space-y-4">
        <ApiDocumentation />
        <ApiKeyForm apiKey={accountInfo?.api_key || ""} />
        <WebhookForm initialWebhookUrl={accountInfo?.webhook_url || ""} />
      </div>
    </div>
  );
}
