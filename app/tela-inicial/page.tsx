'use client';

import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Building, CircleOff, Plus, Repeat, Search, Send} from 'lucide-react';
import Sidebar from "@/components/Sidebar";
import {QuickAccess} from "@/types/Dashboard";
import ActionCard from "@/components/ActionCard";
import RecentActivity from "@/components/RecentActivity";


export default function TelaInicial() {
  const router = useRouter();

  const quickAccesses: QuickAccess[] = [
    {
      title: 'Emitir',
      description: 'Nota Fiscal',
      icon: Plus,
      color: 'primary',
      path: '/nota-fiscal/emitir',
      onClick: (path) => router.push(path),
    },
    {
      title: 'Cancelar',
      description: 'Nota Fiscal',
      icon: CircleOff,
      color: 'red',
      path: '',
      // onClick: (path) => router.push(path),
    },
    {
      title: 'Consulta Rápida',
      description: 'Nota Fiscal',
      icon: Search,
      color: 'fuchsia',
      path: '',
      // onClick: (path) => router.push(path),
    },
    {
      title: 'Reemitir',
      description: 'Nota Fiscal',
      icon: Repeat,
      color: 'blue',
      path: '',
      // onClick: (path) => router.push(path),
    },
    {
      title: 'Enviar Lote',
      description: 'Lote',
      icon: Send,
      color: 'amber',
      path: '',
      // onClick: (path) => router.push(path),
    },
    {
      title: 'Selecionar Empresa',
      description: 'Trocar contexto',
      icon: Building,
      color: 'orange',
      path: '',
      // onClick: (path) => router.push(path),
    },
  ]

  return (
    <div className="h-screen">
      <div className="flex h-full items-stretch">
        <Sidebar/>
        <main className="flex-1 p-8 ml-[360px] overflow-y-auto h-screen">
          <div className="mb-2">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 font-medium">
                <span>R COSTA CONSULTORIA EM SISTEMAS - CNPJ: 36.249.383/0001-76 - 34.3613.4600</span>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="translucid" size="sm">
                  Selecionar Outra Empresa
                </Button>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Acesso Rápido</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
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
          <RecentActivity />
        </main>
      </div>
    </div>
  );
}