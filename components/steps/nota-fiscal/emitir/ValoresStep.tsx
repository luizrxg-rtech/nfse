'use client';

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Textarea} from "@/components/ui/textarea";

import {cn} from "@/lib/utils";
import {StepComponentProps} from "@/types/Stepper";

export default function ValoresStep({
  formData, 
  handleInputChange, 
  className
}: StepComponentProps) {
  return (
    <div className={cn("", className)}>
      <h2 className="text-3xl font-bold text-gray-900">Valores</h2>

      {/* Valor Serviço */}
      <div className="space-y-3">
        <Label htmlFor="valor-servico-valores">Valor Serviço*</Label>
        <Input
          id="valor-servico-valores"
          value={formData.valorServico}
          onChange={(e) => handleInputChange('valorServico', e.target.value)}
          placeholder="R$ 4.000,00"
          
        />
      </div>

      {/* ISS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="iss" className="font-medium">ISS</Label>
          <Input
            id="iss"
            value={formData.iss}
            onChange={(e) => handleInputChange('iss', e.target.value)}
            placeholder="R$ 0,00"
          />
        </div>
        <div className="space-y-6">
          <Label className="font-medium">ISS retido?*</Label>
          <RadioGroup
            value={formData.issRetido}
            onValueChange={(value) => handleInputChange('issRetido', value)}
            className="flex space-x-8"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="sim" id="iss-sim" className="w-5 h-5"/>
              <Label htmlFor="iss-sim" className="font-medium">SIM</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="nao" id="iss-nao" className="w-5 h-5"/>
              <Label htmlFor="iss-nao" className="font-medium">NÃO</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Retenções Federais */}
      <div className="space-y-6">
        <Label>Retenções Federais</Label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <Label htmlFor="pis" className="font-medium">PIS</Label>
            <Input
              id="pis"
              value={formData.pis}
              onChange={(e) => handleInputChange('pis', e.target.value)}
              placeholder="R$ 0,00"
              
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="cofins" className="font-medium">COFINS</Label>
            <Input
              id="cofins"
              value={formData.cofins}
              onChange={(e) => handleInputChange('cofins', e.target.value)}
              placeholder="R$ 0,00"
              
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="ir" className="font-medium">IR</Label>
            <Input
              id="ir"
              value={formData.ir}
              onChange={(e) => handleInputChange('ir', e.target.value)}
              placeholder="R$ 0,00"
              
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="csll" className="font-medium">CSLL</Label>
            <Input
              id="csll"
              value={formData.csll}
              onChange={(e) => handleInputChange('csll', e.target.value)}
              placeholder="R$ 0,00"
              
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="inss" className="font-medium">INSS</Label>
            <Input
              id="inss"
              value={formData.inss}
              onChange={(e) => handleInputChange('inss', e.target.value)}
              placeholder="R$ 0,00"
              
            />
          </div>
        </div>
      </div>

      {/* Outras Informações */}
      <div className="space-y-3">
        <Label htmlFor="outras-informacoes">Outras Informações</Label>
        <Textarea
          id="outras-informacoes"
          value={formData.outrasInformacoes}
          onChange={(e) => handleInputChange('outrasInformacoes', e.target.value)}
          placeholder="Digite outras informações relevantes"
          className="min-h-[120px]"
        />
      </div>
    </div>
  );
}
