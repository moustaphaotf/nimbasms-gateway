import {
  Building2,
  ChartSpline,
  FileDown,
  History,
  Key,
  LayoutDashboard,
  LucideIcon,
  MessageSquare,
  UserCircle2,
} from "lucide-react";
import { AccessTokenUser } from "../api/types";

export const PUBLIC_ROUTES = {
  LANDING: "/",
  NOT_FOUND: "/not-found",
  FORBIDDEN: "/forbidden",
  MEMBERSHIP: "/dashboard/membership",
} as const;

export const PROTECTED_ROUTES: Record<string, NavItem> = {
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
  REPORTING: {
    icon: ChartSpline,
    title: "Reporting",
    url: "/dashboard/reporting",
  },
  USERS: {
    icon: Building2,
    title: "Comptes Client",
    url: "/dashboard/users",
  },
  MEMBERSHIP: {
    icon: Building2,
    title: "Espace Membres",
    url: "/dashboard/membership",
  },
  PROFILE: {
    icon: UserCircle2,
    title: "Mon Profil",
    url: "/dashboard/profile",
  },
};

export const ADMIN_ROUTES = [
  PROTECTED_ROUTES.DASHBOARD,
  PROTECTED_ROUTES.HISTORY,
  PROTECTED_ROUTES.SENDERS,
  PROTECTED_ROUTES.EXPORT,
  PROTECTED_ROUTES.REPORTING,
  PROTECTED_ROUTES.USERS,
];

export const CLIENT_ROUTES = [
  PROTECTED_ROUTES.DASHBOARD,
  PROTECTED_ROUTES.HISTORY,
  PROTECTED_ROUTES.SENDERS,
  PROTECTED_ROUTES.API_KEYS,
  PROTECTED_ROUTES.MEMBERSHIP,
  PROTECTED_ROUTES.EXPORT,
  PROTECTED_ROUTES.PROFILE,
];

export const DEVELOPER_ROUTES = [
  PROTECTED_ROUTES.DASHBOARD,
  PROTECTED_ROUTES.API_KEYS,
  PROTECTED_ROUTES.PROFILE,
];

export const MEMBER_ROUTES = [
  PROTECTED_ROUTES.HISTORY,
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

export const getUserRoutes = (user: AccessTokenUser | null) => {
  if (!user) return [];
  if (user.isStaff) return ADMIN_ROUTES;

  if (user.organizations.length === 0) return CLIENT_ROUTES;

  const orgId = localStorage.getItem("orgId");

  let currentOrg: AccessTokenUser["organizations"][number] | undefined =
    undefined;

  currentOrg = user.organizations.find((item) => item.uid === orgId);

  if (!currentOrg) return CLIENT_ROUTES;

  switch (currentOrg.role) {
    case "Member":
      return MEMBER_ROUTES;
    case "Developer":
      return DEVELOPER_ROUTES;
    case "Owner":
      return CLIENT_ROUTES;
  }
};
