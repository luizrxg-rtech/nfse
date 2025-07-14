'use client';

import {Card, CardContent} from "@/components/ui/card";
import {LucideIcon} from "lucide-react";
import {cn} from "@/lib/utils";

interface ActionCardProps {
  className?: string;
  title: string,
  description?: string,
  Icon: LucideIcon,
  color: string,
  onClick?: () => void
}

export default function ActionCard({
  className = "",
  title,
  description,
  Icon,
  color,
  onClick
}: ActionCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(`flex items-center transition-all duration-300 border-0 group cursor-pointer hover:scale-105 hover:shadow-2xl`, className)}
    >
      <CardContent className="flex items-center min-w-fit p-8 space-x-6">
        <div className={`min-w-[64px] min-h-[64px] w-16 h-16 rounded-xl flex items-center justify-center bg-${color}-100 `}>
          <Icon className={`w-8 h-8 text-${color}-700`}/>
        </div>
        <div className="flex flex-col items-start">
          <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
          {description && <p className="text-sm text-gray-600 font-medium">{description}</p>}
        </div>
      </CardContent>
    </Card>
  );
}