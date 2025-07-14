import {Card} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Check, X} from "lucide-react";
import {ReactNode} from "react";


interface StepSectionCardProps {
  title: string;
  className?: string;
  onConfirm?: () => void;
  onConfirmDisabled?: boolean;
  onClear?: () => void;
  onClearDisabled?: boolean;
  children: ReactNode
}

export default function StepSectionCard({
  title,
  className,
  onConfirm,
  onClear,
  onConfirmDisabled,
  onClearDisabled,
  children
}: StepSectionCardProps, ) {

  return (
    <Card className="flex flex-col w-full min-h-fit">
      <h2 className="text-3xl font-bold px-12 py-8 text-accent">{title}</h2>
      <div className={cn(className, "flex flex-col w-full min-h-fit space-y-4 p-12 py-0")}>
        {children}
      </div>
      {onConfirm || onClear ?
        <div className="flex p-12">
          <Button
            variant="translucid"
            onClick={onClear}
            disabled={onClearDisabled}
            className="flex items-center space-x-3 px-8 py-3 rounded-full mr-auto"
          >
            <X className="w-5 h-5"/>
            <span>Limpar</span>
          </Button>
          <Button
            onClick={onConfirm}
            disabled={onConfirmDisabled}
            className="flex items-center space-x-3 ml-auto"
          >
            <span>Salvar</span>
            <Check className="w-5 h-5"/>
          </Button>
        </div>
      : null}
    </Card>
  )
}