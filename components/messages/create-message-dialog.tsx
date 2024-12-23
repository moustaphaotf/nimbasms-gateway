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
import { SingleMessage } from "./single-message";
import { ScrollArea } from "../ui/scroll-area";
import { UploadSMS } from "./upload-sms";

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
              {/* <TabsTrigger value="bulk-sms">Message groupé</TabsTrigger> */}
              <TabsTrigger value="file-upload">Importer un fichier</TabsTrigger>
            </TabsList>

            <TabsContent value="single-message" className="px-4">
              <SingleMessage setOpen={setOpen} />
            </TabsContent>

            {/* <TabsContent value="bulk-sms" className="px-4">
              <BulkSMS setOpen={setOpen} />
            </TabsContent> */}



            <TabsContent value="file-upload" className="px-4">
              <UploadSMS setOpen={setOpen} />
            </TabsContent>

          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
