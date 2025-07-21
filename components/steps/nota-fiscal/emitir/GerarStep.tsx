'use client';

import {Button} from "@/components/ui/button";
import {Check, Printer} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {StepComponentProps} from "@/types/Stepper";
import {useEffect, useRef, useState} from "react";
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from "@/components/QRCode";

export default function GerarStep({
  formData, 
  handleInputChange, 
  className
}: StepComponentProps) {
  const [showPreview, setShowPreview] = useState<boolean>(true);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [hideDisclaimer, setHideDisclaimer] = useState<boolean>(false);
  const printRef = useRef<HTMLDivElement>(null);
  
  // Format currency values
  const formatCurrency = (value: string) => {
    if (!value) return "R$ 0,00";
    return `R$ ${value}`;
  };
  
  // Handle PDF generation and download
  const handleGeneratePDF = () => {
    if (!printRef.current) return;
    
    // Set states for PDF generation
    setIsGeneratingPDF(true);
    setHideDisclaimer(true);
    
    // Add a class to the print container for PDF-specific styling
    if (printRef.current) {
      printRef.current.classList.add('generating-pdf');
    }
    
    // Use setTimeout to ensure the disclaimer is hidden before generating the PDF
    setTimeout(() => {
      const element = printRef.current;


      if (element) {
        html2canvas(element, {
          scale: 1.4,
          useCORS: true,
          logging: false,
          windowWidth: 800
        }).then(canvas => {
          const imgData = canvas.toDataURL('image/jpeg', 0.95);
          const pdf = new jsPDF({
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
            compress: true,
            precision: 16
          });

          const imgWidth = 210 - 2 * 3; // A4 width (210mm) minus margins
          const imgHeight = canvas.height * imgWidth / canvas.width;

          pdf.addImage(imgData, 'JPEG', 3, 3, imgWidth, imgHeight);
          pdf.save(`nota-fiscal-${new Date().toISOString().split('T')[0]}.pdf`);

          setHideDisclaimer(false);
          setIsGeneratingPDF(false);
          setShowSuccessMessage(true);

          if (printRef.current) {
            printRef.current.classList.remove('generating-pdf');
          }

          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);
        });
      }
    }, 100);
  };
  
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'pdf-print-styles';
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        .print-container, .print-container * {
          visibility: visible;
        }
        .print-container {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          margin: 0;
          padding: 0;
        }
        /* Ensure colors and backgrounds print correctly */
        .print-container * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        /* Remove any page margins from the browser print settings */
        @page {
          margin: 0;
          size: auto;
        }
        /* Specific styles for PDF content to ensure it fits on one page */
        .pdf-content {
          max-height: 100%;
          font-size: 9pt !important;
          line-height: 1.2 !important;
        }
        .pdf-content h1 {
          font-size: 14pt !important;
        }
        .pdf-content h2 {
          font-size: 11pt !important;
          margin-bottom: 4px !important;
        }
        .pdf-content h3 {
          font-size: 10pt !important;
          margin-bottom: 2px !important;
        }
        .pdf-content p {
          margin-bottom: 2px !important;
        }
        .pdf-content .mb-2 {
          margin-bottom: 4px !important;
        }
        .pdf-content .p-3 {
          padding: 6px !important;
        }
        .pdf-content .gap-3 {
          gap: 6px !important;
        }
        .pdf-content .rounded-md {
          border-radius: 2px !important;
        }
        
        /* Additional styles for when actively generating PDF */
        .generating-pdf .pdf-content {
          font-size: 8pt !important;
          line-height: 1.1 !important;
          transform: scale(0.98);
          transform-origin: top center;
        }
        .generating-pdf .pdf-content h1 {
          font-size: 12pt !important;
        }
        .generating-pdf .pdf-content h2 {
          font-size: 10pt !important;
          margin-bottom: 2px !important;
        }
        .generating-pdf .pdf-content .p-3 {
          padding: 4px !important;
        }
        .generating-pdf .pdf-content .gap-3 {
          gap: 4px !important;
        }
        .generating-pdf .pdf-content .mb-2 {
          margin-bottom: 2px !important;
        }
        .generating-pdf .pdf-content .border {
          border-width: 0.5px !important;
        }
        
        /* Handle conditional sections to ensure they fit */
        @media print {
          .generating-pdf .pdf-content {
            max-height: 100vh;
            overflow: hidden;
          }
        }
      }
    `;
    
    // Add the style element to the document head
    document.head.appendChild(style);
    
    // Clean up the style element when the component unmounts
    return () => {
      const existingStyle = document.getElementById('pdf-print-styles');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  return (
    <div className={cn("", className)}>
      <h2 className="text-3xl font-bold text-gray-900 text-center">Gerar Nota Fiscal</h2>

      <div
        style={{margin: 0}}
        className="flex flex-col items-center mt-0"
      >
        <p className="text-gray-600 text-lg text-center mt-2">
          Revise todas as informações antes de gerar a nota fiscal.
        </p>

        {/* Preview da Nota Fiscal */}
        {showPreview && (
          <div ref={printRef} className="print-container overflow-hidden">
            <Card className="border border-gray-200 mt-6 shadow-none max-w-4xl mx-auto overflow-hidden pdf-content relative">
              {!hideDisclaimer && (
                <div
                  className="
                    absolute top-0 left-0 right-0 z-10
                    opacity-10
                    w-full h-full
                    flex flex-col items-center justify-center
                  "
                >
                  <div className="flex flex-col items-center justify-center -rotate-[60deg]">
                    <span className="text-7xl font-semibold">VISUALIZAÇÃO</span>
                    <span className="text-5xl font-semibold">SEM VALOR FISCAL</span>
                  </div>
                </div>
              )}

              <div className="bg-black-50 border-b border-black-100 p-3 z-50">
                <div className="flex items-center justify-between gap-6">
                  <div className="flex-1">
                    <Image 
                      src="/images/logo.png" 
                      alt="Logo" 
                      width={80} 
                      height={40} 
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <h1 className="text-xl font-bold text-black-800 uppercase tracking-wide">
                      Nota Fiscal de Serviços Eletrônica
                    </h1>
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-xs text-gray-500">Data de Emissão</p>
                    <p className="font-medium text-sm">{new Date().toLocaleDateString('pt-BR')}</p>
                    <p className="text-xs text-gray-500 mt-1">Número</p>
                    <p className="font-medium text-sm">00001</p>
                  </div>
                  <div className="">
                    <QRCode
                      value={`NFS-e:00001:${formData.valorServico}:${new Date().toISOString()}`}
                      size={80}
                      className="ml-auto mb-1"
                    />
                    <p className="text-xs font-medium">Código de Validação</p>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-0">
                {/* Prestador de Serviços */}
                <div className="p-3 border-b border-gray-200">
                  <h2 className="text-sm font-bold text-black-800 mb-2 uppercase tracking-wide">Prestador de Serviços</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <div className="mb-2">
                        <p className="text-xs text-gray-500">Razão Social</p>
                        <p className="font-medium text-sm">{formData.nomeRazaoSocial || "-"}</p>
                      </div>
                      <div className="mb-2">
                        <p className="text-xs text-gray-500">{formData.tipoPessoa === 'cpf' ? 'CPF' : 'CNPJ'}</p>
                        <p className="font-medium text-sm">{formData.tipoPessoa === 'cpf' ? formData.cpf : formData.cnpj || "-"}</p>
                      </div>
                      <div className="mb-2">
                        <p className="text-xs text-gray-500">Inscrição Municipal</p>
                        <p className="font-medium text-sm">30443000</p>
                      </div>
                    </div>
                    <div>
                      <div className="mb-2">
                        <p className="text-xs text-gray-500">Endereço</p>
                        <p className="font-medium text-sm">{`${formData.logradouro || "-"}, ${formData.numero || "-"}`}</p>
                      </div>
                      <div className="mb-2">
                        <p className="text-xs text-gray-500">Bairro / CEP</p>
                        <p className="font-medium text-sm">{`${formData.bairro || "-"} / ${formData.cep || "-"}`}</p>
                      </div>
                      <div className="mb-2">
                        <p className="text-xs text-gray-500">Cidade / UF</p>
                        <p className="font-medium text-sm">{`${formData.municipio || "-"} / ${formData.estado || "-"}`}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tomador de Serviços */}
                <div className="p-3 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-sm font-bold text-black-800 mb-2 uppercase tracking-wide">Tomador de Serviços</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <div className="mb-2">
                        <p className="text-xs text-gray-500">Nome/Razão Social</p>
                        <p className="font-medium text-sm">{formData.nomeRazaoSocial || "-"}</p>
                      </div>
                      <div className="mb-2">
                        <p className="text-xs text-gray-500">{formData.tipoPessoa === 'cpf' ? 'CPF' : 'CNPJ'}</p>
                        <p className="font-medium text-sm">{formData.tipoPessoa === 'cpf' ? formData.cpf : formData.cnpj || "-"}</p>
                      </div>
                    </div>
                    <div>
                      <div className="mb-2">
                        <p className="text-xs text-gray-500">Endereço</p>
                        <p className="font-medium text-sm">{`${formData.logradouro || "-"}, ${formData.numero || "-"} - ${formData.bairro || "-"}`}</p>
                      </div>
                      <div className="mb-2">
                        <p className="text-xs text-gray-500">Cidade/UF</p>
                        <p className="font-medium text-sm">{`${formData.municipio || "-"}/${formData.estado || "-"}`}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Discriminação dos Serviços */}
                <div className="p-3 border-b border-gray-200">
                  <h2 className="text-sm font-bold text-black-800 mb-2 uppercase tracking-wide">Discriminação dos Serviços</h2>
                  <div className="bg-white border border-gray-200 rounded-md p-2">
                    <p className="text-xs leading-tight">
                      {formData.discriminacao || formData.listaServico || "-"}
                    </p>
                  </div>
                </div>

                {/* Valores */}
                <div className="p-3 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-sm font-bold text-black-800 mb-2 uppercase tracking-wide">Valores</h2>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white border border-gray-200 rounded-md p-2 text-center">
                      <p className="text-xs text-gray-500">BASE DE CÁLCULO</p>
                      <p className="text-sm font-bold text-black-800">{formatCurrency(formData.valorServico)}</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-md p-2 text-center">
                      <p className="text-xs text-gray-500">VALOR SERVIÇO</p>
                      <p className="text-sm font-bold text-black-800">{formatCurrency(formData.valorServico)}</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-md p-2 text-center">
                      <p className="text-xs text-gray-500">ALÍQUOTA</p>
                      <p className="text-sm font-bold text-black-800">{formData.aliquota ? `${formData.aliquota}%` : "5%"}</p>
                    </div>
                  </div>
                </div>
                
                {/* ISS e Retenções Federais */}
                <div className="p-3 border-b border-gray-200">
                  <h2 className="text-sm font-bold text-black-800 mb-2 uppercase tracking-wide">ISS e Retenções Federais</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white border border-gray-200 rounded-md p-2">
                      <p className="text-xs text-gray-500">ISS</p>
                      <p className="font-medium text-sm">{formatCurrency(formData.iss)}</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-md p-2">
                      <p className="text-xs text-gray-500">ISS Retido</p>
                      <p className="font-medium text-sm">{formData.issRetido === 'sim' ? 'SIM' : 'NÃO'}</p>
                    </div>
                  </div>
                  
                  {(formData.pis || formData.cofins || formData.ir || formData.csll || formData.inss) && (
                    <div className="mt-2">
                      <h3 className="text-xs font-semibold mb-1">Retenções Federais</h3>
                      <div className="grid grid-cols-5 gap-2">
                        {formData.pis && (
                          <div className="bg-white border border-gray-200 rounded-md p-1">
                            <p className="text-xs text-gray-500">PIS</p>
                            <p className="font-medium text-xs">{formatCurrency(formData.pis)}</p>
                          </div>
                        )}
                        {formData.cofins && (
                          <div className="bg-white border border-gray-200 rounded-md p-1">
                            <p className="text-xs text-gray-500">COFINS</p>
                            <p className="font-medium text-xs">{formatCurrency(formData.cofins)}</p>
                          </div>
                        )}
                        {formData.ir && (
                          <div className="bg-white border border-gray-200 rounded-md p-1">
                            <p className="text-xs text-gray-500">IR</p>
                            <p className="font-medium text-xs">{formatCurrency(formData.ir)}</p>
                          </div>
                        )}
                        {formData.csll && (
                          <div className="bg-white border border-gray-200 rounded-md p-1">
                            <p className="text-xs text-gray-500">CSLL</p>
                            <p className="font-medium text-xs">{formatCurrency(formData.csll)}</p>
                          </div>
                        )}
                        {formData.inss && (
                          <div className="bg-white border border-gray-200 rounded-md p-1">
                            <p className="text-xs text-gray-500">INSS</p>
                            <p className="font-medium text-xs">{formatCurrency(formData.inss)}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Construção Civil */}
                {formData.artOuN && (
                  <div className="p-3 border-b border-gray-200 bg-gray-50">
                    <h2 className="text-sm font-bold text-black-800 mb-2 uppercase tracking-wide">Construção Civil</h2>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-white border border-gray-200 rounded-md p-2">
                        <p className="text-xs text-gray-500">ART OU N° Projeto</p>
                        <p className="font-medium text-sm">{formData.artOuN}</p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-md p-2">
                        <p className="text-xs text-gray-500">Código da obra (CNO)</p>
                        <p className="font-medium text-sm">{formData.codigoObra}</p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-md p-2">
                        <p className="text-xs text-gray-500">Deduções</p>
                        <p className="font-medium text-sm">{formatCurrency(formData.deducoes)}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Outras Informações */}
                {formData.outrasInformacoes && (
                  <div className="p-3 border-b border-gray-200">
                    <h2 className="text-sm font-bold text-black-800 mb-2 uppercase tracking-wide">Outras Informações</h2>
                    <div className="bg-white border border-gray-200 rounded-md p-2">
                      <p className="text-xs">{formData.outrasInformacoes}</p>
                    </div>
                  </div>
                )}
                
                {/* Footer */}
                <div className="p-3 text-xs text-gray-500 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-center flex-1">
                      <p>Documento emitido em {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Success message */}
        {showSuccessMessage && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md flex items-center">
            <Check className="w-5 h-5 mr-2" />
            <span>PDF gerado com sucesso!</span>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 flex">
          <Button
            onClick={handleGeneratePDF}
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? (
                <>
                  <div className="animate-spin rounded-full w-4 h-4 border-2 border-white border-b-transparent mr-2"></div>
                  <span>Gerando...</span>
                </>
              ) : (
                <>
                  <span>Gerar</span>
                  <Check className="w-4 h-4 ml-2" />
                </>
              )
            }
          </Button>
        </div>
      </div>
    </div>
  );
}