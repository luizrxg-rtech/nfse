import {Home, LucideIcon} from "lucide-react";

export interface Submenu {
  id: string;
  label: string;
}

export interface Item {
  id: string;
  label: string;
  icon: LucideIcon;
  submenus?: Submenu[]
}