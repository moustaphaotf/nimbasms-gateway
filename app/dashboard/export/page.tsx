"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { columns } from "./columns";
import { FileDown } from "lucide-react";
import { useState } from "react";
import { useExports } from "@/hooks/api/use-exports";
import { CreateExportDialog } from "@/components/exports/create-export-dialog";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { MAX_ITEMS_PER_PAGE, PROTECTED_ROUTES } from "@/lib/constants";
import { DataSort } from "@/components/ui/data-sort";
import { PageHeader } from "@/components/layout/app-header";

export default function ExportPage() {
  const [showCreateExport, setShowCreateExport] = useState(false);
  const [ordering, setOrdering] = useState("");

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: MAX_ITEMS_PER_PAGE,
  });
  const [search, setSearch] = useState("");

  const { data, isLoading } = useExports({
    offset: pagination.pageIndex * pagination.pageSize,
    limit: pagination.pageSize,
    search,
    ordering,
  });

  const sortOptions = [
    { label: "Date (Plus récent)", value: "-created_at" },
    { label: "Date (Plus ancien)", value: "created_at" },
    { label: "Nom de fichier (A-Z)", value: "file_name" },
    { label: "Nom de fichier (Z-A)", value: "-file_name" },
    { label: "Taille (Croissant)", value: "file_size" },
    { label: "Taille (Décroissant)", value: "-file_size" },
  ];

  const breadcrumbs = [
    { label: "Tableau de bord", href: PROTECTED_ROUTES.DASHBOARD.url },
    { label: "Exportation des données" }
  ];

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Exportation des données" breadcrumbs={breadcrumbs}>
        <Button onClick={() => setShowCreateExport(true)}>
          <FileDown className="mr-2 h-4 w-4" />
          Nouvelle exportation
        </Button>
      </PageHeader>

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
          data={data?.results || []}
          pageCount={Math.ceil((data?.count || 0) / pagination.pageSize)}
          onPaginationChange={setPagination}
          pagination={pagination}
          onSearch={setSearch}
          searchPlaceholder="Rechercher dans les exportations..."
          isLoading={isLoading}
        />
      </Card>

      <CreateExportDialog
        open={showCreateExport}
        onOpenChange={setShowCreateExport}
      />
    </div>
  );
}
