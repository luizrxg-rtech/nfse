'use client';

import {Card, CardContent} from "@/components/ui/card";
import {LucideIcon} from "lucide-react";
import {cn} from "@/lib/utils";

export default function ActionCard({
  className = "",
  title,
  description,
  Icon,
  color,
  onClick
}: {
  className?: string;
  title: string,
  description?: string,
  Icon: LucideIcon,
  color: string,
  onClick?: () => void
}) {
  return (
    <Card
      onClick={onClick}
      className={cn(`flex items-center transition-all duration-300 border-0 group cursor-pointer hover:scale-105 hover:shadow-2xl`, className)}
    >
      <div className="bg-primary-100 text-primary-700"/>
      <div className="bg-blue-100 text-blue-700"/>
      <div className="bg-red-100 text-red-700"/>
      <div className="bg-amber-100 text-amber-700"/>
      <div className="bg-purple-100 text-purple-700"/>
      <div className="bg-orange-100 text-orange-700"/>
      <div className="bg-fuchsia-100 text-fuchsia-700"/>
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