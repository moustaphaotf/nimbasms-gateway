"use client";

import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PROTECTED_ROUTES } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center"
          >
            <div className="p-4 bg-primary/10 rounded-full">
              <FileQuestion className="w-12 h-12 text-primary" />
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Page introuvable</h1>
            <p className="text-muted-foreground">
              Désolé, la page que vous recherchez n&apos;existe pas ou a été
              déplacée.
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href={PROTECTED_ROUTES.DASHBOARD.url}>
                Retour au tableau de bord
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
