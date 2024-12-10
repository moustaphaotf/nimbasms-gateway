"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutDashboard, History, Key, FileDown, Users, MessageSquare, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname();
  
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Tableau de Bord",
      href: "/dashboard"
    },
    {
      icon: History,
      label: "Historique de consommation",
      href: "/dashboard/history"
    },
    {
      icon: MessageSquare,
      label: "Noms d'expéditeur",
      href: "/dashboard/senders"
    },
    {
      icon: Key,
      label: "Clés API et webhooks",
      href: "/dashboard/api-keys"
    },
    {
      icon: FileDown,
      label: "Exportation de données",
      href: "/dashboard/export"
    },
    {
      icon: Users,
      label: "Gestion des utilisateurs",
      href: "/dashboard/users"
    }
  ];

  return (
    <div className={cn("w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen", className)}>
      <div className="p-6">
        <Image 
          src="/mtn-logo.png" 
          alt="MTN Logo" 
          width={60} 
          height={30} 
          priority 
          className="dark:brightness-0 dark:invert" 
        />
      </div>
      
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link key={item.href} href={item.href}>
                <Button 
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive 
                      ? "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </ScrollArea>

      <div className="p-6 mt-auto border-t border-sidebar-border">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
}