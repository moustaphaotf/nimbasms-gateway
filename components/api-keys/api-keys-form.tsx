"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Eye, EyeOff, RefreshCw, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRegenerateApiKey } from "@/hooks/api/use-account";

interface ApiKeyFormProps {
  apiKey: string;
}

export function ApiKeyForm({ apiKey }: ApiKeyFormProps) {
  const regenerateApiKey = useRegenerateApiKey();
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeyCopied, setApiKeyCopied] = useState(false);

  const handleRegenerateKey = () => {
    regenerateApiKey.mutate();
  };

  const handleCopyApiKey = async () => {
    if (apiKey) {
      try {
        await navigator.clipboard.writeText(apiKey);
        toast.success("Clé API copiée dans le presse-papiers");
        setApiKeyCopied(true);
        setTimeout(() => setApiKeyCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  return (
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
              value={apiKey}
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
              {apiKeyCopied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}