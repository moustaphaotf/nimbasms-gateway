"use client";

import { Card } from "@/components/ui/card";
import { SenderForm } from "@/components/senders/sender-form";
import { SenderList } from "@/components/senders/sender-list";
import { useSenders, useCreateSender, useToggleSenderActive } from "@/hooks/api/use-senders";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateSenderFormData } from "@/lib/schemas/sender.schema";

export default function SendersPage() {
  const { data: senders, isLoading } = useSenders();
  const createSender = useCreateSender();

  const handleCreateSender = (data: CreateSenderFormData) => {
    createSender.mutate({
      name: data.name,
    });
  };

  const handleToggleActive = (senderId: string) => {
    toggleActive.mutate(senderId);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <header className="border-b pb-4">
          <h1 className="text-2xl font-semibold">Noms d&apos;expéditeur</h1>
        </header>
        <div className="space-y-4">
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[400px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <header className="border-b pb-4">
        <h1 className="text-2xl font-semibold">Noms d&apos;expéditeur</h1>
      </header>

      <Card className="p-6">
        <SenderForm 
          onSubmit={handleCreateSender}
          isSubmitting={createSender.isPending}
        />
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Liste des noms d&apos;expéditeur</h2>
          <SenderList 
            senders={senders?.results || []}
            onToggleActive={handleToggleActive}
          />
        </div>
      </Card>
    </div>
  );
}