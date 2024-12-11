"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export function ApiDocumentation() {
  return (
    <div className="mt-6 rounded-lg bg-muted p-4">
      <div className="flex items-start space-x-2">
        <div className="space-y-1">
          <p className="text-sm font-medium">
            Besoin d&apos;aide pour commencer ?
          </p>
          <p className="text-sm text-muted-foreground">
            Consultez notre documentation complète pour apprendre à intégrer
            l&apos;API dans votre application.
          </p>
          <Button variant="link" className="h-auto p-0" asChild>
            <Link
              href={process.env.NEXT_PUBLIC_DEVELOPERS_URL || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:text-primary/80"
            >
              Accéder à la documentation
              <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
