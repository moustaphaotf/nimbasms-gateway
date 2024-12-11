import {
  Building2,
  FileDown,
  History,
  Key,
  LayoutDashboard,
  LucideIcon,
  MessageSquare,
  UserCircle2,
} from "lucide-react";

export const PUBLIC_ROUTES = ["/"] as const;

const PROTECTED_ROUTES: Record<string, NavItem> = {
  DASHBOARD: {
    icon: LayoutDashboard,
    title: "Tableau de Bord",
    url: "/dashboard",
  },
  HISTORY: {
    icon: History,
    title: "Consommation",
    url: "/dashboard/history",
  },
  SENDERS: {
    icon: MessageSquare,
    title: "Noms d'expéditeur",
    url: "/dashboard/senders",
  },
  API_KEYS: {
    icon: Key,
    title: "Clés API et webhooks",
    url: "/dashboard/api-keys",
  },
  EXPORT: {
    icon: FileDown,
    title: "Exportation de données",
    url: "/dashboard/export",
  },
  USERS: {
    icon: Building2,
    title: "Comptes Client",
    url: "/dashboard/users",
  },
  PROFILE: {
    icon: UserCircle2,
    title: "Mon Profile",
    url: "/dashboard/profile",
  },
};

export const ADMIN_ROUTES = [
  PROTECTED_ROUTES.DASHBOARD,
  PROTECTED_ROUTES.HISTORY,
  PROTECTED_ROUTES.SENDERS,
  PROTECTED_ROUTES.EXPORT,
  PROTECTED_ROUTES.USERS,
];

export const CLIENT_ROUTES = [
  PROTECTED_ROUTES.DASHBOARD,
  PROTECTED_ROUTES.HISTORY,
  PROTECTED_ROUTES.SENDERS,
  PROTECTED_ROUTES.API_KEYS,
  PROTECTED_ROUTES.EXPORT,
  PROTECTED_ROUTES.PROFILE,
];

export type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isVisible?: string;
  items?: NavItem[];
};


