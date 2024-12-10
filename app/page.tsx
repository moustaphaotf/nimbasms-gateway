"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (auth.isAuthenticated()) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 px-4"
      >
        <div className="flex flex-col items-center space-y-2">
          <Image 
            src="/mtn-logo.png" 
            alt="MTN Logo" 
            width={80} 
            height={40} 
            priority 
            className="dark:brightness-0 dark:invert" 
          />
          <h1 className="text-2xl font-semibold text-center">
            Connexion à la plateforme SMS
          </h1>
        </div>

        <Card className="p-6">
          <LoginForm />
        </Card>

        <footer className="text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} MTN. Tous droits réservés.</p>
          <p>
            Powered by{" "}
            <a
              href={process.env.NEXT_PUBLIC_COMPANY_URL || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              {process.env.NEXT_PUBLIC_COMPANY_NAME || "NimbaSMS"}
            </a>
          </p>
        </footer>
      </motion.div>
    </div>
  );
}