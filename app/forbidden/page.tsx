"use client";

import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center"
          >
            <div className="p-4 bg-destructive/10 rounded-full">
              <ShieldAlert className="w-12 h-12 text-destructive" />
            </div>
          </motion.div>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Accès refusé</h1>
            <p className="text-muted-foreground">
              Désolé, vous n&apos;avez pas les autorisations nécessaires pour accéder à cette page.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/dashboard">
                Retour au tableau de bord
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}