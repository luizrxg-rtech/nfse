'use client';

import {useEffect, useState, useCallback} from 'react';
import {Button} from '@/components/ui/button';
import {ArrowLeft, ArrowRight} from 'lucide-react';
import Footer from '@/components/Footer';
import Sidebar from "@/components/Sidebar";
import TomadorStep from "@/components/steps/nota-fiscal/emitir/TomadorStep";
import ServicosStep from "@/components/steps/nota-fiscal/emitir/ServicosStep";
import ValoresStep from "@/components/steps/nota-fiscal/emitir/ValoresStep";
import ConstruOCivilStep from "@/components/steps/nota-fiscal/emitir/ConstruçãoCivilStep";
import GerarStep from "@/components/steps/nota-fiscal/emitir/GerarStep";
import Stepper from "@/components/Stepper";
import {Step} from "@/types/Stepper";

const steps: Step[] = [
  {id: 1, component: TomadorStep,       title: 'Tomador',          active: true},
  // {id: 2, component: IntermediarioStep, title: 'Intermediário',    active: false},
  {id: 2, component: ServicosStep,      title: 'Serviços',         active: false},
  {id: 3, component: ValoresStep,       title: 'Valores',          active: false},
  // {id: 5, component: EventosStep,       title: 'Eventos',          active: false},
  {id: 4, component: ConstruOCivilStep, title: 'Construção Civil', active: false},
  {id: 5, component: GerarStep,         title: 'Gerar',            active: false}
];

export default function NotaFiscal() {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepValidation, setStepValidation] = useState<Record<number, boolean>>({});
  const [showValidationError, setShowValidationError] = useState(false);
  const [formData, setFormData] = useState({
    tipoPessoa: 'cnpj',
    estabelecimentoTupaciguara: 'nao',
    cpf: '',
    cnpj: '',
    nomeRazaoSocial: '',
    resideExterior: 'nao',
    pais: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    municipio: '',
    estado: '',
    telefone: '',
    email: '',
    valorServico: '',
    codigoTributacao: '',
    codigoCnae: '',
    listaServico: '',
    listaTributacao: '',
    naturezaOperacao: '',
    regimeEspecial: '',
    localIncidencia: '',
    localPrestacao: '',
    aliquota: '',
    discriminacao: '',
    descricao: '',
    tributavel: 'sim',
    quantidade: '',
    valorUnitario: '',
    valorTotal: '',
    // Valores
    issRetido: 'nao',
    iss: '',
    pis: '',
    cofins: '',
    ir: '',
    csll: '',
    inss: '',
    // Construção Civil
    artOuN: '',
    codigoObra: '',
    deducoes: '',
    // Outras informações
    outrasInformacoes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleValidationChange = useCallback((stepId: number, isValid: boolean) => {
    setStepValidation(prev => ({
      ...prev,
      [stepId]: isValid
    }));
  }, []);

  const handleNext = () => {
    // Check if current step is valid
    const isCurrentStepValid = stepValidation[currentStep];
    
    if (isCurrentStepValid) {
      // If valid, proceed to next step
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
        setShowValidationError(false);
      }
    } else {
      // If not valid, show validation error
      setShowValidationError(true);
      
      // Auto-hide the error message after 3 seconds
      setTimeout(() => {
        setShowValidationError(false);
      }, 3000);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setShowValidationError(false);
    }
  };

  useEffect(() => {
    const pageElement = document.getElementById("page");
    if (pageElement) {
      pageElement.scrollTo(0, 0);
    }
  }, [currentStep]);

  return (
    <div id="page" className="max-h-screen overflow-y-auto">
      <div className="flex ">
        <Sidebar />

        {/* Main Content */}
        <main className="flex flex-col w-full p-8 gap-4">

          {/* Steps Navigation */}
          <Stepper
            steps={steps}
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
            stepValidation={stepValidation}
          />

          {/* Step Content */}
          <div
            className="flex flex-col w-full min-h-fit space-y-8"
          >
            {(() => {
              const StepComponent = steps[currentStep - 1].component;
              return (
                <StepComponent
                  formData={formData}
                  handleInputChange={handleInputChange}
                  className="flex flex-col space-y-8 w-full max-h-fit"
                  onValidationChange={(isValid) => handleValidationChange(currentStep, isValid)}
                />
              );
            })()}
            
            {/* Validation Error Message */}
            {showValidationError && (
              <div className="bg-red-100 text-red-700 px-4 py-3 rounded-2xl relative" role="alert">
                <strong className="font-bold">Atenção! </strong>
                <span className="block sm:inline">Por favor, preencha todos os campos obrigatórios antes de avançar.</span>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex">
              {currentStep > 1 &&
                <Button
                  variant="translucid"
                  onClick={handleBack}
                  className="flex items-center space-x-3 mr-auto"
                >
                  <ArrowLeft className="w-5 h-5"/>
                  <span>Voltar</span>
                </Button>
              }
              {
                currentStep < steps.length &&
                <Button
                  onClick={handleNext}
                  className="flex items-center space-x-3 ml-auto"
                >
                  <span>Avançar</span>
                  <ArrowRight className="w-5 h-5"/>
                </Button>
              }
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}