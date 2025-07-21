'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {
  ChartBar,
  Download,
  FileText,
  Globe,
  IdCard,
  MonitorCog,
  ReceiptText,
  ScrollText,
  Settings,
  Signature
} from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Loading from "@/components/Loading";
import ActionCard from "@/components/ActionCard";
import {Access, LoginMethod, Service} from "@/types/Landing";

export default function Home() {
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (method: LoginMethod) => {
    setIsLoggingIn(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    router.push('/tela-inicial');
  };

  const accesses: Access[] = [
    {title: 'Certificado de CNPJ/CPF',  description: 'Acesse com seu certificado digital', icon: IdCard,     color: "blue",    method: 'certificate', onClick: (method) => handleLogin(method)},
    {title: 'GOV.BR',                   description: 'Faça login pelo site do Gov',        icon: Globe,      color: "primary", method: 'gov',         onClick: (method) => handleLogin(method)},
    {title: 'Acesse a versão anterior', description: 'Sistema legado',                     icon: MonitorCog, color: "amber"},
  ]

  const services: Service[] = [
    {title: 'DES-IF',                   icon: FileText,    color: "blue"   },
    {title: 'Relatório de NFs Pagas',   icon: ChartBar,    color: "primary"},
    {title: 'Documentação RPS',         icon: Download,    color: "purple" },
    {title: 'Escrituração',             icon: ScrollText,  color: "orange" },
    {title: 'NFS-e Avulsa',             icon: ReceiptText, color: "red"    },
    {title: 'Verificar Autenticidade',  icon: Signature,   color: "amber"  },
  ]

  return (
    <div className="h-screen overflow-y-auto">
      <div className="city-background h-full">
        <div className="bg-gradient-to-r from-primary-800/90 to-primary-900/90 backdrop-blur-xs ">
          <Header />
          <section className="flex flex-col items-center relative">
            <div className="flex flex-col w-full px-8 max-w-7xl py-40 relative">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-10">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-5xl md:text-6xl text-white font-normal leading-tight"> NFS-e </h1>
                    <span className="text-4xl md:text-5xl text-gray-100 font-bold">Nota Fiscal de Serviços</span>
                    <p className="mt-2 text-xl text-gray-100 leading-relaxed font-normal">
                      Seja bem-vindo(a) ao Portal de Notas Fiscais da Prefeitura de Tupaciguara.
                      Neste espaço, você pode emitir suas Notas Fiscais,
                      conferir a autenticidade dos documentos, consultar RPS e acessar diversos outros serviços.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-96 lg:-bottom-10 max-w-7xl w-full">
              <div className="grid grid-cols-1 lg:grid-cols-3 px-4 sm:px-6 lg:px-8 gap-8">
                {accesses.map((access, index) =>
                  <ActionCard
                    key={index}
                    title={access.title}
                    description={access.description}
                    color={access.color}
                    Icon={access.icon}
                    onClick={() => access?.onClick && access.onClick(access.method!!)}
                  />
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="flex flex-col items-center py-32 bg-background">
        <div className="lg:hidden h-96"/>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Acesso Rápido</h2>
        <div className="flex flex-col w-full max-w-7xl px-4 sm:px-6 lg:px-8 gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) =>
              <ActionCard
                key={index}
                title={service.title}
                color={service.color}
                Icon={service.icon}
              />
            )}
          </div>
        </div>
      </section>

      <Footer />

      {isLoggingIn && <Loading text={"Autenticando"}/>}
    </div>
  );
}