"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSenders } from "@/hooks/api/use-senders";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { PROTECTED_ROUTES } from "@/lib/constants";
import { ComboBox } from "@/components/ui/combobox-select";
import { ComboBox as ComboBoxCommand } from "@/components/ui/combobox";
import { PageHeader } from "@/components/layout/app-header";
import { useCompanyUsage } from "@/hooks/api/use-statistics";
import { CompanyUsage } from "@/lib/api/types/statistics";
import { format } from "date-fns";
import { useUsers } from "@/hooks/api/use-users";
import { Button } from "@/components/ui/button";
import { FileDown, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/date-picker";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const exportToCsv = (data: CompanyUsage[], filename: string) => {
  const columns: { key: string; label: string }[] = [
    { key: "owner__email", label: "Email Entreprise" },
    { key: "owner__company_name", label: "Nom Entreprise" },
    { key: "operator", label: "Opérateur" },
    { key: "count", label: "Total SMS (Reçu)" },
  ];

  const headers = columns.map((column) => column.label).join(",");

  const rows = data.flatMap((company) =>
    company.count.map(
      ({ operator, count }: { operator: string; count: number }) => {
        return [
          company.owner__email,
          company.owner__company_name,
          operator === "Areeba" ? "MTN" : operator,
          count,
        ].join(",");
      }
    )
  );

  const csvContent =
    "data:text/csv;charset=utf-8," + headers + "\n" + rows.join("\n");

  const encodedUri = encodeURI(csvContent);

  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};

export default function Page() {
  const [sender, setSender] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [displayData, setDisplayData] = useState(false);

  const [userSearch, setUserSearch] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  useEffect(() => {
    setDisplayData(false);
  }, [startDate, endDate, ownerEmail, sender]);

  const clearFilters = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setOwnerEmail("");
    setSender("");
    setDisplayData(false);
  };

  const { data: users } = useUsers({
    ...(userSearch && { search: userSearch }),
  });
  const owner = users?.results.find((item) => item.email === ownerEmail);

  const { data: senders } = useSenders({
    ...(ownerEmail && { owner__email: ownerEmail }),
  });

  const { data, isLoading, refetch } = useCompanyUsage({
    ...(startDate && { start_date: format(startDate, "yyyy-MM-dd") }),
    ...(endDate && { end_date: format(endDate, "yyyy-MM-dd") }),
    ...(sender && { sender }),
    ...(owner && { owners: owner.uid }),
  });

  const breadcrumbs = [
    { label: "Tableau de bord", href: PROTECTED_ROUTES.DASHBOARD.url },
    { label: "Reporting" },
  ];

  const handleSearch = () => {
    refetch();
    setDisplayData(true);
  };

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Reporting" breadcrumbs={breadcrumbs}></PageHeader>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Filtres
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="mr-2 h-4 w-4" /> Effacer les filtres
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Date début</Label>
                <DatePicker
                  id="start-date"
                  date={startDate}
                  setDate={setStartDate}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-date">Date fin</Label>
                <DatePicker id="end-date" date={endDate} setDate={setEndDate} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <ComboBoxCommand
                  placeholder="Filtrer par client"
                  onChange={(value) => setOwnerEmail(value)}
                  onSearch={setUserSearch}
                  options={
                    users?.results.map((item) => ({
                      value: item.email,
                      label: item.email,
                    })) || []
                  }
                  value={ownerEmail}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sender">Expéditeur</Label>
                <ComboBox
                  disabled={!owner}
                  placeholder="Nom d'expéditeur"
                  emptyText="Aucun nom d'expéditeur trouvé"
                  onValueChange={(value) => setSender(value)}
                  options={
                    senders?.results.map((item) => ({
                      value: item.name,
                      label: item.name,
                    })) || []
                  }
                  value={sender}
                />
              </div>
            </div>

            <CardFooter className="justify-end">
              <Button onClick={handleSearch} className="mt-6">
                Rechercher
              </Button>
            </CardFooter>
          </CardContent>
        </Card>
      </motion.div>

      {displayData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6">
            <CardHeader>
              <div className="flex gap-4 justify-end">
                <Button
                  onClick={() =>
                    exportToCsv(data ?? [], `company-usage-${Date.now()}.csv`)
                  }
                >
                  <FileDown className="mr-2 w-4 h-4" /> Télécharger les données
                </Button>
              </div>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow className="border">
                  <TableHead>Client</TableHead>
                  <TableHead>Opérateur</TableHead>
                  <TableHead>Total SMS (Reçu)</TableHead>
                  <TableHead>Charges (GNF)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading &&
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      {Array.from({ length: 4 }).map((_, colIndex) => (
                        <TableCell key={colIndex}>
                          <Skeleton className="h-4 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}

                {!isLoading &&
                  data?.map(
                    (
                      { count, owner__company_name, owner__email, owner__uid },
                      rowIndex
                    ) =>
                      count.map(({ operator, count: total }, index) => (
                        <TableRow
                          className={cn(
                            `hover:bg-unset border`,
                            rowIndex % 2 === 0 ? "bg-muted/50" : ""
                          )}
                          key={`${owner__uid}.${index}`}
                        >
                          {index === 0 && (
                            <TableCell rowSpan={count.length}>
                              <span className="flex flex-col text-xs text-muted-foreground">
                                <span>{owner__email}</span>
                                <span className="font-semibold">
                                  {owner__company_name}
                                </span>
                              </span>
                            </TableCell>
                          )}

                          <TableCell>
                            {operator === "Areeba" ? "MTN" : operator}
                          </TableCell>
                          <TableCell>{total}</TableCell>
                          <TableCell>-</TableCell>
                        </TableRow>
                      ))
                  )}

                {!isLoading && data?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      Aucun résultat.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
