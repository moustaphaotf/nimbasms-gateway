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
import { SenderResponse, SenderStatus } from "@/lib/api/types";
import { useUser } from "@/providers/user-provider";
import { MAX_ITEMS_PER_PAGE, PROTECTED_ROUTES } from "@/lib/constants";
import { ComboBox } from "@/components/ui/combobox-select";
import { PageHeader } from "@/components/layout/app-header";
import { AdminSenderForm } from "@/components/senders/admin-sender-form";
import { useCompanyUsage } from "@/hooks/api/use-statistics";
import { FilterCompanyUsage } from "@/components/reporting/filter-company-usage";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { CompanyUsageFilters } from "@/lib/api/types/statistics";
import { useForm } from "react-hook-form";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { useUsers } from "@/hooks/api/use-users";
import { CompanyUsageStackedChart } from "@/components/reporting/stacked-bar-chart";
import { Button } from "@/components/ui/button";
import { Download, FileDown } from "lucide-react";

const exportToCsv = (data: any[], filename: string) => {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    data.map((row) => Object.values(row).join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);

  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};

export default function SendersPage() {
  const [ordering, setOrdering] = useState("");
  const [status, setStatus] = useState<SenderStatus>();
  const [sender, setSender] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [date, setDate] = useState<DateRange | undefined>();
  const { data: users, isLoading: usersLoading } = useUsers();

  const owner = users?.results.find((item) => item.email === ownerEmail);

  const { data: senders, isLoading: isLoadingSenders } = useSenders({
    ...(ownerEmail && { owner__email: ownerEmail }),
  });

  const { data, isLoading } = useCompanyUsage({
    ...(date?.from && { start_date: format(date.from, "yyyy-MM-dd") }),
    ...(date?.to && { end_date: format(date.to, "yyyy-MM-dd") }),
    ...(sender && { sender }),
    ...(owner && { owners: owner.uid }),
  });

  const breadcrumbs = [
    { label: "Tableau de bord", href: PROTECTED_ROUTES.DASHBOARD.url },
    { label: "Reporting" },
  ];

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Reporting" breadcrumbs={breadcrumbs}></PageHeader>

      <div className="flex gap-4 justify-end">
        <DatePickerWithRange date={date} setDate={setDate} />

        <ComboBox
          emptyText="Aucun compte client retrouvé"
          placeholder="Filtrer par client"
          onValueChange={(value) => setOwnerEmail(value)}
          options={
            users?.results.map((item) => ({
              value: item.email,
              label: `${item?.first_name} ${item.last_name} [${item.email}]`,
            })) || []
          }
          value={ownerEmail}
        />

        <ComboBox
          disabled={!owner}
          placeholder="Filtrer par expéditeur"
          emptyText="Aucun nom d'expéditeur trouvé"
          onValueChange={(value) => setSender(value)}
          options={
            senders?.results.map((item) => ({
              value: item.uid,
              label: `${item?.name} [${item.owner.email}]`,
            })) || []
          }
          value={sender}
        />

        <Button
          onClick={() =>
            exportToCsv(data ?? [], `company-usage-${Date.now()}.csv`)
          }
        >
          <FileDown className="mr-2 w-4 h-4" /> Télécharger les données
        </Button>
      </div>

      {data ? (
        <CompanyUsageStackedChart data={data || []} />
      ) : (
        <Skeleton className="w-full h-[250px]" />
      )}

      <Card className="p-6">
        <DataTable columns={columns} isLoading={isLoading} data={data ?? []} />
      </Card>
    </div>
  );
}
