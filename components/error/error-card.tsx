"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ErrorCardProps {
  title?: string;
  description?: string;
  retryAction?: () => void;
  showDashboardLink?: boolean;
}

export function ErrorCard({
  title = "Une erreur est survenue",
  description = "Désolé, quelque chose s'est mal passé.",
  retryAction,
  showDashboardLink = true,
}: ErrorCardProps) {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center"
          >
            <div className="p-4 bg-destructive/10 rounded-full">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
          </motion.div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            {retryAction && (
              <Button onClick={retryAction} variant="outline">
                Réessayer
              </Button>
            )}
            {showDashboardLink && (
              <Button asChild>
                <Link href="/dashboard">
                  Retour au tableau de bord
                </Link>
              </Button>
            )}
          </div>
        </motion.div>
      </Card>
    </div>
  );
}