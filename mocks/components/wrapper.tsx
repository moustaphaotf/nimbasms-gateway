"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function StartMockWorker({ children }: { children: React.ReactNode }) {
  const [isMockReady, setMockReady] = useState(false);

  useEffect(() => {
    async function enableMocks() {
      const { initMocks } = await import("@/mocks/init");
      if (process.env.NEXT_PUBLIC_ENABLE_MOCKS === "true") {
        await initMocks();
      }
      setMockReady(true);
    }

    enableMocks();
  }, []);

  if (!isMockReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            Chargement des données de test en cours...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
