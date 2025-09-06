"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutDashboard, History, Key, FileDown, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const { theme } = useTheme();
  
  // Détermine le logo à utiliser selon le thème
  const logoSrc = theme === "dark" ? "/logo.png" : "/logo-black.png";

  return (
    <div
      className={cn(
        "w-64 bg-sidebar border-r border-sidebar-border",
        className
      )}
    >
      <div className="flex flex-col h-full">
        {/* <div className="p-6">
          <Image
            src={logoSrc}
            alt={process.env.NEXT_PUBLIC_APP_NAME + " Logo"}
            width={60}
            height={30}
            priority
          />
        </div> */}
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-2">
            <Button
              variant="secondary"
              className="w-full justify-start bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Tableau de Bord
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <History className="mr-2 h-4 w-4" />
              Historique de consommation
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Key className="mr-2 h-4 w-4" />
              Clés API et webhooks
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <FileDown className="mr-2 h-4 w-4" />
              Exportation de données
            </Button>
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
    </div>
  );
}
