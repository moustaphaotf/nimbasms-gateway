"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Message } from "@/lib/api/types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface RecentMessagesProps {
  messages: Message[];
}

export function RecentMessages({ messages }: RecentMessagesProps) {
  const getStatusBadge = (status: Message["status"]) => {
    switch (status) {
      case "sent":
        return <Badge variant="success">Envoyé</Badge>;
      case "failure":
        return <Badge variant="destructive">Échoué</Badge>;
      case "delivered":
        return <Badge variant="success">Livré</Badge>;
      default:
        return <Badge variant="secondary">En attente</Badge>;
    }
  };

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Destinataire</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-6 text-muted-foreground"
              >
                Aucun message envoyé récemment
              </TableCell>
            </TableRow>
          ) : (
            messages.map((message) => (
              <TableRow key={message.messageid}>
                <TableCell>
                  {format(new Date(message.created_at), "Pp", { locale: fr })}
                </TableCell>
                <TableCell>
                  {message.message.length > 30
                    ? `${message.message.substring(0, 30)}...`
                    : message.message}
                </TableCell>
                <TableCell>{message.contact}</TableCell>
                <TableCell>{getStatusBadge(message.status)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
