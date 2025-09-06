"use client";

import { useEffect, useState } from "react";

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
    return <div>Loading mocks...</div>;
  }

  return <>{children}</>;
}
