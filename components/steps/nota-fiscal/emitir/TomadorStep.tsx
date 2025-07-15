'use client';


import {cn} from "@/lib/utils";
import LabeledInput from "@/components/LabeledInput";
import RadioOptions from "@/components/RadioOptions";
import {StepComponentProps} from "@/types/Stepper";
import StepSectionCard from "@/components/StepSectionCard";

export default function TomadorStep({
  formData,
  handleInputChange,
  className
}: StepComponentProps) {

  return (
    <div className={cn("", className)}>
      {/* Tomador de serviços */}
      <StepSectionCard
        title="Tomador de serviços"
        onClear={() => {}}
        onConfirm={() => {}}
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
            <LabeledInput
              id="cpf-input"
              label="CPF"
              type="number"
              value={formData.cpf}
              onChange={(e) => handleInputChange('cpf', e.target.value)}
              placeholder="000.000.000-00"
            /> :
            <LabeledInput
              id="cnpj-input"
              label="CNPJ"
              type="number"
              value={formData.cnpj}
              onChange={(e) => handleInputChange('cnpj', e.target.value)}
              placeholder="00.000.000/0000-00"
            />
          }

          {/* Nome/Razão Social */}
          <LabeledInput
            id="nome-razao"
            label={formData.tipoPessoa === "cpf" ? "Nome" : "Razão Social"}
            value={formData.nomeRazaoSocial}
            onChange={(e) => handleInputChange('nomeRazaoSocial', e.target.value)}
            placeholder="Digite o nome ou razão social"
          />
        </div>
      </StepSectionCard>

      {/* Endereço */}
      <StepSectionCard
        title="Endereço"
        onClear={() => {}}
        onConfirm={() => {}}
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
          <LabeledInput
            id="pais"
            label="País"
            value={formData.resideExterior === "sim" ? formData.pais : "Brasil"}
            onChange={(e) => handleInputChange(
              'pais',
              formData.resideExterior === "sim" ? e.target.value : "Brasil"
            )}
            placeholder="Digite o país"
          />
          <LabeledInput
            id="cep"
            label="CEP"
            type="number"
            value={formData.cep}
            onChange={(e) => handleInputChange('cep', e.target.value)}
            placeholder="00000-000"
          />
          <LabeledInput
            id="bairro"
            label="Bairro"
            value={formData.bairro}
            onChange={(e) => handleInputChange('bairro', e.target.value)}
            placeholder="Digite o bairro"
          />
          <div className="flex flex-row gap-4">
            <LabeledInput
              id="logradouro"
              label="Logradouro"
              value={formData.logradouro}
              onChange={(e) => handleInputChange('logradouro', e.target.value)}
              placeholder="Digite o logradouro"
              className="w-2/3"
            />
            <LabeledInput
              id="numero"
              label="Número"
              type="number"
              value={formData.numero}
              onChange={(e) => handleInputChange('numero', e.target.value)}
              placeholder="Digite o número"
              className="w-1/3"
            />
          </div>
          <LabeledInput
            id="complemento"
            label="Complemento"
            value={formData.complemento}
            onChange={(e) => handleInputChange('complemento', e.target.value)}
            placeholder="Digite o complemento"
          />
          <LabeledInput
            id="municipio"
            label="Município"
            value={formData.municipio}
            onChange={(e) => handleInputChange('municipio', e.target.value)}
            placeholder="Digite o município"
          />
          <LabeledInput
            id="estado"
            label="Estado"
            value={formData.estado}
            onChange={(e) => handleInputChange('estado', e.target.value)}
            placeholder="Digite o estado"
          />
        </div>
      </StepSectionCard>

      {/* Contato */}
      <StepSectionCard
        title="Tomador de serviços"
        onClear={() => {}}
        onConfirm={() => {}}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LabeledInput
            id="telefone"
            label="Telefone"
            type="number"
            value={formData.telefone}
            onChange={(e) => handleInputChange('telefone', e.target.value)}
            placeholder="(00) 00000-0000"
          />
          <LabeledInput
            id="email"
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="exemplo@email.com"
          />
        </div>
      </StepSectionCard>
    </div>
  );
}