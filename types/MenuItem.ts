import {Home, LucideIcon} from "lucide-react";

export interface Submenu {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface Item extends Submenu {
  submenus?: Submenu[]
}