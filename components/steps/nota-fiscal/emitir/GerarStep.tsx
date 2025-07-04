import {Button} from "@/components/ui/button";
import {FileText} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";

import {cn} from "@/lib/utils";
import {StepComponentProps} from "@/types/Stepper";

export default function GerarStep({
  formData, 
  handleInputChange, 
  className
}: StepComponentProps) {
  return (
    <div className={cn("text-center", className)}>
      <h2 className="text-3xl font-bold text-gray-900 gradient-text">Gerar Nota Fiscal</h2>

      <div className="space-y-8">
        <p className="text-gray-600 text-lg">
          Revise todas as informações antes de gerar a nota fiscal.
        </p>

        <div className="flex justify-center space-x-6">

          <Button
            className="flex items-center space-x-3 px-8 py-3 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
          >
            <FileText className="w-5 h-5"/>
            <span>Gerar</span>
          </Button>
        </div>

        {/* Preview da Nota Fiscal */}
        <Card className="bg-white border-0 rounded-3xl mt-12">
          <CardHeader>
            <CardTitle className="text-center text-xl font-bold text-primary-700">
              NOTA FISCAL DE SERVIÇOS ELETRÔNICA - NFS-e
            </CardTitle>
            <p className="text-center text-lg font-semibold">RR COSTA CONSULTORIA EM SISTEMAS</p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <Label className="font-semibold">Razão Social</Label>
                  <p>RR COSTA CONSULTORIA EM SISTEMAS</p>
                </div>
                <div>
                  <Label className="font-semibold">CPF/CNPJ</Label>
                  <p>36.249.383/0001-76</p>
                </div>
                <div>
                  <Label className="font-semibold">Inscrição Municipal</Label>
                  <p>30443000</p>
                </div>
                <div>
                  <Label className="font-semibold">Logradouro</Label>
                  <p>RUA CRUZEIRO RIBEIRO</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="font-semibold">Bairro</Label>
                  <p>BAIRRO SANTA MÔNICA SETOR C - LOTE(A)</p>
                </div>
                <div>
                  <Label className="font-semibold">Número</Label>
                  <p>590</p>
                </div>
                <div>
                  <Label className="font-semibold">CEP</Label>
                  <p>38408-242</p>
                </div>
                <div>
                  <Label className="font-semibold">Cidade</Label>
                  <p>UBERLÂNDIA</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-primary-50 rounded-full">
              <h3 className="font-bold text-lg mb-4">DISCRIMINAÇÃO DOS SERVIÇOS</h3>
              <p className="text-sm">
                14.01 - LUBRIFICAÇÃO, LIMPEZA, LUSTRAÇÃO, REVISÃO, CARGA E RECARGA, CONSERTO, RESTAURAÇÃO,
                BLINDAGEM, MANUTENÇÃO E CONSERVAÇÃO DE MÁQUINAS, VEÍCULOS, APARELHOS, EQUIPAMENTOS,
                MOTORES, ELEVADORES OU DE QUALQUER OBJETO (EXCETO PEÇAS E PARTES EMPREGADAS, QUE
                FICAM SUJEITAS AO ICMS).
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Label className="font-semibold">BASE DE CÁLCULO</Label>
                <p className="text-lg">R$ 4.000,00</p>
              </div>
              <div className="text-center">
                <Label className="font-semibold">VALOR SERVIÇO</Label>
                <p className="text-lg">R$ 4.000,00</p>
              </div>
              <div className="text-center">
                <Label className="font-semibold">ALÍQUOTA</Label>
                <p className="text-lg">5%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}