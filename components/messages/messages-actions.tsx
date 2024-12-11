"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Message } from "@/lib/api/types/messages";
import { MessageDetailDialog } from "./message-details-dialog";

interface MessageActionsProps {
  message: Message;
}

export function MessageActions({ message }: MessageActionsProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowDetails(true)}
      >
        <Eye className="h-4 w-4 mr-2" />
        Détails
      </Button>

      <MessageDetailDialog
        message={message}
        open={showDetails}
        onOpenChange={setShowDetails}
      />
    </>
  );
}