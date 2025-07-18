'use client';

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";

import {cn} from "@/lib/utils";
import {StepComponentProps} from "@/types/Stepper";
import StepSectionCard from "@/components/StepSectionCard";
import ValidatedInput from "@/components/ValidatedInput";
import { useState, useEffect, useCallback } from "react";
import RadioOptions from "@/components/RadioOptions";
import {Plus, X} from "lucide-react";

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

// Define interface for service item
interface ServiceItem {
  id: string;
  descricao: string;
  tributavel: string;
  quantidade: string;
  valorUnitario: string;
  valorTotal: string;
}

export default function ServicosStep({
  formData, 
  handleInputChange, 
  className,
  onValidationChange
}: StepComponentProps) {
  const [expandedCard, setExpandedCard] = useState<number>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cardValidation, setCardValidation] = useState<Record<number, boolean>>({
    1: false, // Valor e Atividade
    2: false, // Tributação e Local
    3: false  // Discriminação e Itens
  });
  
  // State for service items
  const [serviceItems, setServiceItems] = useState<ServiceItem[]>([]);
  // State for detalhamento checkbox
  const [detalhamento, setDetalhamento] = useState<boolean>(false);

  // Validate fields when formData changes
  useEffect(() => {
    validateFields();
  }, [formData]);

  // Calculate total value of all service items
  const calculateTotalValue = useCallback(() => {
    if (serviceItems.length === 0) return "0,00";
    
    const total = serviceItems.reduce((sum, item) => {
      const value = parseFloat(item.valorTotal.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
      return sum + value;
    }, 0);
    
    return total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }, [serviceItems]);
  
  // Check if subtotal exceeds valor serviço
  const isSubtotalExceedingValorServico = useCallback(() => {
    if (!formData.valorServico || serviceItems.length === 0) return false;
    
    const subtotal = parseFloat(calculateTotalValue().replace(',', '.'));
    const valorServico = parseFloat(formData.valorServico.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    
    return subtotal > valorServico;
  }, [formData.valorServico, serviceItems, calculateTotalValue]);

  // Calculate total value based on quantity and unit value
  const calculateItemTotal = useCallback((quantidade: string, valorUnitario: string) => {
    const qty = parseFloat(quantidade) || 0;
    const unitValue = parseFloat(valorUnitario.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    const total = qty * unitValue;
    return total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }, []);

  // Auto-calculate total value when quantity or unit value changes
  useEffect(() => {
    if (formData.quantidade && formData.valorUnitario) {
      const total = calculateItemTotal(formData.quantidade, formData.valorUnitario);
      handleInputChange('valorTotal', total);
    }
  }, [formData.quantidade, formData.valorUnitario, calculateItemTotal, handleInputChange]);

  // Report validation status to parent component
  useEffect(() => {
    // Step is valid if at least one card is valid
    const isStepValid = cardValidation[1] || cardValidation[2] || cardValidation[3];
    
    if (onValidationChange) {
      onValidationChange(isStepValid);
    }
  }, [cardValidation, onValidationChange]);

  // Validate all fields and update errors state
  const validateFields = useCallback(() => {
    const newErrors: Record<string, string> = {};
    let valorAtividadeValid = true;
    let tributacaoLocalValid = true;
    let discriminacaoItensValid = true;

    // Validate Valor e Atividade fields
    const valorServicoError = validateNumber(formData.valorServico, "Valor Serviço");
    if (valorServicoError) {
      newErrors.valorServico = valorServicoError;
      valorAtividadeValid = false;
    }

    const codigoTributacaoError = validateRequired(formData.codigoTributacao, "Código de Tributação Municipal");
    if (codigoTributacaoError) {
      newErrors.codigoTributacao = codigoTributacaoError;
      valorAtividadeValid = false;
    }

    const codigoCnaeError = validateRequired(formData.codigoCnae, "Código CNAE");
    if (codigoCnaeError) {
      newErrors.codigoCnae = codigoCnaeError;
      valorAtividadeValid = false;
    }

    const listaServicoError = validateRequired(formData.listaServico, "Lista de Serviço");
    if (listaServicoError) {
      newErrors.listaServico = listaServicoError;
      valorAtividadeValid = false;
    }

    // Validate Tributação e Local fields
    const naturezaOperacaoError = validateRequired(formData.naturezaOperacao, "Natureza da Operação");
    if (naturezaOperacaoError) {
      newErrors.naturezaOperacao = naturezaOperacaoError;
      tributacaoLocalValid = false;
    }

    const regimeEspecialError = validateRequired(formData.regimeEspecial, "Regime Especial Tributação");
    if (regimeEspecialError) {
      newErrors.regimeEspecial = regimeEspecialError;
      tributacaoLocalValid = false;
    }

    const localPrestacaoError = validateRequired(formData.localPrestacao, "Local da Prestação");
    if (localPrestacaoError) {
      newErrors.localPrestacao = localPrestacaoError;
      tributacaoLocalValid = false;
    }

    const aliquotaError = validateNumber(formData.aliquota, "Alíquota");
    if (aliquotaError) {
      newErrors.aliquota = aliquotaError;
      tributacaoLocalValid = false;
    }

    // Validate Discriminação e Itens fields
    const discriminacaoError = validateRequired(formData.discriminacao, "Discriminação");
    if (discriminacaoError) {
      newErrors.discriminacao = discriminacaoError;
      discriminacaoItensValid = false;
    }

    const tributavelError = validateRequired(formData.tributavel, "Tributável");
    if (tributavelError) {
      newErrors.tributavel = tributavelError;
      discriminacaoItensValid = false;
    }

    // Additional validation: If detalhamento is checked, require at least one item
    if (detalhamento && serviceItems.length === 0) {
      newErrors.items = "Adicione pelo menos um item";
      discriminacaoItensValid = false;
    }

    // Validate that valor serviço matches the sum of all item values when detalhamento is checked
    if (detalhamento && serviceItems.length > 0 && formData.valorServico) {
      const totalItems = calculateTotalValue();
      const valorServico = formData.valorServico.replace(/[^\d,]/g, '').replace(',', '.');
      
      // Compare the values (convert to numbers for comparison)
      if (parseFloat(totalItems.replace(',', '.')) !== parseFloat(valorServico)) {
        newErrors.valorMatch = "O valor do serviço deve ser igual à soma dos valores dos itens";
        discriminacaoItensValid = false;
      }
    }

    setErrors(newErrors);
    setCardValidation({
      1: valorAtividadeValid,
      2: tributacaoLocalValid,
      3: discriminacaoItensValid
    });
  }, [formData, detalhamento, serviceItems.length, calculateTotalValue]);

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
    if (cardType === 'valor-atividade') {
      handleInputChange('valorServico', '');
      handleInputChange('codigoTributacao', '');
      handleInputChange('codigoCnae', '');
      handleInputChange('listaServico', '');
    } else if (cardType === 'tributacao-local') {
      handleInputChange('naturezaOperacao', '');
      handleInputChange('regimeEspecial', '');
      handleInputChange('localPrestacao', '');
      handleInputChange('aliquota', '');
    } else if (cardType === 'discriminacao-itens') {
      handleInputChange('discriminacao', '');
      handleInputChange('descricao', '');
      handleInputChange('tributavel', 'sim');
      handleInputChange('quantidade', '');
      handleInputChange('valorUnitario', '');
      handleInputChange('valorTotal', '');
      // Clear service items
      setServiceItems([]);
    }
  };
  
  // Clear the item form fields
  const handleClearItemForm = () => {
    handleInputChange('descricao', '');
    handleInputChange('tributavel', 'sim');
    handleInputChange('quantidade', '');
    handleInputChange('valorUnitario', '');
    handleInputChange('valorTotal', '');
  };
  
  // Add a new item to the table
  const handleAddItem = () => {
    // Validate required fields
    if (!formData.descricao || !formData.quantidade || !formData.valorUnitario) {
      // Show error or return
      return;
    }
    
    // Create new item
    const newItem: ServiceItem = {
      id: Date.now().toString(), // Generate unique ID
      descricao: formData.descricao,
      tributavel: formData.tributavel,
      quantidade: formData.quantidade,
      valorUnitario: formData.valorUnitario,
      valorTotal: formData.valorTotal
    };
    
    // Add to items array
    setServiceItems(prev => [...prev, newItem]);
    
    // Clear form after adding
    handleClearItemForm();
    
    // Explicitly clear valorTotal to fix the issue where it's not being cleared
    // This needs to be done after handleClearItemForm to ensure it's properly cleared
    setTimeout(() => {
      handleInputChange('valorTotal', '');
    }, 0);
  };
  
  // Remove an item from the table
  const handleRemoveItem = (id: string) => {
    setServiceItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className={cn("", className)}>
      {/* Valor e Atividade */}
      <StepSectionCard
        title="Valor e Atividade"
        onClear={() => handleClear('valor-atividade')}
        onConfirm={() => handleConfirm(1)}
        onConfirmDisabled={!cardValidation[1]}
        isExpanded={expandedCard === 1}
        onToggle={() => handleCardToggle(1)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Valor Serviço */}
          <ValidatedInput
            id="valor-servico"
            label="Valor Serviço"
            value={formData.valorServico}
            onChange={(e) => handleInputChange('valorServico', e.target.value)}
            placeholder="R$ 4.000,00"
            required
          />

          {/* Atividade */}
          <ValidatedInput
            id="codigo-tributacao"
            label="Código de Tributação Municipal"
            value={formData.codigoTributacao}
            onChange={(e) => handleInputChange('codigoTributacao', e.target.value)}
            placeholder="Selecione o código de tributação"
            required
          />
          <ValidatedInput
            id="codigo-cnae"
            label="Código CNAE"
            value={formData.codigoCnae}
            onChange={(e) => handleInputChange('codigoCnae', e.target.value)}
            placeholder="Digite o código CNAE"
            required
          />

          <ValidatedInput
            id="lista-servico"
            label="Lista de Serviço"
            value={formData.listaServico}
            onChange={(e) => handleInputChange('listaServico', e.target.value)}
            placeholder="Digite a lista de serviço"
            required
          />
        </div>
      </StepSectionCard>

      {/* Tributação e Local */}
      <StepSectionCard
        title="Tributação e Local"
        onClear={() => handleClear('tributacao-local')}
        onConfirm={() => handleConfirm(2)}
        onConfirmDisabled={!cardValidation[2]}
        isExpanded={expandedCard === 2}
        onToggle={() => handleCardToggle(2)}
      >
        <div className="space-y-6">
          {/* Tributação */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <ValidatedInput
                  id="natureza-operacao"
                  label="Natureza da Operação"
                  value={formData.naturezaOperacao}
                  onChange={(e) => handleInputChange('naturezaOperacao', e.target.value)}
                  placeholder="Selecione a natureza da operação"
                  required
                />
              </div>
              <div className="space-y-3">
                <ValidatedInput
                  id="regime-especial"
                  label="Regime Especial Tributação"
                  value={formData.regimeEspecial}
                  onChange={(e) => handleInputChange('regimeEspecial', e.target.value)}
                  placeholder="Selecione o regime especial"
                  required
                />
              </div>
            </div>
          </div>

          {/* Local */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <ValidatedInput
                  id="local-prestacao"
                  label="Local da Prestação"
                  value={formData.localPrestacao}
                  onChange={(e) => handleInputChange('localPrestacao', e.target.value)}
                  placeholder="Selecione o local da prestação"
                  required
                />
              </div>
              <div className="space-y-3">
                <ValidatedInput
                  id="aliquota"
                  label="Alíquota (%)"
                  value={formData.aliquota}
                  onChange={(e) => handleInputChange('aliquota', e.target.value)}
                  placeholder="2"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </StepSectionCard>

      {/* Discriminação e Itens */}
      <StepSectionCard
        title="Discriminação e Itens"
        onClear={() => handleClear('discriminacao-itens')}
        onConfirm={() => handleConfirm(3)}
        onConfirmDisabled={!cardValidation[3]}
        isExpanded={expandedCard === 3}
        onToggle={() => handleCardToggle(3)}
      >
        <div className="space-y-6">
          {/* Discriminação */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <Checkbox 
                id="detalhamento" 
                checked={detalhamento}
                onCheckedChange={(checked) => setDetalhamento(checked as boolean)}
              />
              <label htmlFor="detalhamento" className="font-medium">Detalhamento dos Itens</label>
            </div>
            <Textarea
              id="discriminacao"
              value={formData.discriminacao}
              onChange={(e) => handleInputChange('discriminacao', e.target.value)}
              placeholder="Digite a discriminação dos serviços"
              className="min-h-[120px]"
            />
          </div>

          {/* Descrição */}
          <div className="space-y-3">
            <label htmlFor="descricao" className="font-medium">Descrição</label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => handleInputChange('descricao', e.target.value)}
              placeholder="Digite a descrição"
              className="min-h-[120px]"
            />
          </div>

          {/* Tributável */}
          <div className="space-y-3">
            <RadioOptions
              label="Tributável"
              value={formData.tributavel}
              values={[
                {buttonValue: "sim", text: "SIM"},
                {buttonValue: "nao", text: "NÃO"},
              ]}
              onChange={(value) => handleInputChange('tributavel', value)}
            />
          </div>

          {/* Tabela de Itens */}
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-3">
                <ValidatedInput
                  id="quantidade"
                  label="Quantidade"
                  value={formData.quantidade}
                  onChange={(e) => handleInputChange('quantidade', e.target.value)}
                  placeholder="1"
                />
              </div>
              <div className="space-y-3">
                <ValidatedInput
                  id="valor-unitario"
                  label="Valor Unitário"
                  value={formData.valorUnitario}
                  onChange={(e) => handleInputChange('valorUnitario', e.target.value)}
                  placeholder="R$ 4.000,00"
                />
              </div>
              <div className="space-y-3">
                <ValidatedInput
                  id="valor-total"
                  label="Valor Total"
                  value={formData.valorTotal}
                  onChange={(e) => handleInputChange('valorTotal', e.target.value)}
                  placeholder="R$ 4.000,00"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleClearItemForm}
              >
                <X className="h-4 w-4 mr-1" />
                Limpar
              </Button>
              <Button 
                size="sm"
                onClick={handleAddItem}
                disabled={!formData.descricao || !formData.quantidade || !formData.valorUnitario}
              >
                <Plus className="h-4 w-4 mr-1" />
                Inserir
              </Button>
            </div>
          </div>

          {/* Tabela de Serviços */}
          <div className="space-y-6">
            {detalhamento && errors.items && (
              <div className="text-red-500 text-sm">{errors.items}</div>
            )}
            <div className="border rounded-xl overflow-hidden">
              <div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                    <tr className="border-b bg-gradient-to-r from-primary-50 to-primary-100">
                      <th className="text-left p-4 text-sm font-semibold">Descrição</th>
                      <th className="text-left p-4 text-sm font-semibold">Tributável</th>
                      <th className="text-left p-4 text-sm font-semibold">Quantidade</th>
                      <th className="text-left p-4 text-sm font-semibold">Valor Unitário</th>
                      <th className="text-left p-4 text-sm font-semibold">Valor Total</th>
                      <th className="text-left p-4 text-sm font-semibold">Ação</th>
                    </tr>
                    </thead>
                    <tbody>
                    {serviceItems.length > 0 ? (
                      serviceItems.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="p-4 text-sm">{item.descricao}</td>
                          <td className="p-4 text-sm">{item.tributavel === 'sim' ? 'SIM' : 'NÃO'}</td>
                          <td className="p-4 text-sm">{item.quantidade}</td>
                          <td className="p-4 text-sm">R$ {item.valorUnitario}</td>
                          <td className="p-4 text-sm">R$ {item.valorTotal}</td>
                          <td className="p-4 text-sm">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-primary-600 h-8 w-8 p-0 rounded-xl"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <X className="h-4 w-4 text-red-500" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="border-b">
                        <td colSpan={6} className="p-4 text-sm text-center text-gray-500">
                          Nenhum item adicionado
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td className="p-4 text-sm italic text-gray-500">
                        {serviceItems.length} {serviceItems.length === 1 ? 'item' : 'itens'}
                      </td>
                      <td className="p-4"></td>
                      <td className="p-4"></td>
                      <td className="p-4"></td>
                      <td className="p-4"></td>
                      <td className="p-4"></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Valor Total */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <ValidatedInput
                id="valor-servico-total"
                label="Valor Serviço"
                value={`R$ ${formData.valorServico || '0,00'}`}
                readOnly
              />
            </div>
            <div className="space-y-3">
              <ValidatedInput
                id="sub-total"
                label="Sub Total Itens"
                value={`R$ ${calculateTotalValue()}`}
                readOnly
                inputProps={{
                  className: isSubtotalExceedingValorServico() ? "border-red-500 bg-red-50" : ""
                }}
              />
              {isSubtotalExceedingValorServico() && (
                <p className="text-red-500 text-sm mt-1">O subtotal excede o valor do serviço</p>
              )}
            </div>
          </div>
          
          {/* Warning message when valor serviço doesn't match sum of items */}
          {detalhamento && errors.valorMatch && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md mt-4">
              <div className="flex">
                <div className="py-1">
                  <svg className="h-6 w-6 text-yellow-500 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">Atenção</p>
                  <p className="text-sm">{errors.valorMatch}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </StepSectionCard>
    </div>
  );
}