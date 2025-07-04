import {cn} from "@/lib/utils";
import {StepComponentProps} from "@/types/Stepper";

export default function IntermediarioStep({
  formData, 
  handleInputChange, 
  className
}: StepComponentProps) {
  return (
    <div className={cn("text-center py-16", className)}>
      <h2 className="text-3xl font-bold text-gray-900 mb-6 gradient-text">Intermediário</h2>
      <p className="text-gray-600 text-lg">Esta etapa será implementada nas próximas versões.</p>
    </div>
  );
}