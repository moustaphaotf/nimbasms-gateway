"use client";

import { useAccountInfo } from "@/hooks/api/use-account";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiKeyForm } from "@/components/api-keys/api-keys-form";
import { WebhookForm } from "@/components/api-keys/webhook-form";
import { ApiDocumentation } from "@/components/api-keys/api-documentation";

export default function ApiKeysPage() {
  const { data: accountInfo, isLoading } = useAccountInfo();

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <header className="border-b pb-4">
          <h1 className="text-2xl font-semibold">Clés API et Webhooks</h1>
        </header>
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
      <header className="border-b pb-4">
        <h1 className="text-2xl font-semibold">Clés API et Webhooks</h1>
      </header>

      <div className="space-y-4">
        <ApiDocumentation />
        <ApiKeyForm apiKey={accountInfo?.api_key || ""} />
        <WebhookForm initialWebhookUrl={accountInfo?.webhook_url || ""} />
      </div>
    </div>
  );
}
