import {Card} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Check, ChevronDown, ChevronUp, X} from "lucide-react";
import {ReactNode, useState} from "react";


interface StepSectionCardProps {
  title: string;
  className?: string;
  onConfirm?: () => void;
  onConfirmDisabled?: boolean;
  onClear?: () => void;
  onClearDisabled?: boolean;
  children: ReactNode;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export default function StepSectionCard({
  title,
  className,
  onConfirm,
  onClear,
  onConfirmDisabled,
  onClearDisabled,
  children,
  isExpanded = false,
  onToggle
}: StepSectionCardProps) {
  
  // Use internal state if no external control is provided
  const [internalExpanded, setInternalExpanded] = useState(false);
  
  // Determine if the card is expanded based on props or internal state
  const expanded = onToggle ? isExpanded : internalExpanded;
  
  // Handle toggle click
  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalExpanded(!internalExpanded);
    }
  };

  return (
    <Card className="flex flex-col w-full min-h-fit">
      <div 
        className="flex items-center justify-between cursor-pointer p-8" 
        onClick={handleToggle}
      >
        <h2 className="text-3xl font-bold text-accent">{title}</h2>
        {expanded ? 
          <ChevronUp className="w-6 h-6 text-accent" /> : 
          <ChevronDown className="w-6 h-6 text-accent" />
        }
      </div>
      <div 
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          expanded ? "mt-3 max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className={cn(className, "flex flex-col w-full min-h-fit space-y-4 p-8 py-0")}>
          {children}
        </div>
        {onConfirm || onClear ?
          <div className="flex p-8">
            <Button
              variant="ghost"
              onClick={onClear}
              disabled={onClearDisabled}
              className="flex items-center space-x-3 mr-auto"
            >
              <X className="w-5 h-5"/>
              <span>Limpar</span>
            </Button>
            <Button
              onClick={onConfirm}
              disabled={onConfirmDisabled}
              className="flex items-center space-x-3 ml-auto"
            >
              <span>Confirmar</span>
              <Check className="w-5 h-5"/>
            </Button>
          </div>
        : null}
      </div>
    </Card>
  )
}