import { SidebarLink } from "@/components/SidebarItems";
import {
  Cog,
  User,
  HomeIcon,
  CandlestickChart,
  CirclePercent,
  FileDown,
} from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon },
  { href: "/account", title: "Cuenta", icon: User },
  { href: "/settings", title: "Configuracion", icon: Cog },
  { href: "/operations", title: "Operaciones", icon: CandlestickChart },
  { href: "/prices", title: "Precios", icon: CirclePercent },
  { href: "/reports", title: "Reportes", icon: FileDown },
];

export const additionalLinks: AdditionalLinks[] = [];
