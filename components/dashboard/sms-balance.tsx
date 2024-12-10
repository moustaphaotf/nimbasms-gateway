"use client";

import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

interface SMSBalanceProps {
  balance: number;
}

export function SMSBalance({ balance }: SMSBalanceProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <div className="rounded-full bg-primary/10 p-3">
          <MessageSquare className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">Solde SMS</h3>
        <p className="text-3xl font-bold text-primary">{balance.toLocaleString()}</p>
      </div>
    </Card>
  );
}