import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoginDialog } from "@/components/auth/login-dialog";
import { BarChart3, Key, Settings, Bell } from "lucide-react";
import { RegisterDialog } from "@/components/auth/register-dialog";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <Image
            src="/mtn-logo.png"
            alt="MTN Logo"
            width={120}
            height={60}
            className="dark:invert-0"
          />
          <div className="flex gap-4">
            <LoginDialog />
            <RegisterDialog />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-6">
            Plateforme d&apos;administration SMS
          </h1>
          <p className="text-xl text-muted-foreground">
            Gérez, surveillez et configurez vos services SMS en toute simplicité
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <FeatureCard
            icon={<BarChart3 className="w-8 h-8" />}
            title="Tableau de bord"
            description="Visualisez les statistiques d'envoi et suivez l'utilisation en temps réel"
          />
          <FeatureCard
            icon={<Key className="w-8 h-8" />}
            title="Gestion des API"
            description="Gérez vos clés API et configurez les webhooks pour vos intégrations"
          />
          <FeatureCard
            icon={<Settings className="w-8 h-8" />}
            title="Configuration des expéditeurs"
            description="Gérez les noms d'expéditeur pour vos SMS professionnels"
          />
          <FeatureCard
            icon={<Bell className="w-8 h-8" />}
            title="Notifications temps réel"
            description="Configurez des webhooks pour suivre l'état des messages"
          />
        </div>

        {/* Help Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold mb-4">
            Besoin d&apos;aide pour commencer ?
          </h2>
          <p className="text-muted-foreground">
            Consultez{" "}
            <a
              href={process.env.NEXT_PUBLIC_DEVELOPERS_URL ?? "#"}
              className="text-primary hover:text-primary/80"
            >
              notre documentation
            </a>{" "}
            complète pour apprendre à intégrer et utiliser nos services.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2024 MTN. Tous droits réservés.</p>
          <p>
            Powered by{" "}
            <a href="#" className="underline hover:text-primary">
              NimbaSMS
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-lg border bg-card">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
