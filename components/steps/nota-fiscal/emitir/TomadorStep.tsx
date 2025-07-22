'use client';


import {cn} from "@/lib/utils";
import ValidatedInput from "@/components/ValidatedInput";
import RadioOptions from "@/components/RadioOptions";
import {StepComponentProps} from "@/types/Stepper";
import StepSectionCard from "@/components/StepSectionCard";
import { useState, useEffect, useCallback, useRef } from "react";

// Validation functions
const validateCPF = (cpf: string) => {
  if (!cpf) return "CPF é obrigatório";
  if (cpf.length !== 11) return "CPF deve ter 11 dígitos";
  return "";
};

const validateCNPJ = (cnpj: string) => {
  if (!cnpj) return "CNPJ é obrigatório";
  if (cnpj.length !== 14) return "CNPJ deve ter 14 dígitos";
  return "";
};

const validateNome = (nome: string) => {
  if (!nome) return "Nome é obrigatório";
  if (nome.length < 3) return "Nome deve ter pelo menos 3 caracteres";
  return "";
};

const validateCEP = (cep: string) => {
  if (!cep) return "CEP é obrigatório";
  if (cep.length !== 8) return "CEP deve ter 8 dígitos";
  return "";
};

const validateText = (text: string, fieldName: string) => {
  if (!text) return `${fieldName} é obrigatório`;
  return "";
};

const validateEmail = (email: string) => {
  if (!email) return "Email é obrigatório";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Email inválido";
  return "";
};

const validateTelefone = (telefone: string) => {
  if (!telefone) return "Telefone é obrigatório";
  if (telefone.length < 10) return "Telefone deve ter pelo menos 10 dígitos";
  return "";
};

