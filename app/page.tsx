'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  FileText,
  Shield,
  Users,
  Search,
  Settings,
  AlertCircle,
  Download,
  Globe,
  IdCard,
  MonitorCog
} from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Loading from "@/components/Loading";
import ActionCard from "@/components/ActionCard";



export default function Home() {
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (method: 'certificate' | 'gov') => {
    setIsLoggingIn(true);
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1500));
    router.push('/dashboard');
  };

  const accesses = [
    {title: 'Certificado de CNPJ/CPF',  description: 'Acesse com seu certificado digital', icon: IdCard,     color: "blue", onClick: handleLogin},
    {title: 'GOV.BR',                   description: 'Faça login pelo site do Gov',        icon: Globe,      color: "green"},
    {title: 'Acesse a versão anterior', description: 'Sistema legado',                     icon: MonitorCog, color: "amber"},
  ]

  const services = [
    {title: 'DES-IF',                 icon: FileText,    color: "blue"  },
    {title: 'Relatório de NFs Pagas', icon: FileText,    color: "green" },
    {title: 'Documentação RPS',       icon: Download,    color: "purple"},
    {title: 'Escrituração',           icon: FileText,    color: "orange"},
    {title: 'NFS-e Avulsa',           icon: AlertCircle, color: "red"   },
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="flex flex-col items-center hero-gradient city-background relative">
        <div className="flex flex-col w-full px-8 max-w-7xl py-32 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-white space-y-10">
              <div className="flex flex-col gap-2">
                <h1 className="text-5xl md:text-6xl text-primary-700 font-bold leading-tight"> NFS-e </h1>
                <span className="text-4xl md:text-5xl font-light">Nota Fiscal de Serviços</span>
                <p className="mt-2 text-xl text-gray-800 leading-relaxed font-medium">
                  Bem vindo(a) ao Portal de Notas Fiscais da Prefeitura de Tupaciguara. 
                  Aqui você pode emitir Nota Fiscal, verificar autenticidade, 
                  consultar RPS e muito mais.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-0 px-8 py-4 font-semibold"
                  onClick={() => router.push('/dashboard')}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Acesso aos sistemas
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-10 px-8 max-w-7xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Certificate Login */}
            {accesses.map(access =>
              <ActionCard
                title={access.title}
                description={access.description}
                color={access.color}
                Icon={access.icon}
                onClick={access.onClick}
              />
            )}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="flex flex-col items-center py-32">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 gradient-text">Acesso Rápido</h2>
        <div className="flex flex-col w-full max-w-7xl px-4 sm:px-6 lg:px-8 gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.slice(0, 2).map(service =>
              <ActionCard
                title={service.title}
                color={service.color}
                Icon={service.icon}
              />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(2, 5).map(service =>
              <ActionCard
                title={service.title}
                color={service.color}
                Icon={service.icon}
              />
            )}
          </div>
        </div>
      </section>

      <Footer />

      {/* Loading Overlay */}
      {isLoggingIn && <Loading text={"Autenticando..."}/>}
    </div>
  );
}