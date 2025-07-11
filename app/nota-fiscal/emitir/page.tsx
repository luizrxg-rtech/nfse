'use client';

import {useEffect, useRef, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {ArrowLeft, ArrowRight} from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Sidebar from "@/components/Sidebar";
import TomadorStep from "@/components/steps/nota-fiscal/emitir/TomadorStep";
import IntermediarioStep from "@/components/steps/nota-fiscal/emitir/IntermediarioStep";
import ServicosStep from "@/components/steps/nota-fiscal/emitir/ServicosStep";
import ValoresStep from "@/components/steps/nota-fiscal/emitir/ValoresStep";
import EventosStep from "@/components/steps/nota-fiscal/emitir/EventosStep";
import ContaCivilStep from "@/components/steps/nota-fiscal/emitir/ContaCivilStep";
import GerarStep from "@/components/steps/nota-fiscal/emitir/GerarStep";
import Stepper from "@/components/Stepper";
import {Step} from "@/types/Stepper";

const steps: Step[] = [
  {id: 1, component: TomadorStep, title: 'Tomador', active: true},
  {id: 2, component: IntermediarioStep, title: 'Intermediário', active: false},
  {id: 3, component: ServicosStep, title: 'Serviços', active: false},
  {id: 4, component: ValoresStep, title: 'Valores', active: false},
  {id: 5, component: EventosStep, title: 'Eventos', active: false},
  {id: 6, component: ContaCivilStep, title: 'Conta Civil', active: false},
  {id: 7, component: GerarStep, title: 'Gerar', active: false}
];

export default function NotaFiscal() {
  const [currentStep, setCurrentStep] = useState(1);
  const [scrollTop, setScrollTop] = useState(0);
  const [formData, setFormData] = useState({
    tipoPessoa: 'cpf',
    estabelecimentoTupaciguara: 'sim',
    cnpj: '',
    nomeRazaoSocial: '',
    informarEndereco: 'sim',
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
    // Conta Civil
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

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Scroll to top when step changes
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
          {/* Header Info */}
          <div className="mb-2">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 font-medium">
                <span>105 COSTA CONSULTORIA EM SISTEMAS - CNPJ: 36.249.383/0001-76 - 34.3613.4600</span>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  Selecionar Outra Empresa
                </Button>
              </div>
            </div>
          </div>

          {/* Steps Navigation */}
          <Stepper
            steps={steps}
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
          />

          {/* Step Content */}
          <Card
            className="flex flex-col w-full min-h-fit overflow-x-hidden scroll-smooth space-y-4"
          >
            {
              steps[currentStep - 1].component(
                {
                  formData: formData,
                  handleInputChange: handleInputChange,
                  className: "flex flex-col space-y-8 w-full max-h-fit p-12"
                }
              )
            }

            {/* Navigation Buttons */}
            <div className="flex justify-between p-12 pt-0">
              <Button
                variant="translucid"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center space-x-3 px-8 py-3 rounded-full"
              >
                <ArrowLeft className="w-5 h-5"/>
                <span>Voltar</span>
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentStep === steps.length}
                className="flex items-center space-x-3"
              >
                <span>Avançar</span>
                <ArrowRight className="w-5 h-5"/>
              </Button>
            </div>
          </Card>
        </main>
      </div>

      <Footer/>
    </div>
  );
}