"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { useState } from "react";

export default function ExportPage() {
  const [date, setDate] = useState<{ from: Date; to: Date }>();

  return (
    <div className="space-y-6 p-6">
      <header className="border-b pb-4">
        <h1 className="text-2xl font-semibold">Exportation de données</h1>
      </header>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Paramètres d&apos;exportation</h2>
            <p className="text-sm text-muted-foreground">
              Sélectionnez la période et le format d&apos;exportation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <DatePickerWithRange date={date} setDate={setDate} />
            </div>
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Type de données" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="messages">Messages envoyés</SelectItem>
                  <SelectItem value="contacts">Contacts</SelectItem>
                  <SelectItem value="campaigns">Campagnes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="w-full" variant="outline">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Exporter en Excel
            </Button>
            <Button className="w-full" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Exporter en CSV
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Exports récents</h2>
            <p className="text-sm text-muted-foreground">
              Téléchargez vos exports des 30 derniers jours
            </p>
          </div>

          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <p className="font-medium">Export_20240320_{i}.xlsx</p>
                  <p className="text-sm text-muted-foreground">
                    20 Mars 2024 • 2.3 MB
                  </p>
                </div>
                <Button size="sm" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}