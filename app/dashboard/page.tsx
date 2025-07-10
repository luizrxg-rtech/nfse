'use client';

import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Ban, Building, Edit3, FileSearch, FileText, PlusCircle, Send} from 'lucide-react';
import Footer from '@/components/Footer';
import Sidebar from "@/components/Sidebar";
import {QuickAccess} from "@/types/Dashboard";
import ActionCard from "@/components/ActionCard";


export default function Dashboard() {
  const router = useRouter();

  const quickAccesses: QuickAccess[] = [
    {
      title: 'Emitir',
      description: 'Nota Fiscal',
      icon: PlusCircle,
      color: 'primary',
      path: '/nota-fiscal/emitir',
      onClick: (path) => router.push(path),
    },
    {
      title: 'Personalizar',
      description: 'Nota Fiscal',
      icon: Edit3,
      color: 'blue',
      path: '',
      onClick: (path) => router.push(path),
    },
    {
      title: 'Cancelar',
      description: 'Nota Fiscal',
      icon: Ban,
      color: 'red',
      path: '',
      onClick: (path) => router.push(path),
    },
    {
      title: 'Enviar Lote',
      description: 'Lote',
      icon: Send,
      color: 'amber',
      path: '',
      onClick: (path) => router.push(path),
    },
    {
      title: 'Consultar',
      description: 'Nota Fiscal',
      icon: FileSearch,
      color: 'purple',
      path: '',
      onClick: (path) => router.push(path),
    },
    {
      title: 'Selecionar Empresa',
      description: 'Trocar contexto',
      icon: Building,
      color: 'orange',
      path: '',
      onClick: (path) => router.push(path),
    },
  ]

  return (
    <div className="min-h-screen">
      <div className="flex p-8 gap-8">
        {/* Sidebar */}
        <Sidebar/>

        {/* Main Content */}
        <main className="flex-1">
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

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Acesso Rápido</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quickAccesses.map((quickAccess, index) =>
                <ActionCard
                  key={index}
                  title={quickAccess.title}
                  description={quickAccess.description}
                  color={quickAccess.color}
                  Icon={quickAccess.icon}
                  onClick={() => { if (quickAccess?.onClick) quickAccess.onClick(quickAccess.path) }}
                />
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Atividades Recentes</h2>
            <Card className="border-0">
              <CardContent className="p-12">
                <div className="text-center text-gray-500 py-12">
                  <FileText className="w-16 h-16 mx-auto mb-6 text-gray-300"/>
                  <p className="text-lg font-medium">Nenhuma atividade recente</p>
                  <p className="text-sm mt-3">Suas notas fiscais emitidas aparecerão aqui</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <Footer/>
    </div>
  );
}