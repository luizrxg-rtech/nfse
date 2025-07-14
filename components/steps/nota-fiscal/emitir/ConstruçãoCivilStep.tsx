'use client';

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

import {cn} from "@/lib/utils";
import {StepComponentProps} from "@/types/Stepper";

export default function ConstruOCivilStep({
  formData, 
  handleInputChange, 
  className
}: StepComponentProps) {
  return (
    <div className={cn("", className)}>
      <h2 className="text-3xl font-bold text-gray-900">Construção Civil</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="art-ou-n" className="font-medium">ART OU N° Projeto</Label>
          <Input
            id="art-ou-n"
            value={formData.artOuN}
            onChange={(e) => handleInputChange('artOuN', e.target.value)}
            placeholder="Digite o número"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="codigo-obra" className="font-medium">Código da obra (CNO)</Label>
          <Input
            id="codigo-obra"
            value={formData.codigoObra}
            onChange={(e) => handleInputChange('codigoObra', e.target.value)}
            placeholder="Digite o código"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label htmlFor="deducoes" className="font-medium">Deduções</Label>
        <Input
          id="deducoes"
          value={formData.deducoes}
          onChange={(e) => handleInputChange('deducoes', e.target.value)}
          placeholder="R$ 0,00"
          
        />
      </div>
    </div>
  );
}
