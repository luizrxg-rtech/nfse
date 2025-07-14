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
    <Card className="flex flex-col w-full min-h-fit space-y-3">
      <div>
        <h2 className="text-3xl font-bold p-8 text-accent">{title}</h2>
      </div>
      <div className={cn(className, "flex flex-col w-full min-h-fit space-y-4 p-8 py-0")}>
        {children}
      </div>
      {onConfirm || onClear ?
        <div className="flex p-8">
          <Button
            variant="translucid"
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
            <span>Salvar</span>
            <Check className="w-5 h-5"/>
          </Button>
        </div>
      : null}
    </Card>
  )
}