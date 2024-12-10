"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Eye, EyeOff, RefreshCw, Check } from "lucide-react";
import { useAccountInfo } from "@/hooks/api/use-account";
import { useRegenerateApiKey, useUpdateWebhook } from "@/hooks/api/use-account";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function ApiKeysPage() {
  const { data: accountInfo, isLoading } = useAccountInfo();
  const regenerateApiKey = useRegenerateApiKey();
  const updateWebhook = useUpdateWebhook();
  const [webhookUrl, setWebhookUrl] = useState(accountInfo?.webhook_url || "");
  const [showApiKey, setShowApiKey] = useState(false);
  const [webhookError, setWebhookError] = useState<string | null>(null);
  const  [apiKeyCopied, setApiKeyCopied] = useState(false)

  const handleRegenerateKey = () => {
    regenerateApiKey.mutate();
  };

  const handleSaveWebhook = () => {
    setWebhookError(null);
    updateWebhook.mutate(webhookUrl, {
      onError: (error: any) => {
        if (error.response?.data?.webhook_url) {
          setWebhookError(error.response.data.webhook_url[0]);
        }
      }
    });
  };

  const handleCopyApiKey = async () => {
    if (accountInfo?.api_key) {
      try {
        await navigator.clipboard.writeText(accountInfo.api_key);
        toast.success("Clé API copiée dans le presse-papiers");
        setApiKeyCopied(true)
        setTimeout(() => setApiKeyCopied(false), 2000);
      }  catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <header className="border-b pb-4">
          <h1 className="text-2xl font-semibold">Clés API et Webhooks</h1>
        </header>
        <div className="space-y-4">
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <header className="border-b pb-4">
        <h1 className="text-2xl font-semibold">Clés API et Webhooks</h1>
      </header>

      <Tabs defaultValue="api-keys">
        <TabsList>
          <TabsTrigger value="api-keys">Clés API</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="api-keys" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold">Clé API</h2>
                  <p className="text-sm text-muted-foreground">
                    Utilisez cette clé pour l&apos;environnement de production
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleRegenerateKey}
                  disabled={regenerateApiKey.isPending}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Régénérer
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Clé secrète</Label>
                <div className="flex space-x-2">
                    <Input
                      readOnly
                      value={accountInfo?.api_key || ""}
                      type={showApiKey ? "text" : "password"}
                    />
                  <Button
                      variant="outline"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    
                  <Button variant="outline" onClick={handleCopyApiKey}>
                    { apiKeyCopied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">Configuration Webhook</h2>
                <p className="text-sm text-muted-foreground">
                  Recevez des notifications en temps réel sur votre endpoint
                </p>
              </div>

              <div className="space-y-2">
                <Label>URL du Webhook</Label>
                <Input 
                  placeholder="https://votre-domaine.com/webhook" 
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className={webhookError ? "border-red-500" : ""}
                />
                {webhookError && (
                  <p className="text-sm text-red-500">{webhookError}</p>
                )}
              </div>

              <Button 
                onClick={handleSaveWebhook}
                disabled={updateWebhook.isPending}
              >
                {updateWebhook.isPending ? "Enregistrement en cours..." : "Sauvegarder les changements"}
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}