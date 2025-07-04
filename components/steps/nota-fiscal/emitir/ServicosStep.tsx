import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";

import {cn} from "@/lib/utils";
import {StepComponentProps} from "@/types/Stepper";

export default function ServicosStep({
  formData, 
  handleInputChange, 
  className
}: StepComponentProps) {
  return (
    <div className={cn("", className)}>
      <h2 className="text-3xl font-bold text-gray-900 gradient-text">Valor</h2>

      {/* Valor Serviço */}
      <div className="space-y-3">
        <Label htmlFor="valor-servico" className="text-lg font-semibold">Valor Serviço*</Label>
        <Input
          id="valor-servico"
          value={formData.valorServico}
          onChange={(e) => handleInputChange('valorServico', e.target.value)}
          placeholder="R$ 4.000,00"
          
        />
      </div>

      {/* Atividade */}
      <div className="space-y-6">
        <Label className="text-lg font-semibold">Atividade</Label>

        <div className="space-y-3">
          <Label htmlFor="codigo-tributacao" className="font-medium">Código de Tributação Municipal*</Label>
          <Select value={formData.codigoTributacao}
                  onValueChange={(value) => handleInputChange('codigoTributacao', value)}>
            <SelectTrigger >
              <SelectValue placeholder="951190000 - REPARAÇÃO E MANUTENÇÃO DE COMPUTADORES E DE EQUIPA"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="951190000">951190000 - REPARAÇÃO E MANUTENÇÃO DE COMPUTADORES E DE EQUIPA</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="codigo-cnae" className="font-medium">Código CNAE</Label>
          <Input
            id="codigo-cnae"
            value="951190000"
            readOnly
            className="bg-gray-50 h-12"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="lista-servico" className="font-medium">Lista de Serviço*</Label>
          <Input
            id="lista-servico"
            value="14.01 - LUBRIFICAÇÃO, LIMPEZA, LUSTRAÇÃO, REVISÃO, CARGA E RECARGA, CONSERTO, RE."
            readOnly
            className="bg-gray-50 h-12"
          />
        </div>
      </div>

      {/* Tributação */}
      <div className="space-y-6">
        <Label className="text-lg font-semibold">Tributação</Label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="natureza-operacao" className="font-medium">Natureza da Operação*</Label>
            <Select value={formData.naturezaOperacao}
                    onValueChange={(value) => handleInputChange('naturezaOperacao', value)}>
              <SelectTrigger >
                <SelectValue placeholder="Incidente"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="incidente">Incidente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label htmlFor="regime-especial" className="font-medium">Regime Especial Tributação</Label>
            <Select value={formData.regimeEspecial}
                    onValueChange={(value) => handleInputChange('regimeEspecial', value)}>
              <SelectTrigger >
                <SelectValue placeholder="Microempresa ou Empresa de Pequeno Port..."/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="microempresa">Microempresa ou Empresa de Pequeno Port...</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Local */}
      <div className="space-y-6">
        <Label className="text-lg font-semibold">Local da Incidência: Estabelecimento do Prestador</Label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="local-prestacao" className="font-medium">Local da Prestação*</Label>
            <Select value={formData.localPrestacao}
                    onValueChange={(value) => handleInputChange('localPrestacao', value)}>
              <SelectTrigger >
                <SelectValue placeholder="TUPACIGUARA - MG"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tupaciguara">TUPACIGUARA - MG</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label htmlFor="aliquota" className="font-medium">Alíquota(%)</Label>
            <Input
              id="aliquota"
              value={formData.aliquota}
              onChange={(e) => handleInputChange('aliquota', e.target.value)}
              placeholder="2"
              
            />
          </div>
        </div>
      </div>

      {/* Discriminação */}
      <div className="space-y-6">
        <Label htmlFor="discriminacao" className="text-lg font-semibold">Discriminação*</Label>
        <div className="flex items-center space-x-3 mb-4">
          <Checkbox id="detalhamento"/>
          <Label htmlFor="detalhamento" className="font-medium">Detalhamento dos Itens</Label>
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
        <Label htmlFor="descricao" className="text-lg font-semibold">Descrição</Label>
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
        <Label htmlFor="tributavel" className="text-lg font-semibold">Tributável</Label>
        <Select value={formData.tributavel} onValueChange={(value) => handleInputChange('tributavel', value)}>
          <SelectTrigger >
            <SelectValue placeholder="SIM"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sim">SIM</SelectItem>
            <SelectItem value="nao">NÃO</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabela de Itens */}
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-3">
            <Label htmlFor="quantidade" className="font-medium">Quantidade</Label>
            <Input
              id="quantidade"
              value={formData.quantidade}
              onChange={(e) => handleInputChange('quantidade', e.target.value)}
              placeholder="1"
              
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="valor-unitario" className="font-medium">Valor Unitário</Label>
            <Input
              id="valor-unitario"
              value={formData.valorUnitario}
              onChange={(e) => handleInputChange('valorUnitario', e.target.value)}
              placeholder="R$ 4.000,00"
              
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="valor-total" className="font-medium">Valor Total</Label>
            <Input
              id="valor-total"
              value={formData.valorTotal}
              onChange={(e) => handleInputChange('valorTotal', e.target.value)}
              placeholder="R$ 4.000,00"
              
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <Button variant="ghost" size="sm">
            Limpar
          </Button>
          <Button size="sm" className="rounded-full bg-gradient-to-r from-primary-600 to-primary-700">
            Inserir
          </Button>
        </div>
      </div>

      {/* Tabela de Serviços */}
      <div className="space-y-6">
        <Card className="bg-white border-0 rounded-3xl overflow-hidden">
          <CardContent className="">
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
                <tr className="border-b">
                  <td className="p-4 text-sm">Garçonete</td>
                  <td className="p-4 text-sm">SIM</td>
                  <td className="p-4 text-sm">2</td>
                  <td className="p-4 text-sm">R$ 2.000,00</td>
                  <td className="p-4 text-sm">R$ 4.000,00</td>
                  <td className="p-4 text-sm">
                    <Button size="sm" variant="ghost" className="text-primary-600 h-8 w-8 p-0 rounded-xl">
                      •
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-sm italic text-gray-500">1 item</td>
                  <td className="p-4"></td>
                  <td className="p-4"></td>
                  <td className="p-4"></td>
                  <td className="p-4"></td>
                  <td className="p-4"></td>
                </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Valor Total */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="valor-servico-total" className="font-medium">Valor Serviço</Label>
          <Input
            id="valor-servico-total"
            value="R$ 4.000,00"
            readOnly
            className="bg-gray-50 h-12"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="sub-total" className="font-medium">Sub Total Itens</Label>
          <Input
            id="sub-total"
            value="R$ 4.000,00"
            readOnly
            className="bg-gray-50 h-12"
          />
        </div>
      </div>
    </div>
  );
}