"use client";

import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table/data-table";
import { columns } from "./columns";
import { useState } from "react";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { DateRange } from "react-day-picker";
import { useMessages } from "@/hooks/api/use-messages";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useSenders } from "@/hooks/api/use-senders";
import { Skeleton } from "@/components/ui/skeleton";
import { MAX_ITEMS_PER_PAGE, PROTECTED_ROUTES } from "@/lib/constants";
import { useUser } from "@/providers/user-provider";
import { PageHeader } from "@/components/layout/app-header";
import { ComboBox } from "@/components/ui/combobox-select";
import { MessageStatus } from "@/lib/api/types";

const filterMessageOptions = [
  { label: "En attente", value: "pending" },
  { label: "Envoyé", value: "sent" },
  { label: "Reçu", value: "delivered" },
  { label: "Echec", value: "failure" },
];

export default function HistoryPage() {
  const [date, setDate] = useState<DateRange>();
  const [sender, setSender] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: MAX_ITEMS_PER_PAGE,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<MessageStatus>();

  const { user } = useUser();

  const { data: messages, isLoading } = useMessages({
    offset: pagination.pageIndex * pagination.pageSize,
    limit: pagination.pageSize,
    ...(search && { search }),
    ...(status && { status }),
    start_date: date?.from?.toISOString(),
    end_date: date?.to?.toISOString(),
    ordering:
      sorting.length > 0
        ? `${sorting[0].desc ? "-" : ""}${sorting[0].id}`
        : undefined,
  });

  const { data: senders, isLoading: isLoadingSenders } = useSenders();

  const breadcrumbs = [
    { label: "Tableau de bord", href: PROTECTED_ROUTES.DASHBOARD.url },
    { label: "Historique de consommation" },
  ];

  const senderOptions =
    senders?.results.map((sender) => ({
      label:
        sender.name +
        (user && user.isStaff ? ` [${sender.owner.email}]` : null),
      value: sender.name,
    })) || [];

  const emptyText =
    user && user?.isStaff
      ? "Aucun nom d'expéditeur trouvé"
      : "Vous n'avez pas de nom d'expéditeur";

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Historique de consommation"
        breadcrumbs={breadcrumbs}
      />

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <DatePickerWithRange date={date} setDate={setDate} />

            <ComboBox
              placeholder="Filtrer par statut"
              value={status || ""}
              onValueChange={(value) => setStatus(value as MessageStatus)}
              options={filterMessageOptions}
            />

            {isLoadingSenders ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <ComboBox
                placeholder="Filtrer par expéditeur"
                value={sender || ""}
                onValueChange={(value) => setSender(value as MessageStatus)}
                options={senderOptions}
                emptyText={emptyText}
              />
            )}
          </div>

          <DataTable
            columns={columns}
            isLoading={isLoading}
            data={messages?.results || []}
            pageCount={Math.ceil((messages?.count || 0) / pagination.pageSize)}
            onPaginationChange={setPagination}
            pagination={pagination}
            onSortingChange={setSorting}
            onSearch={setSearch}
            searchPlaceholder="Rechercher un message..."
            columnVisibility={{
              owner: user !== null && user.isStaff,
            }}
            rowCount={messages?.count || 0}
          />
        </div>
      </Card>
    </div>
  );
}
