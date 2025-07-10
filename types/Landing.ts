import {LucideIcon} from "lucide-react";

export type LoginMethod = 'certificate' | 'gov';

export interface Access {
  title: string,
  description: string,
  icon: LucideIcon,
  color: string,
  method?: LoginMethod,
  onClick?: (method: LoginMethod) => void,
}

export interface Service {
  title: string,
  icon: LucideIcon,
  color: string,
  onClick?: () => void,
}