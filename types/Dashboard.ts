import {LucideIcon} from "lucide-react";
import {LoginMethod} from "@/types/Landing";

export interface QuickAccess {
  title: string,
  description: string,
  icon: LucideIcon,
  color: string,
  path: string,
  onClick?: (path: string) => void,
}