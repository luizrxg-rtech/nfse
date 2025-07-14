'use client';

import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {ArrowLeft, ArrowRight} from 'lucide-react';
import Footer from '@/components/Footer';
import Sidebar from "@/components/Sidebar";
import TomadorStep from "@/components/steps/nota-fiscal/emitir/TomadorStep";
import IntermediarioStep from "@/components/steps/nota-fiscal/emitir/IntermediarioStep";
import ServicosStep from "@/components/steps/nota-fiscal/emitir/ServicosStep";
import ValoresStep from "@/components/steps/nota-fiscal/emitir/ValoresStep";
import EventosStep from "@/components/steps/nota-fiscal/emitir/EventosStep";
import ConstruOCivilStep from "@/components/steps/nota-fiscal/emitir/ConstruçãoCivilStep";
import GerarStep from "@/components/steps/nota-fiscal/emitir/GerarStep";
import Stepper from "@/components/Stepper";
import {Step} from "@/types/Stepper";

const steps: Step[] = [
  {id: 1, component: TomadorStep,       title: 'Tomador',          active: true},
  {id: 2, component: IntermediarioStep, title: 'Intermediário',    active: false},
  {id: 3, component: ServicosStep,      title: 'Serviços',         active: false},
  {id: 4, component: ValoresStep,       title: 'Valores',          active: false},
  {id: 5, component: EventosStep,       title: 'Eventos',          active: false},
  {id: 6, component: ConstruOCivilStep, title: 'Construção Civil', active: false},
  {id: 7, component: GerarStep,         title: 'Gerar',            active: false}
];

export default function NotaFiscal() {
  const [currentStep, setCurrentStep] = useState(1);
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
          />

          {/* Step Content */}
          <div
            className="flex flex-col w-full min-h-fit space-y-8"
          >
            {
              steps[currentStep - 1].component(
                {
                  formData: formData,
                  handleInputChange: handleInputChange,
                  className: "flex flex-col space-y-8 w-full max-h-fit"
                }
              )
            }

            {/* Navigation Buttons */}
            <div className="flex">
              {currentStep > 1 &&
                <Button
                  variant="translucid"
                  onClick={handleBack}
                  className="flex items-center space-x-3 px-8 py-3 rounded-full mr-auto"
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

      <Footer/>
    </div>
  );
}