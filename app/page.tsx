"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { auth } from "@/lib/auth";
import { BarChart3, Key, Settings, Webhook } from "lucide-react";
import { PROTECTED_ROUTES } from "@/lib/constants";
import { ApiDocumentation } from "@/components/api-keys/api-documentation";

const features = [
  {
    icon: BarChart3,
    title: "Tableau de bord",
    description:
      "Visualisez les statistiques d'envoi et suivez l'utilisation en temps réel",
  },
  {
    icon: Key,
    title: "Gestion des API",
    description:
      "Gérez vos clés API et configurez les webhooks pour vos intégrations",
  },
  {
    icon: Settings,
    title: "Configuration des expéditeurs",
    description: "Gérez les noms d'expéditeur pour vos SMS professionnels",
  },
  {
    icon: Webhook,
    title: "Notifications temps réel",
    description: "Configurez des webhooks pour suivre l'état des messages",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    if (auth.isAuthenticated()) {
      router.push(PROTECTED_ROUTES.DASHBOARD.url);
    }
  }, [router]);

  // Détermine le logo à utiliser selon le thème
  const logoSrc = theme === "dark" ? "/logo.png" : "/logo-black.png";

  return (
    <div className="min-h-screen flex bg-background">
      {/* Features Section */}
      <div className="hidden lg:flex flex-1 bg-muted p-12">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              {/* <Image
                src={logoSrc}
                alt={process.env.NEXT_PUBLIC_APP_NAME + " Logo"}
                width={120}
                height={60}
                priority
              /> */}
              <h1 className="text-4xl font-bold">
                Plateforme d&apos;administration SMS
              </h1>
              <p className="text-lg text-muted-foreground">
                Gérez, surveillez et configurez vos services SMS en toute
                simplicité
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <ApiDocumentation />
          </motion.div>
        </div>
      </div>

      {/* Login Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8 px-4"
        >
          <div className="flex flex-col items-center space-y-2 lg:hidden">
            {/* <Image
              src={logoSrc}
              alt={process.env.NEXT_PUBLIC_APP_NAME + " Logo"}
              width={80}
              height={40}
              priority
            /> */}
            <h1 className="text-2xl font-semibold text-center">
              Administration {process.env.NEXT_PUBLIC_APP_NAME}
            </h1>
          </div>

          <Card className="p-6">
            <LoginForm />
          </Card>
        </motion.div>
        {/* Footer */}
        <footer className="m">
          <div className="container mx-auto px-4 py-6 text-center text-xs text-muted-foreground">
            <p>
              © 2025 {process.env.NEXT_PUBLIC_APP_NAME}. Tous droits réservés.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
