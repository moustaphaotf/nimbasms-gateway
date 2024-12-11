"use client";
 
import { ErrorCard } from "@/components/error/error-card";
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <ErrorCard
          title="Erreur critique"
          description="Une erreur critique est survenue. Veuillez réessayer ultérieurement."
          retryAction={reset}
        />
      </body>
    </html>
  );
}