export default function TomadorStep({
  formData,
  handleInputChange,
  className,
  onValidationChange
}: StepComponentProps) {
  const [expandedCard, setExpandedCard] = useState<number>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cardValidation, setCardValidation] = useState<Record<number, boolean>>({
    1: false, // Tomador card
    2: false, // Endereço card
    3: false  // Contato card
  });

  // Validate all fields and update errors state
  const validateFields = useCallback(() => {
    const newErrors: Record<string, string> = {};
    let tomadorValid = true;
    let enderecoValid = true;
    let contatoValid = true;

    // Validate Tomador fields
    if (formData.tipoPessoa === "cpf") {
      const cpfError = validateCPF(formData.cpf);
      if (cpfError) {
        newErrors.cpf = cpfError;
        tomadorValid = false;
      }
    } else if (formData.tipoPessoa === "cnpj") {
      const cnpjError = validateCNPJ(formData.cnpj);
      if (cnpjError) {
        newErrors.cnpj = cnpjError;
        tomadorValid = false;
      }
    }

    const nomeError = validateNome(formData.nomeRazaoSocial);
    if (nomeError) {
      newErrors.nomeRazaoSocial = nomeError;
      tomadorValid = false;
    }

    // Validate Endereço fields
    const cepError = validateCEP(formData.cep);
    if (cepError) {
      newErrors.cep = cepError;
      enderecoValid = false;
    }

    const bairroError = validateText(formData.bairro, "Bairro");
    if (bairroError) {
      newErrors.bairro = bairroError;
      enderecoValid = false;
    }

    const logradouroError = validateText(formData.logradouro, "Logradouro");
    if (logradouroError) {
      newErrors.logradouro = logradouroError;
      enderecoValid = false;
    }

    const numeroError = validateText(formData.numero, "Número");
    if (numeroError) {
      newErrors.numero = numeroError;
      enderecoValid = false;
    }

    const municipioError = validateText(formData.municipio, "Município");
    if (municipioError) {
      newErrors.municipio = municipioError;
      enderecoValid = false;
    }

    const estadoError = validateText(formData.estado, "Estado");
    if (estadoError) {
      newErrors.estado = estadoError;
      enderecoValid = false;
    }

    // Validate Contato fields
    const telefoneError = validateTelefone(formData.telefone);
    if (telefoneError) {
      newErrors.telefone = telefoneError;
      contatoValid = false;
    }

    const emailError = validateEmail(formData.email);
    if (emailError) {
      newErrors.email = emailError;
      contatoValid = false;
    }

    setErrors(newErrors);
    setCardValidation({
      1: tomadorValid,
      2: enderecoValid,
      3: contatoValid
    });
  }, [formData]);

  // Validate fields when validateFields changes (which happens when formData changes)
  useEffect(() => {
    validateFields();
  }, [validateFields]);
  
  // Report validation status to parent component
  // Using a ref to track previous validation state to prevent unnecessary updates
  const prevValidRef = useRef<boolean | null>(null);
  
  useEffect(() => {
    // Step is valid if at least one card is filled out correctly
    const isStepValid = cardValidation[1] || cardValidation[2] || cardValidation[3];
    
    // Only call onValidationChange if validation status has changed
    if (prevValidRef.current !== isStepValid && onValidationChange) {
      onValidationChange(isStepValid);
      prevValidRef.current = isStepValid;
    }
  }, [cardValidation, onValidationChange]);

  const handleCardToggle = (cardIndex: number) => {
    setExpandedCard(expandedCard === cardIndex ? 0 : cardIndex);
  };
  
  const handleConfirm = (currentCard: number) => {
    if (cardValidation[currentCard]) {
      const nextCard = currentCard < 3 ? currentCard + 1 : 0;
      setExpandedCard(nextCard);
    }
  };
  
  const handleClear = (cardType: string) => {
    if (cardType === 'tomador') {
      handleInputChange('tipoPessoa', 'cnpj');
      handleInputChange('estabelecimentoTupaciguara', 'sim');
      handleInputChange('cpf', '');
      handleInputChange('cnpj', '');
      handleInputChange('nomeRazaoSocial', '');
    } else if (cardType === 'endereco') {
      handleInputChange('resideExterior', 'nao');
      handleInputChange('pais', 'Brasil');
      handleInputChange('cep', '');
      handleInputChange('bairro', '');
      handleInputChange('logradouro', '');
      handleInputChange('numero', '');
      handleInputChange('complemento', '');
      handleInputChange('municipio', '');
      handleInputChange('estado', '');
    } else if (cardType === 'contato') {
      handleInputChange('telefone', '');
      handleInputChange('email', '');
    }
  };

  return (
    <div className={cn("", className)}>
      {/* Tomador de serviços */}
      <StepSectionCard
        title="Tomador de serviços"
        onClear={() => handleClear('tomador')}
        onConfirm={() => handleConfirm(1)}
        onConfirmDisabled={!cardValidation[1]}
        isExpanded={expandedCard === 1}
        onToggle={() => handleCardToggle(1)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Tipo de Pessoa */}
          <RadioOptions
            label="Tipo de Pessoa"
            value={formData.tipoPessoa}
            values={[
              {buttonValue: "cpf", text: "CPF"},
              {buttonValue: "cnpj", text: "CNPJ"},
              {buttonValue: "nif", text: "NIF (Exterior)"}
            ]}
            onChange={(value: string) => handleInputChange('tipoPessoa', value)}
          />

          {/* Estabelecimento em Tupaciguara */}
          {formData.tipoPessoa === "cnpj" ?
            <RadioOptions
              label="Estabelecimento se encontra no Município de Tupaciguara ?"
              value={formData.estabelecimentoTupaciguara}
              values={[
                {buttonValue: "sim", text: "Sim"},
                {buttonValue: "nao", text: "Não"},
              ]}
              onChange={(value: string) => handleInputChange('estabelecimentoTupaciguara', value)}
            /> : <div/>
          }

          {/* CPF/CNPJ */}
          {formData.tipoPessoa === "cpf" ?
            <ValidatedInput
              id="cpf-input"
              label="CPF"
              type="number"
              value={formData.cpf}
              onChange={(e) => handleInputChange('cpf', e.target.value)}
              placeholder="000.000.000-00"
              error={errors.cpf}
              required
            /> :
            <ValidatedInput
              id="cnpj-input"
              label="CNPJ"
              type="number"
              value={formData.cnpj}
              onChange={(e) => handleInputChange('cnpj', e.target.value)}
              placeholder="00.000.000/0000-00"
              error={errors.cnpj}
              required
            />
          }

          {/* Nome/Razão Social */}
          <ValidatedInput
            id="nome-razao"
            label={formData.tipoPessoa === "cpf" ? "Nome" : "Razão Social"}
            value={formData.nomeRazaoSocial}
            onChange={(e) => handleInputChange('nomeRazaoSocial', e.target.value)}
            placeholder="Digite o nome ou razão social"
            error={errors.nomeRazaoSocial}
            required
          />
        </div>
      </StepSectionCard>

      {/* Endereço */}
      <StepSectionCard
        title="Endereço"
        onClear={() => handleClear('endereco')}
        onConfirm={() => handleConfirm(2)}
        onConfirmDisabled={!cardValidation[2]}
        isExpanded={expandedCard === 2}
        onToggle={() => handleCardToggle(2)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <RadioOptions
            value={formData.resideExterior}
            values={[
              {buttonValue: "sim", text: "Sim"},
              {buttonValue: "nao", text: "Não"},
            ]}
            onChange={(value: string) => handleInputChange('resideExterior', value)}
            label="Reside no exterior ?"
          />
          <ValidatedInput
            id="pais"
            label="País"
            value={formData.resideExterior === "sim" ? formData.pais : "Brasil"}
            onChange={(e) => handleInputChange(
              'pais',
              formData.resideExterior === "sim" ? e.target.value : "Brasil"
            )}
            placeholder="Digite o país"
            required
          />
          <ValidatedInput
            id="cep"
            label="CEP"
            type="number"
            value={formData.cep}
            onChange={(e) => handleInputChange('cep', e.target.value)}
            placeholder="00000-000"
            error={errors.cep}
            required
          />
          <ValidatedInput
            id="bairro"
            label="Bairro"
            value={formData.bairro}
            onChange={(e) => handleInputChange('bairro', e.target.value)}
            placeholder="Digite o bairro"
            error={errors.bairro}
            required
          />
          <div className="flex flex-row gap-4">
            <ValidatedInput
              id="logradouro"
              label="Logradouro"
              value={formData.logradouro}
              onChange={(e) => handleInputChange('logradouro', e.target.value)}
              placeholder="Digite o logradouro"
              className="w-2/3"
              error={errors.logradouro}
              required
            />
            <ValidatedInput
              id="numero"
              label="Número"
              type="number"
              value={formData.numero}
              onChange={(e) => handleInputChange('numero', e.target.value)}
              placeholder="Digite o número"
              className="w-1/3"
              error={errors.numero}
              required
            />
          </div>
          <ValidatedInput
            id="complemento"
            label="Complemento"
            value={formData.complemento}
            onChange={(e) => handleInputChange('complemento', e.target.value)}
            placeholder="Digite o complemento"
          />
          <ValidatedInput
            id="municipio"
            label="Município"
            value={formData.municipio}
            onChange={(e) => handleInputChange('municipio', e.target.value)}
            placeholder="Digite o município"
            error={errors.municipio}
            required
          />
          <ValidatedInput
            id="estado"
            label="Estado"
            value={formData.estado}
            onChange={(e) => handleInputChange('estado', e.target.value)}
            placeholder="Digite o estado"
            error={errors.estado}
            required
          />
        </div>
      </StepSectionCard>

      {/* Contato */}
      <StepSectionCard
        title="Contato"
        onClear={() => handleClear('contato')}
        onConfirm={() => handleConfirm(3)}
        onConfirmDisabled={!cardValidation[3]}
        isExpanded={expandedCard === 3}
        onToggle={() => handleCardToggle(3)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ValidatedInput
            id="telefone"
            label="Telefone"
            type="number"
            value={formData.telefone}
            onChange={(e) => handleInputChange('telefone', e.target.value)}
            placeholder="(00) 00000-0000"
            error={errors.telefone}
            required
          />
          <ValidatedInput
            id="email"
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="exemplo@email.com"
            error={errors.email}
            required
          />
        </div>
      </StepSectionCard>
    </div>
  );
}