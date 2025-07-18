'use client';

import {cn} from "@/lib/utils";
import {StepComponentProps} from "@/types/Stepper";
import StepSectionCard from "@/components/StepSectionCard";
import ValidatedInput from "@/components/ValidatedInput";
import { useState, useEffect } from "react";

// Validation functions
const validateRequired = (value: string, fieldName: string) => {
  if (!value) return `${fieldName} é obrigatório`;
  return "";
};

export default function ConstruOCivilStep({
  formData, 
  handleInputChange, 
  className
}: StepComponentProps) {
  const [expandedCard, setExpandedCard] = useState<number>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cardValidation, setCardValidation] = useState<Record<number, boolean>>({
    1: false // Construção Civil card
  });

  // Validate fields when formData changes
  useEffect(() => {
    validateFields();
  }, [formData]);

  // Validate all fields and update errors state
  const validateFields = () => {
    const newErrors: Record<string, string> = {};
    let construcaoCivilValid = true;

    // Validate Construção Civil fields
    const artOuNError = validateRequired(formData.artOuN, "ART OU N° Projeto");
    if (artOuNError) {
      newErrors.artOuN = artOuNError;
      construcaoCivilValid = false;
    }

    const codigoObraError = validateRequired(formData.codigoObra, "Código da obra");
    if (codigoObraError) {
      newErrors.codigoObra = codigoObraError;
      construcaoCivilValid = false;
    }

    const deducoesError = validateRequired(formData.deducoes, "Deduções");
    if (deducoesError) {
      newErrors.deducoes = deducoesError;
      construcaoCivilValid = false;
    }

    setErrors(newErrors);
    setCardValidation({
      1: construcaoCivilValid
    });
  };

  const handleCardToggle = (cardIndex: number) => {
    setExpandedCard(expandedCard === cardIndex ? 0 : cardIndex);
  };
  
  // Function to handle moving to the next card when "Salvar" is clicked
  const handleConfirm = (currentCard: number) => {
    // Only proceed if current card is valid
    if (cardValidation[currentCard]) {
      // In this case, we just close the card as there's only one
      setExpandedCard(0);
    }
  };
  
  const handleClear = () => {
    handleInputChange('artOuN', '');
    handleInputChange('codigoObra', '');
    handleInputChange('deducoes', '');
  };

  return (
    <div className={cn("", className)}>
      {/* Construção Civil */}
      <StepSectionCard
        title="Construção Civil"
        onClear={handleClear}
        onConfirm={() => handleConfirm(1)}
        onConfirmDisabled={!cardValidation[1]}
        isExpanded={expandedCard === 1}
        onToggle={() => handleCardToggle(1)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ValidatedInput
            id="art-ou-n"
            label="ART OU N° Projeto"
            value={formData.artOuN}
            onChange={(e) => handleInputChange('artOuN', e.target.value)}
            placeholder="Digite o número"
            required
          />
          <ValidatedInput
            id="codigo-obra"
            label="Código da obra (CNO)"
            value={formData.codigoObra}
            onChange={(e) => handleInputChange('codigoObra', e.target.value)}
            placeholder="Digite o código"
            required
          />
        </div>

        <div className="mt-6">
          <ValidatedInput
            id="deducoes"
            label="Deduções"
            value={formData.deducoes}
            onChange={(e) => handleInputChange('deducoes', e.target.value)}
            placeholder="R$ 0,00"
            required
          />
        </div>
      </StepSectionCard>
    </div>
  );
}
