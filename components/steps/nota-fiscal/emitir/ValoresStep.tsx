'use client';

import {Textarea} from "@/components/ui/textarea";

import {cn} from "@/lib/utils";
import RadioOptions from "@/components/RadioOptions";
import {StepComponentProps} from "@/types/Stepper";
import StepSectionCard from "@/components/StepSectionCard";
import ValidatedInput from "@/components/ValidatedInput";
import { useState, useEffect } from "react";

// Validation functions
const validateRequired = (value: string, fieldName: string) => {
  if (!value) return `${fieldName} é obrigatório`;
  return "";
};

const validateNumber = (value: string, fieldName: string) => {
  if (!value) return `${fieldName} é obrigatório`;
  if (isNaN(Number(value))) return `${fieldName} deve ser um número`;
  return "";
};

export default function ValoresStep({
  formData, 
  handleInputChange, 
  className
}: StepComponentProps) {
  const [expandedCard, setExpandedCard] = useState<number>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cardValidation, setCardValidation] = useState<Record<number, boolean>>({
    1: false, // Valor Serviço
    2: false, // ISS e Retenções Federais
    3: false  // Outras Informações
  });

  // Validate fields when formData changes
  useEffect(() => {
    validateFields();
  }, [formData]);

  // Validate all fields and update errors state
  const validateFields = () => {
    const newErrors: Record<string, string> = {};
    let valorServicoValid = true;
    let issRetencoesValid = true;
    let outrasInfoValid = true;

    // Validate Valor Serviço fields
    const valorServicoError = validateNumber(formData.valorServico, "Valor Serviço");
    if (valorServicoError) {
      newErrors.valorServico = valorServicoError;
      valorServicoValid = false;
    }

    // Validate ISS e Retenções Federais fields
    const issError = validateNumber(formData.iss, "ISS");
    if (issError) {
      newErrors.iss = issError;
      issRetencoesValid = false;
    }

    const issRetidoError = validateRequired(formData.issRetido, "ISS retido");
    if (issRetidoError) {
      newErrors.issRetido = issRetidoError;
      issRetencoesValid = false;
    }

    // For Outras Informações, we don't have required fields, so it's always valid
    outrasInfoValid = true;

    setErrors(newErrors);
    setCardValidation({
      1: valorServicoValid,
      2: issRetencoesValid,
      3: outrasInfoValid
    });
  };

  const handleCardToggle = (cardIndex: number) => {
    setExpandedCard(expandedCard === cardIndex ? 0 : cardIndex);
  };
  
  // Function to handle moving to the next card when "Salvar" is clicked
  const handleConfirm = (currentCard: number) => {
    // Only proceed if current card is valid
    if (cardValidation[currentCard]) {
      // Calculate the next card (wrap around to 1 if we're at the last card)
      const nextCard = currentCard < 3 ? currentCard + 1 : 1;
      setExpandedCard(nextCard);
    }
  };
  
  const handleClear = (cardType: string) => {
    if (cardType === 'valor-servico') {
      handleInputChange('valorServico', '');
    } else if (cardType === 'iss-retencoes') {
      handleInputChange('iss', '');
      handleInputChange('issRetido', 'nao');
      handleInputChange('pis', '');
      handleInputChange('cofins', '');
      handleInputChange('ir', '');
      handleInputChange('csll', '');
      handleInputChange('inss', '');
    } else if (cardType === 'outras-info') {
      handleInputChange('outrasInformacoes', '');
    }
  };

  return (
    <div className={cn("", className)}>
      {/* Valor Serviço */}
      <StepSectionCard
        title="Valor Serviço"
        onClear={() => handleClear('valor-servico')}
        onConfirm={() => handleConfirm(1)}
        onConfirmDisabled={!cardValidation[1]}
        isExpanded={expandedCard === 1}
        onToggle={() => handleCardToggle(1)}
      >
        <div className="space-y-6">
          <ValidatedInput
            id="valor-servico-valores"
            label="Valor Serviço"
            value={formData.valorServico}
            onChange={(e) => handleInputChange('valorServico', e.target.value)}
            placeholder="R$ 4.000,00"
            required
          />
        </div>
      </StepSectionCard>

      {/* ISS e Retenções Federais */}
      <StepSectionCard
        title="ISS e Retenções Federais"
        onClear={() => handleClear('iss-retencoes')}
        onConfirm={() => handleConfirm(2)}
        onConfirmDisabled={!cardValidation[2]}
        isExpanded={expandedCard === 2}
        onToggle={() => handleCardToggle(2)}
      >
        <div className="space-y-6">
          {/* ISS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <ValidatedInput
                id="iss"
                label="ISS"
                value={formData.iss}
                onChange={(e) => handleInputChange('iss', e.target.value)}
                placeholder="R$ 0,00"
                required
              />
            </div>
            <div className="space-y-6">
              <RadioOptions
                label="ISS retido?"
                value={formData.issRetido}
                values={[
                  {buttonValue: "sim", text: "SIM"},
                  {buttonValue: "nao", text: "NÃO"},
                ]}
                onChange={(value) => handleInputChange('issRetido', value)}
              />
            </div>
          </div>

          {/* Retenções Federais */}
          <div className="space-y-6">
            <label className="font-medium">Retenções Federais</label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <ValidatedInput
                  id="pis"
                  label="PIS"
                  value={formData.pis}
                  onChange={(e) => handleInputChange('pis', e.target.value)}
                  placeholder="R$ 0,00"
                />
              </div>
              <div className="space-y-3">
                <ValidatedInput
                  id="cofins"
                  label="COFINS"
                  value={formData.cofins}
                  onChange={(e) => handleInputChange('cofins', e.target.value)}
                  placeholder="R$ 0,00"
                />
              </div>
              <div className="space-y-3">
                <ValidatedInput
                  id="ir"
                  label="IR"
                  value={formData.ir}
                  onChange={(e) => handleInputChange('ir', e.target.value)}
                  placeholder="R$ 0,00"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <ValidatedInput
                  id="csll"
                  label="CSLL"
                  value={formData.csll}
                  onChange={(e) => handleInputChange('csll', e.target.value)}
                  placeholder="R$ 0,00"
                />
              </div>
              <div className="space-y-3">
                <ValidatedInput
                  id="inss"
                  label="INSS"
                  value={formData.inss}
                  onChange={(e) => handleInputChange('inss', e.target.value)}
                  placeholder="R$ 0,00"
                />
              </div>
            </div>
          </div>
        </div>
      </StepSectionCard>

      {/* Outras Informações */}
      <StepSectionCard
        title="Outras Informações"
        onClear={() => handleClear('outras-info')}
        onConfirm={() => handleConfirm(3)}
        isExpanded={expandedCard === 3}
        onToggle={() => handleCardToggle(3)}
      >
        <div className="space-y-6">
          <div className="space-y-3">
            <label htmlFor="outras-informacoes" className="font-medium">Outras Informações</label>
            <Textarea
              id="outras-informacoes"
              value={formData.outrasInformacoes}
              onChange={(e) => handleInputChange('outrasInformacoes', e.target.value)}
              placeholder="Digite outras informações relevantes"
              className="min-h-[120px]"
            />
          </div>
        </div>
      </StepSectionCard>
    </div>
  );
}