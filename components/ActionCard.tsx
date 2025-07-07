import {Card, CardContent} from "@/components/ui/card";
import {LucideIcon} from "lucide-react";

export default function ActionCard({
  title,
  description,
  Icon,
  color,
  onClick
}: {
  title: string,
  description?: string,
  Icon: LucideIcon,
  color: string,
  onClick?: () => void
}) {
  return (
    <Card onClick={onClick} className={`flex items-center bg-white transition-all duration-300 border-0 rounded-3xl group card-glow-${color} cursor-pointer`}>
      <CardContent className="flex items-center min-w-fit p-8 space-x-6">
        <div className={`min-w-[64px] min-h-[64px] w-16 h-16 bg-gradient-to-br from-${color}-100 to-${color}-200 rounded-3xl flex items-center justify-center`}>
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