"use client";

import { Card } from "@/components/ui/card";
import { SenderForm } from "@/components/senders/sender-form";
import { DataTable } from "@/components/ui/data-table/data-table";
import { columns } from "./columns";
import { useCreateSender, useSenders } from "@/hooks/api/use-senders";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { CreateSenderFormData } from "@/lib/schemas/sender.schema";
import { SenderResponse } from "@/lib/api/types";
import { useUser } from "@/providers/user-provider";

export default function SendersPage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [search, setSearch] = useState("");

  const { data, isLoading } = useSenders({
    offset: pagination.pageIndex * pagination.pageSize,
    limit: pagination.pageSize,
    search,
  });

  const createSender = useCreateSender();

  const handleCreateSender = (data: CreateSenderFormData) => {
    createSender.mutate({
      name: data.name,
    });
  };

  const { user } = useUser();
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
        <DataTable
          columns={columns}
          isLoading={isLoading}
          data={(data?.results as SenderResponse[]) || []}
          pageCount={Math.ceil((data?.count || 0) / pagination.pageSize)}
          onPaginationChange={setPagination}
          onSearch={setSearch}
          searchPlaceholder="Rechercher un nom d'expéditeur..."
          columnVisibility={{
            actions: user !== null && user.isStaff,
          }}
        />
      </Card>
    </div>
  );
}
