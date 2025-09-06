"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { MessageSquarePlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { SingleMessageForm } from "./single-message-form";
import { ScrollArea } from "../ui/scroll-area";
import { UploadMessagesForm } from "./upload-messages-form";
import { GroupMessagesForm } from "./group-messages-form";

interface CreateMessageDialogProps {}

export function CreateMessageDialog({}: CreateMessageDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <MessageSquarePlus className="mr-2 h-4 w-4" />
          Nouveau message
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Envoyer un message</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[550px]">
          <Tabs defaultValue="single-message">
            <TabsList>
              <TabsTrigger value="single-message">
                Message individuel
              </TabsTrigger>
              <TabsTrigger value="bulk-sms">Message groupé</TabsTrigger>
              <TabsTrigger value="file-upload">Importer un fichier</TabsTrigger>
            </TabsList>

            <TabsContent value="single-message" className="px-2">
              <SingleMessageForm setOpen={setOpen} />
            </TabsContent>

            <TabsContent value="bulk-sms" className="px-4">
              <GroupMessagesForm setOpen={setOpen} />
            </TabsContent>

            <TabsContent value="file-upload" className="px-2">
              <UploadMessagesForm setOpen={setOpen} />
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
