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

export default function UsersPage() {
  const [showAddUser, setShowAddUser] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: MAX_ITEMS_PER_PAGE,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useUsers({
    offset: pagination.pageIndex * pagination.pageSize,
    limit: pagination.pageSize,
    search,
    ordering:
      sorting.length > 0
        ? `${sorting[0].desc ? "-" : ""}${sorting[0].id}`
        : undefined,
  });

  const breadcrumbs = [
    { label: "Tableau de bord", href: PROTECTED_ROUTES.DASHBOARD.url },
    { label: "Utilisateurs" },
  ];

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Gestion des Utilisateurs" breadcrumbs={breadcrumbs} />

      <div className="flex justify-end">
        <AddUserDialog open={showAddUser} onOpenChange={setShowAddUser} />
      </div>

      {/* <Tabs defaultValue="active-accounts">
        <TabsList>
          <TabsTrigger value="active-accounts">Comptes Actifs</TabsTrigger>
          <TabsTrigger value="ongoing-requests">Demandes en Cours</TabsTrigger>
          <TabsTrigger value="unactive-accounts">Comptes Inactifs</TabsTrigger>
        </TabsList>

        <TabsContent value="active-accounts"></TabsContent>

        <TabsContent value="ongoing-requests"></TabsContent>

        <TabsContent value="unactive-accounts"></TabsContent>
      </Tabs> */}

      <Card className="p-6">
        <DataTable
          columns={columns}
          isLoading={isLoading}
          data={data?.results || []}
          pageCount={Math.ceil((data?.count || 0) / pagination.pageSize)}
          onPaginationChange={setPagination}
          pagination={pagination}
          onSortingChange={setSorting}
          onSearch={setSearch}
          searchPlaceholder="Rechercher un utilisateur..."
        />
      </Card>
    </div>
  );
}
