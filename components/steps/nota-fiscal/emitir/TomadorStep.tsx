import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

import {cn} from "@/lib/utils";
import {Search} from "lucide-react";

export default function TomadorStep({
  formData,
  handleInputChange,
  className
}: {
  formData: any,
  handleInputChange: (field: string, value: string) => void,
  className: string,
}) {
  return (
    <div className={cn("", className)}>

      <h2 className="text-3xl font-bold text-gray-900">Tomador de serviços</h2>

      {/* Tipo de Pessoa */}
      <div className="space-y-6">
        <Label className="text-lg font-semibold">Tipo de Pessoa</Label>
        <RadioGroup
          value={formData.tipoPessoa}
          onValueChange={(value: any) => handleInputChange('tipoPessoa', value)}
          className="flex space-x-8"
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="cpf" id="cpf" className="w-5 h-5"/>
            <Label htmlFor="cpf" className="font-medium">CPF</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="cnpj" id="cnpj" className="w-5 h-5"/>
            <Label htmlFor="cnpj" className="font-medium">CNPJ</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="exterior" id="exterior" className="w-5 h-5"/>
            <Label htmlFor="exterior" className="font-medium">(Exterior) NIF</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Estabelecimento em Tupaciguara */}
      <div className="space-y-6">
        <Label className="text-lg font-semibold">Estabelecimento no Município de Tupaciguara</Label>
        <RadioGroup
          value={formData.estabelecimentoTupaciguara}
          onValueChange={(value: any) => handleInputChange('estabelecimentoTupaciguara', value)}
          className="flex space-x-8"
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="sim" id="sim" className="w-5 h-5"/>
            <Label htmlFor="sim" className="font-medium">Sim</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="nao" id="nao" className="w-5 h-5"/>
            <Label htmlFor="nao" className="font-medium">Não</Label>
          </div>
        </RadioGroup>
      </div>

      {/* CNPJ */}
      <div className="space-y-3">
        <Label htmlFor="cnpj-input" className="text-lg font-semibold">CNPJ</Label>
        <Input
          id="cnpj-input"
          value={formData.cnpj}
          onChange={(e) => handleInputChange('cnpj', e.target.value)}
          placeholder="00.000.000/0000-00"

        />
      </div>

      {/* Nome/Razão Social */}
      <div className="space-y-3">
        <Label htmlFor="nome-razao" className="text-lg font-semibold">Nome/Razão social</Label>
        <Input
          id="nome-razao"
          value={formData.nomeRazaoSocial}
          onChange={(e) => handleInputChange('nomeRazaoSocial', e.target.value)}
          placeholder="Digite o nome ou razão social"

        />
      </div>

      {/* Endereço */}
      <div className="space-y-6">
        <Label className="text-lg font-semibold">Endereço</Label>
        <RadioGroup
          value={formData.informarEndereco}
          onValueChange={(value: any) => handleInputChange('informarEndereco', value)}
          className="flex space-x-8"
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="sim" id="endereco-sim" className="w-5 h-5"/>
            <Label htmlFor="endereco-sim" className="font-medium">Sim</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="exterior" id="endereco-exterior" className="w-5 h-5"/>
            <Label htmlFor="endereco-exterior" className="font-medium">Exterior</Label>
          </div>
        </RadioGroup>
      </div>

      {/* CEP */}
      <div className="space-y-3">
        <Label htmlFor="cep" className="text-lg font-semibold">CEP*</Label>
        <div className="flex space-x-4">
          <Input
            id="cep"
            value={formData.cep}
            onChange={(e) => handleInputChange('cep', e.target.value)}
            placeholder="00000-000"
            className="flex-1 h-12"
          />
          <Button
            size="lg"
            className="flex items-center space-x-3"
          >
            <Search className="w-5 h-5"/>
            <span>Buscar</span>
          </Button>
        </div>
      </div>

      {/* Logradouro e Número */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="logradouro" className="text-lg font-semibold">Logradouro*</Label>
          <Input
            id="logradouro"
            value={formData.logradouro}
            onChange={(e) => handleInputChange('logradouro', e.target.value)}
            placeholder="Digite o logradouro"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="numero" className="text-lg font-semibold">Número*</Label>
          <Input
            id="numero"
            value={formData.numero}
            onChange={(e) => handleInputChange('numero', e.target.value)}
            placeholder="Digite o número"
          />
        </div>
      </div>

      {/* Complemento e Bairro */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="complemento" className="text-lg font-semibold">Complemento</Label>
          <Input
            id="complemento"
            value={formData.complemento}
            onChange={(e) => handleInputChange('complemento', e.target.value)}
            placeholder="Digite o complemento"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="bairro" className="text-lg font-semibold">Bairro*</Label>
          <Input
            id="bairro"
            value={formData.bairro}
            onChange={(e) => handleInputChange('bairro', e.target.value)}
            placeholder="Digite o bairro"
          />
        </div>
      </div>

      {/* Município e Estado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="municipio" className="text-lg font-semibold">Município*</Label>
          <Input
            id="municipio"
            value={formData.municipio}
            onChange={(e) => handleInputChange('municipio', e.target.value)}
            placeholder="Digite o município"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="estado" className="text-lg font-semibold">Estado*</Label>
          <Input
            id="estado"
            value={formData.estado}
            onChange={(e) => handleInputChange('estado', e.target.value)}
            placeholder="Digite o estado"
          />
        </div>
      </div>

      {/* Contato */}
      <div className="space-y-6">
        <Label className="text-lg font-semibold">Contato</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="telefone" className="font-medium">Telefone</Label>
            <Input
              id="telefone"
              value={formData.telefone}
              onChange={(e) => handleInputChange('telefone', e.target.value)}
              placeholder="(00) 00000-0000"

            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="email" className="font-medium">E-mail*</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="exemplo@email.com"

            />
          </div>
        </div>
      </div>
    </div>
  );
}