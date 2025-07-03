'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  FileText, 
  Building, 
  User, 
  ArrowLeft,
  ArrowRight,
  Search,
  Trash2,
  Plus,
  ChevronDown,
  Eye,
  Download
} from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function NotaFiscal() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
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

  const steps = [
    { id: 1, title: 'Tomador', active: true },
    { id: 2, title: 'Intermediário', active: false },
    { id: 3, title: 'Serviços', active: false },
    { id: 4, title: 'Valores', active: false },
    { id: 5, title: 'Eventos', active: false },
    { id: 6, title: 'Conta Civil', active: false },
    { id: 7, title: 'Gerar', active: false }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <TomadorStep formData={formData} handleInputChange={handleInputChange} />;
      case 2:
        return <IntermediarioStep />;
      case 3:
        return <ServicosStep formData={formData} handleInputChange={handleInputChange} />;
      case 4:
        return <ValoresStep formData={formData} handleInputChange={handleInputChange} />;
      case 5:
        return <EventosStep />;
      case 6:
        return <ContaCivilStep formData={formData} handleInputChange={handleInputChange} />;
      case 7:
        return <GerarStep />;
      default:
        return <TomadorStep formData={formData} handleInputChange={handleInputChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <Header />

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="p-8">
          <aside className="w-80 glass-card rounded-3xl">
            <div className="p-6 border-b border-gray-200/50">
              <div className="flex items-center space-x-3 text-gray-700">
                <Building className="w-6 h-6" />
                <div className="text-sm">
                  <div className="font-bold text-lg">RC TECH & SYSTEMS</div>
                </div>
              </div>
            </div>
            
            <nav className="p-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full flex items-center space-x-4 px-4 py-3 rounded-2xl text-gray-700 hover:bg-gray-100/80 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Voltar ao Dashboard</span>
              </button>
            </nav>
          </aside>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8 pl-0">
          <div className="max-w-6xl mx-auto">
            {/* Header Info */}
            <div className="mb-10">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 font-medium">
                  <span>105 COSTA CONSULTORIA EM SISTEMAS - CNPJ: 36.249.383/0001-76 - 34.3613.4600</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="rounded-2xl">
                    Selecionar Outra Empresa
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-2xl">
                    Login Certificado
                  </Button>
                </div>
              </div>
            </div>

            {/* Steps Navigation */}
            <div className="mb-12">
              <div className="flex items-center justify-center space-x-4 overflow-x-auto">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <button
                      onClick={() => handleStepClick(step.id)}
                      className={`flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${
                        step.id === currentStep
                          ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white scale-110'
                          : step.id < currentStep
                          ? 'bg-gradient-to-br from-primary-200 to-primary-300 text-primary-800'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step.id}
                    </button>
                    <span className={`ml-3 text-sm font-semibold ${
                      step.id === currentStep ? 'text-primary-700' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <div className="w-12 h-px bg-gray-300 mx-6" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <Card className="glass-card border-0 rounded-3xl">
              <CardContent className="p-12">
                {renderStepContent()}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center space-x-3 px-8 py-3 rounded-2xl"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentStep === steps.length}
                className="flex items-center space-x-3 px-8 py-3 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
              >
                <span>Avançar</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

function TomadorStep({ formData, handleInputChange }: { formData: any, handleInputChange: (field: string, value: string) => void }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 gradient-text">Tomador de serviços</h2>
        
        {/* Tipo de Pessoa */}
        <div className="space-y-6">
          <Label className="text-lg font-semibold">Tipo de Pessoa</Label>
          <RadioGroup 
            value={formData.tipoPessoa} 
            onValueChange={(value) => handleInputChange('tipoPessoa', value)}
            className="flex space-x-8"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="cpf" id="cpf" className="w-5 h-5" />
              <Label htmlFor="cpf" className="font-medium">CPF</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="cnpj" id="cnpj" className="w-5 h-5" />
              <Label htmlFor="cnpj" className="font-medium">CNPJ</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="exterior" id="exterior" className="w-5 h-5" />
              <Label htmlFor="exterior" className="font-medium">(Exterior) NIF</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Estabelecimento em Tupaciguara */}
        <div className="space-y-6">
          <Label className="text-lg font-semibold">Estabelecimento no Município de Tupaciguara:</Label>
          <RadioGroup 
            value={formData.estabelecimentoTupaciguara} 
            onValueChange={(value) => handleInputChange('estabelecimentoTupaciguara', value)}
            className="flex space-x-8"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="sim" id="sim" className="w-5 h-5" />
              <Label htmlFor="sim" className="font-medium">Sim</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="nao" id="nao" className="w-5 h-5" />
              <Label htmlFor="nao" className="font-medium">Não</Label>
            </div>
          </RadioGroup>
        </div>

        {/* CNPJ */}
        <div className="space-y-3">
          <Label htmlFor="cnpj-input" className="text-lg font-semibold">CNPJ:</Label>
          <Input
            id="cnpj-input"
            value={formData.cnpj}
            onChange={(e) => handleInputChange('cnpj', e.target.value)}
            placeholder="00.000.000/0000-00"
            className="rounded-2xl h-12"
          />
        </div>

        {/* Nome/Razão Social */}
        <div className="space-y-3">
          <Label htmlFor="nome-razao" className="text-lg font-semibold">Nome/Razão social:</Label>
          <Input
            id="nome-razao"
            value={formData.nomeRazaoSocial}
            onChange={(e) => handleInputChange('nomeRazaoSocial', e.target.value)}
            placeholder="Digite o nome ou razão social"
            className="rounded-2xl h-12"
          />
        </div>

        {/* Endereço */}
        <div className="space-y-6">
          <Label className="text-lg font-semibold">Endereço</Label>
          <RadioGroup 
            value={formData.informarEndereco} 
            onValueChange={(value) => handleInputChange('informarEndereco', value)}
            className="flex space-x-8"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="sim" id="endereco-sim" className="w-5 h-5" />
              <Label htmlFor="endereco-sim" className="font-medium">Sim</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="exterior" id="endereco-exterior" className="w-5 h-5" />
              <Label htmlFor="endereco-exterior" className="font-medium">Exterior</Label>
            </div>
          </RadioGroup>
        </div>

        {/* CEP */}
        <div className="space-y-3">
          <Label htmlFor="cep" className="text-lg font-semibold">CEP:*</Label>
          <div className="flex space-x-4">
            <Input
              id="cep"
              value={formData.cep}
              onChange={(e) => handleInputChange('cep', e.target.value)}
              placeholder="00000-000"
              className="flex-1 rounded-2xl h-12"
            />
            <Button variant="ghost" size="sm" className="rounded-2xl px-6">
              Buscar
            </Button>
          </div>
        </div>

        {/* Logradouro e Número */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="logradouro" className="text-lg font-semibold">Logradouro:*</Label>
            <Input
              id="logradouro"
              value={formData.logradouro}
              onChange={(e) => handleInputChange('logradouro', e.target.value)}
              placeholder="Digite o logradouro"
              className="rounded-2xl h-12"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="numero" className="text-lg font-semibold">Número:*</Label>
            <Input
              id="numero"
              value={formData.numero}
              onChange={(e) => handleInputChange('numero', e.target.value)}
              placeholder="Digite o número"
              className="rounded-2xl h-12"
            />
          </div>
        </div>

        {/* Complemento e Bairro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="complemento" className="text-lg font-semibold">Complemento:</Label>
            <Input
              id="complemento"
              value={formData.complemento}
              onChange={(e) => handleInputChange('complemento', e.target.value)}
              placeholder="Digite o complemento"
              className="rounded-2xl h-12"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="bairro" className="text-lg font-semibold">Bairro:*</Label>
            <Input
              id="bairro"
              value={formData.bairro}
              onChange={(e) => handleInputChange('bairro', e.target.value)}
              placeholder="Digite o bairro"
              className="rounded-2xl h-12"
            />
          </div>
        </div>

        {/* Município e Estado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="municipio" className="text-lg font-semibold">Município:*</Label>
            <Input
              id="municipio"
              value={formData.municipio}
              onChange={(e) => handleInputChange('municipio', e.target.value)}
              placeholder="Digite o município"
              className="rounded-2xl h-12"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="estado" className="text-lg font-semibold">Estado:*</Label>
            <Input
              id="estado"
              value={formData.estado}
              onChange={(e) => handleInputChange('estado', e.target.value)}
              placeholder="Digite o estado"
              className="rounded-2xl h-12"
            />
          </div>
        </div>

        {/* Contato */}
        <div className="space-y-6">
          <Label className="text-lg font-semibold">Contato</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="telefone" className="font-medium">Telefone:</Label>
              <Input
                id="telefone"
                value={formData.telefone}
                onChange={(e) => handleInputChange('telefone', e.target.value)}
                placeholder="(00) 00000-0000"
                className="rounded-2xl h-12"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="email" className="font-medium">E-mail:*</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="exemplo@email.com"
                className="rounded-2xl h-12"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntermediarioStep() {
  return (
    <div className="space-y-8">
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 gradient-text">Intermediário</h2>
        <p className="text-gray-600 text-lg">Esta etapa será implementada nas próximas versões.</p>
      </div>
    </div>
  );
}

function ServicosStep({ formData, handleInputChange }: { formData: any, handleInputChange: (field: string, value: string) => void }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 gradient-text">Valor</h2>
        
        {/* Valor Serviço */}
        <div className="space-y-3">
          <Label htmlFor="valor-servico" className="text-lg font-semibold">Valor Serviço:*</Label>
          <Input
            id="valor-servico"
            value={formData.valorServico}
            onChange={(e) => handleInputChange('valorServico', e.target.value)}
            placeholder="R$ 4.000,00"
            className="rounded-2xl h-12"
          />
        </div>

        {/* Atividade */}
        <div className="space-y-6">
          <Label className="text-lg font-semibold">Atividade</Label>
          
          <div className="space-y-3">
            <Label htmlFor="codigo-tributacao" className="font-medium">Código de Tributação Municipal:*</Label>
            <Select value={formData.codigoTributacao} onValueChange={(value) => handleInputChange('codigoTributacao', value)}>
              <SelectTrigger className="rounded-2xl h-12">
                <SelectValue placeholder="951190000 - REPARAÇÃO E MANUTENÇÃO DE COMPUTADORES E DE EQUIPA" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="951190000">951190000 - REPARAÇÃO E MANUTENÇÃO DE COMPUTADORES E DE EQUIPA</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="codigo-cnae" className="font-medium">Código CNAE:</Label>
            <Input
              id="codigo-cnae"
              value="951190000"
              readOnly
              className="bg-gray-50 rounded-2xl h-12"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="lista-servico" className="font-medium">Lista de Serviço:*</Label>
            <Input
              id="lista-servico"
              value="14.01 - LUBRIFICAÇÃO, LIMPEZA, LUSTRAÇÃO, REVISÃO, CARGA E RECARGA, CONSERTO, RE."
              readOnly
              className="bg-gray-50 rounded-2xl h-12"
            />
          </div>
        </div>

        {/* Tributação */}
        <div className="space-y-6">
          <Label className="text-lg font-semibold">Tributação</Label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="natureza-operacao" className="font-medium">Natureza da Operação:*</Label>
              <Select value={formData.naturezaOperacao} onValueChange={(value) => handleInputChange('naturezaOperacao', value)}>
                <SelectTrigger className="rounded-2xl h-12">
                  <SelectValue placeholder="Incidente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incidente">Incidente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="regime-especial" className="font-medium">Regime Especial Tributação:</Label>
              <Select value={formData.regimeEspecial} onValueChange={(value) => handleInputChange('regimeEspecial', value)}>
                <SelectTrigger className="rounded-2xl h-12">
                  <SelectValue placeholder="Microempresa ou Empresa de Pequeno Port..." />
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
              <Label htmlFor="local-prestacao" className="font-medium">Local da Prestação:*</Label>
              <Select value={formData.localPrestacao} onValueChange={(value) => handleInputChange('localPrestacao', value)}>
                <SelectTrigger className="rounded-2xl h-12">
                  <SelectValue placeholder="TUPACIGUARA - MG" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tupaciguara">TUPACIGUARA - MG</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="aliquota" className="font-medium">Alíquota(%):</Label>
              <Input
                id="aliquota"
                value={formData.aliquota}
                onChange={(e) => handleInputChange('aliquota', e.target.value)}
                placeholder="2"
                className="rounded-2xl h-12"
              />
            </div>
          </div>
        </div>

        {/* Discriminação */}
        <div className="space-y-6">
          <Label htmlFor="discriminacao" className="text-lg font-semibold">Discriminação:*</Label>
          <div className="flex items-center space-x-3 mb-4">
            <Checkbox id="detalhamento" />
            <Label htmlFor="detalhamento" className="font-medium">Detalhamento dos Itens</Label>
          </div>
          <Textarea
            id="discriminacao"
            value={formData.discriminacao}
            onChange={(e) => handleInputChange('discriminacao', e.target.value)}
            placeholder="Digite a discriminação dos serviços"
            className="min-h-[120px] rounded-2xl"
          />
        </div>

        {/* Descrição */}
        <div className="space-y-3">
          <Label htmlFor="descricao" className="text-lg font-semibold">Descrição:</Label>
          <Textarea
            id="descricao"
            value={formData.descricao}
            onChange={(e) => handleInputChange('descricao', e.target.value)}
            placeholder="Digite a descrição"
            className="min-h-[100px] rounded-2xl"
          />
        </div>

        {/* Tributável */}
        <div className="space-y-3">
          <Label htmlFor="tributavel" className="text-lg font-semibold">Tributável:</Label>
          <Select value={formData.tributavel} onValueChange={(value) => handleInputChange('tributavel', value)}>
            <SelectTrigger className="rounded-2xl h-12">
              <SelectValue placeholder="SIM" />
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
              <Label htmlFor="quantidade" className="font-medium">Quantidade:</Label>
              <Input
                id="quantidade"
                value={formData.quantidade}
                onChange={(e) => handleInputChange('quantidade', e.target.value)}
                placeholder="1"
                className="rounded-2xl h-12"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="valor-unitario" className="font-medium">Valor Unitário:</Label>
              <Input
                id="valor-unitario"
                value={formData.valorUnitario}
                onChange={(e) => handleInputChange('valorUnitario', e.target.value)}
                placeholder="R$ 4.000,00"
                className="rounded-2xl h-12"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="valor-total" className="font-medium">Valor Total:</Label>
              <Input
                id="valor-total"
                value={formData.valorTotal}
                onChange={(e) => handleInputChange('valorTotal', e.target.value)}
                placeholder="R$ 4.000,00"
                className="rounded-2xl h-12"
              />
            </div>
          </div>
          
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm" className="rounded-2xl">
              Limpar
            </Button>
            <Button size="sm" className="rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700">
              Inserir
            </Button>
          </div>
        </div>

        {/* Tabela de Serviços */}
        <div className="space-y-6">
          <Card className="glass-card border-0 rounded-3xl">
            <CardContent className="p-6">
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
            <Label htmlFor="valor-servico-total" className="font-medium">Valor Serviço:</Label>
            <Input
              id="valor-servico-total"
              value="R$ 4.000,00"
              readOnly
              className="bg-gray-50 rounded-2xl h-12"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="sub-total" className="font-medium">Sub Total Itens:</Label>
            <Input
              id="sub-total"
              value="R$ 4.000,00"
              readOnly
              className="bg-gray-50 rounded-2xl h-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ValoresStep({ formData, handleInputChange }: { formData: any, handleInputChange: (field: string, value: string) => void }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 gradient-text">Valores</h2>
        
        {/* Valor Serviço */}
        <div className="space-y-3">
          <Label htmlFor="valor-servico-valores" className="text-lg font-semibold">Valor Serviço:*</Label>
          <Input
            id="valor-servico-valores"
            value={formData.valorServico}
            onChange={(e) => handleInputChange('valorServico', e.target.value)}
            placeholder="R$ 4.000,00"
            className="rounded-2xl h-12"
          />
        </div>

        {/* ISS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="iss" className="font-medium">ISS:</Label>
            <Input
              id="iss"
              value={formData.iss}
              onChange={(e) => handleInputChange('iss', e.target.value)}
              placeholder="R$ 0,00"
              className="rounded-2xl h-12"
            />
          </div>
          <div className="space-y-6">
            <Label className="font-medium">ISS retido?*</Label>
            <RadioGroup 
              value={formData.issRetido} 
              onValueChange={(value) => handleInputChange('issRetido', value)}
              className="flex space-x-8"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="sim" id="iss-sim" className="w-5 h-5" />
                <Label htmlFor="iss-sim" className="font-medium">SIM</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="nao" id="iss-nao" className="w-5 h-5" />
                <Label htmlFor="iss-nao" className="font-medium">NÃO</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Retenções Federais */}
        <div className="space-y-6">
          <Label className="text-lg font-semibold">Retenções Federais</Label>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Label htmlFor="pis" className="font-medium">PIS:</Label>
              <Input
                id="pis"
                value={formData.pis}
                onChange={(e) => handleInputChange('pis', e.target.value)}
                placeholder="R$ 0,00"
                className="rounded-2xl h-12"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="cofins" className="font-medium">COFINS:</Label>
              <Input
                id="cofins"
                value={formData.cofins}
                onChange={(e) => handleInputChange('cofins', e.target.value)}
                placeholder="R$ 0,00"
                className="rounded-2xl h-12"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="ir" className="font-medium">IR:</Label>
              <Input
                id="ir"
                value={formData.ir}
                onChange={(e) => handleInputChange('ir', e.target.value)}
                placeholder="R$ 0,00"
                className="rounded-2xl h-12"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="csll" className="font-medium">CSLL:</Label>
              <Input
                id="csll"
                value={formData.csll}
                onChange={(e) => handleInputChange('csll', e.target.value)}
                placeholder="R$ 0,00"
                className="rounded-2xl h-12"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="inss" className="font-medium">INSS:</Label>
              <Input
                id="inss"
                value={formData.inss}
                onChange={(e) => handleInputChange('inss', e.target.value)}
                placeholder="R$ 0,00"
                className="rounded-2xl h-12"
              />
            </div>
          </div>
        </div>

        {/* Outras Informações */}
        <div className="space-y-3">
          <Label htmlFor="outras-informacoes" className="text-lg font-semibold">Outras Informações</Label>
          <Textarea
            id="outras-informacoes"
            value={formData.outrasInformacoes}
            onChange={(e) => handleInputChange('outrasInformacoes', e.target.value)}
            placeholder="Digite outras informações relevantes"
            className="min-h-[120px] rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}

function EventosStep() {
  return (
    <div className="space-y-8">
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 gradient-text">Eventos</h2>
        <p className="text-gray-600 text-lg">Esta etapa será implementada nas próximas versões.</p>
      </div>
    </div>
  );
}

function ContaCivilStep({ formData, handleInputChange }: { formData: any, handleInputChange: (field: string, value: string) => void }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 gradient-text">Construção Civil</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="art-ou-n" className="font-medium">ART OU N° Projeto:</Label>
            <Input
              id="art-ou-n"
              value={formData.artOuN}
              onChange={(e) => handleInputChange('artOuN', e.target.value)}
              placeholder="Digite o número"
              className="rounded-2xl h-12"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="codigo-obra" className="font-medium">Código da obra (CNO):</Label>
            <Input
              id="codigo-obra"
              value={formData.codigoObra}
              onChange={(e) => handleInputChange('codigoObra', e.target.value)}
              placeholder="Digite o código"
              className="rounded-2xl h-12"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="deducoes" className="font-medium">Deduções:</Label>
          <Input
            id="deducoes"
            value={formData.deducoes}
            onChange={(e) => handleInputChange('deducoes', e.target.value)}
            placeholder="R$ 0,00"
            className="rounded-2xl h-12"
          />
        </div>
      </div>
    </div>
  );
}

function GerarStep() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 gradient-text">Gerar Nota Fiscal</h2>
        
        <div className="space-y-8">
          <p className="text-gray-600 text-lg">
            Revise todas as informações antes de gerar a nota fiscal.
          </p>
          
          <div className="flex justify-center space-x-6">
            <Button 
              variant="ghost" 
              className="flex items-center space-x-3 px-8 py-3 rounded-2xl"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center space-x-3 px-8 py-3 rounded-2xl border-primary-600 text-primary-600 hover:bg-primary-50"
            >
              <Eye className="w-5 h-5" />
              <span>Visualizar</span>
            </Button>
            
            <Button 
              className="flex items-center space-x-3 px-8 py-3 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
            >
              <FileText className="w-5 h-5" />
              <span>Gerar</span>
            </Button>
          </div>

          {/* Preview da Nota Fiscal */}
          <Card className="glass-card border-0 rounded-3xl mt-12">
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
                    <Label className="font-semibold">Razão Social:</Label>
                    <p>RR COSTA CONSULTORIA EM SISTEMAS</p>
                  </div>
                  <div>
                    <Label className="font-semibold">CPF/CNPJ:</Label>
                    <p>36.249.383/0001-76</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Inscrição Municipal:</Label>
                    <p>30443000</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Logradouro:</Label>
                    <p>RUA CRUZEIRO RIBEIRO</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="font-semibold">Bairro:</Label>
                    <p>BAIRRO SANTA MÔNICA SETOR C - LOTE(A)</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Número:</Label>
                    <p>590</p>
                  </div>
                  <div>
                    <Label className="font-semibold">CEP:</Label>
                    <p>38408-242</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Cidade:</Label>
                    <p>UBERLÂNDIA</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-primary-50 rounded-2xl">
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
    </div>
  );
}