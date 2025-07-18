'use client';

import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {
  CircleOff,
  Building, CalendarRange,
  Edit3, FileClock,
  FileSearch,
  FileText,
  Plus, Search,
  SearchCheck,
  Send,
  UserRound,
  UserRoundSearch, UsersRound
} from 'lucide-react';
import Footer from '@/components/Footer';
import Sidebar from "@/components/Sidebar";
import {QuickAccess} from "@/types/Dashboard";
import ActionCard from "@/components/ActionCard";
import RecentActivity from "@/components/RecentActivity";

export default function Consulta() {
  const router = useRouter();

  const quickAccesses: QuickAccess[] = [
    {
      title: 'Consulta Tomador',
      description: 'Tomador',
      icon: UserRound,
      color: 'primary',
      path: '',
      onClick: (path) => router.push(path),
    },
    {
      title: 'Consulta por Emissão',
      description: 'Nota Fiscal',
      icon: FileText,
      color: 'blue',
      path: '',
      onClick: (path) => router.push(path),
    },
    {
      title: 'Consulta Rápida',
      description: 'Nota Fiscal',
      icon: Search,
      color: 'fuchsia',
      path: '',
      onClick: (path) => router.push(path),
    },
    {
      title: 'Consulta Intermediário',
      description: 'Intermediário',
      icon: UsersRound,
      color: 'purple',
      path: '',
      onClick: (path) => router.push(path),
    },
    {
      title: 'Consulta por Competência',
      description: 'Nota Fiscal',
      icon: CalendarRange,
      color: 'amber',
      path: '',
      onClick: (path) => router.push(path),
    },
    {
      title: 'Consulta RPS',
      description: 'RPS',
      icon: FileClock,
      color: 'orange',
      path: '',
      onClick: (path) => router.push(path),
    },
  ]

  return (
    <div className="min-h-screen">
      <div className="flex min-h-full items-stretch">
        {/* Sidebar */}
        <Sidebar/>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Header Info */}
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

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Consulta</h2>
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