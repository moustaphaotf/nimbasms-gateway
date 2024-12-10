"use client";

import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table/data-table";
import { columns } from "./columns";
import { useState } from "react";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { DateRange } from "react-day-picker";

const mockData = [
  {
    id: "1",
    date: "2024-03-20",
    message: "Promotion du mois de mars",
    recipients: 1500,
    status: "delivered",
    cost: 150,
  },
  {
    id: "2",
    date: "2024-03-19",
    message: "Rappel de rendez-vous",
    recipients: 800,
    status: "pending",
    cost: 80,
  },
  {
    id: "3",
    date: "2024-03-18",
    message: "Notification de paiement",
    recipients: 2000,
    status: "failed",
    cost: 200,
  },
];

export default function HistoryPage() {
  const [date, setDate] = useState<DateRange>();

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
            data={mockData}
            searchPlaceholder="Rechercher un message..."
            searchColumn="message"
          />
        </div>
      </Card>
    </div>
  );
}