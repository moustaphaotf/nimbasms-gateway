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
import { MAX_ITEMS_PER_PAGE, PROTECTED_ROUTES } from "@/lib/constants";
import { DataSort } from "@/components/ui/data-sort";
import { PageHeader } from "@/components/layout/app-header";
import { AdminSenderForm } from "@/components/senders/admin-sender-form";

export default function SendersPage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: MAX_ITEMS_PER_PAGE,
  });

  const [ordering, setOrdering] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useSenders({
    offset: pagination.pageIndex * pagination.pageSize,
    limit: pagination.pageSize,
    search,
    ordering,
  });

  const createSender = useCreateSender();

  const handleCreateSender = (data: CreateSenderFormData) => {
    createSender.mutate({
      name: data.name,
    });
  };

  const sortOptions = [
    { label: "Date (Plus récent)", value: "-added_at" },
    { label: "Date (Plus ancien)", value: "added_at" },
    { label: "Nom d'expéditeur (A-Z)", value: "name" },
    { label: "Nom d'expéditeur (Z-A)", value: "-name" },
  ];

  const { user } = useUser();

  const breadcrumbs = [
    { label: "Tableau de bord", href: PROTECTED_ROUTES.DASHBOARD.url },
    { label: "Noms d'expéditeur" },
  ];

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Noms d'expéditeur" breadcrumbs={breadcrumbs} />

      {user && !user.isStaff ? (
        <Card className="p-6">
          <SenderForm
            onSubmit={handleCreateSender}
            isSubmitting={createSender.isPending}
          />
        </Card>
      ) : (
        <div className="text-end">
          <AdminSenderForm />
        </div>
      )}

      <div className="flex justify-end">
        <DataSort
          value={ordering}
          onValueChange={setOrdering}
          options={sortOptions}
        />
      </div>

      <Card className="p-6">
        <DataTable
          columns={columns}
          isLoading={isLoading}
          data={(data?.results as SenderResponse[]) || []}
          pageCount={Math.ceil((data?.count || 0) / pagination.pageSize)}
          onPaginationChange={setPagination}
          pagination={pagination}
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
