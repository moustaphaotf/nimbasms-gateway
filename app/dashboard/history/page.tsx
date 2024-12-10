"use client";

import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table/data-table";
import { columns } from "./columns";
import { useState } from "react";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { DateRange } from "react-day-picker";
import { useMessages } from "@/hooks/api/use-messages";
import { Skeleton } from "@/components/ui/skeleton";
import { PaginationState, SortingState } from "@tanstack/react-table";

export default function HistoryPage() {
  const [date, setDate] = useState<DateRange>();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState("");

  const { data: messages, isLoading } = useMessages({
    offset: pagination.pageIndex * pagination.pageSize,
    limit: pagination.pageSize,
    search,
    start_date: date?.from?.toISOString(),
    end_date: date?.to?.toISOString(),
    ordering: sorting.length > 0 ? `${sorting[0].desc ? "-" : ""}${sorting[0].id}` : undefined,
  });

  return (
    <div className="space-y-6 p-6">
      <header className="border-b pb-4">
        <h1 className="text-2xl font-semibold">Historique de consommation</h1>
      </header>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>

          <DataTable
            columns={columns}
            isLoading={isLoading}
            data={messages?.results || []}
            pageCount={Math.ceil((messages?.count || 0) / pagination.pageSize)}
            onPaginationChange={setPagination}
            onSortingChange={setSorting}
            onSearch={setSearch}
            searchPlaceholder="Rechercher un message..."
          />
        </div>
      </Card>
    </div>
  );
}