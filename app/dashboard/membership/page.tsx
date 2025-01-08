"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { columns } from "./columns";
import { AddUserDialog } from "@/components/users/add-user-dialog";
import { useUsers } from "@/hooks/api/use-users";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { MAX_ITEMS_PER_PAGE, PROTECTED_ROUTES } from "@/lib/constants";
import { PageHeader } from "@/components/layout/app-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMembers } from "@/hooks/api/use-members";
import { MemberForm } from "@/components/membership/member-form";

export default function UsersPage() {
  const [showAddUser, setShowAddUser] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: MAX_ITEMS_PER_PAGE,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useMembers({
    offset: pagination.pageIndex * pagination.pageSize,
    limit: pagination.pageSize,
    search,
  });

  const breadcrumbs = [
    { label: "Tableau de bord", href: PROTECTED_ROUTES.DASHBOARD.url },
    { label: "Espace Membres" },
  ];

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Gestion des membres " breadcrumbs={breadcrumbs}>
        <MemberForm />
      </PageHeader>

      <div className="flex justify-end"></div>

      <Card className="p-6">
        <DataTable
          columns={columns}
          isLoading={isLoading}
          data={data?.results || []}
          pageCount={Math.ceil((data?.count || 0) / pagination.pageSize)}
          onPaginationChange={setPagination}
          pagination={pagination}
          onSortingChange={setSorting}
          searchPlaceholder="Rechercher un membre..."
        />
      </Card>
    </div>
  );
}
