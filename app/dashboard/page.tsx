'use client';

import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Ban, Building, Edit3, FileSearch, FileText, LogOut, PlusCircle, Send} from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
  const router = useRouter();

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
            <h2 className="text-2xl font-bold text-gray-900 mb-8 gradient-text">Acesso Rápido</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Emitir Nota Fiscal */}
              <Card
                className="bg-white transition-all duration-300 cursor-pointer border-0 group card-glow-primary"
                onClick={() => router.push('/nota-fiscal/emitir')}
              >
                <CardContent className="p-8">
                  <div className="flex items-center space-x-6">
                    <div
                      className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl flex items-center justify-center transition-transform duration-300">
                      <PlusCircle className="w-8 h-8 text-primary-700"/>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">Emitir</h3>
                      <p className="text-sm text-gray-600 font-medium">Nota Fiscal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personalizar Minha Nota Fiscal */}
              <Card className="bg-white transition-all duration-300 cursor-pointer border-0 group card-glow-blue">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-6">
                    <div
                      className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center transition-transform duration-300">
                      <Edit3 className="w-8 h-8 text-blue-700"/>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">Personalizar</h3>
                      <p className="text-sm text-gray-600 font-medium">Nota Fiscal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cancelar Nota Fiscal */}
              <Card className="bg-white transition-all duration-300 cursor-pointer border-0 group card-glow-red">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-6">
                    <div
                      className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl flex items-center justify-center transition-transform duration-300">
                      <Ban className="w-8 h-8 text-red-700"/>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">Cancelar</h3>
                      <p className="text-sm text-gray-600 font-medium">Nota Fiscal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enviar Lote */}
              <Card className="bg-white transition-all duration-300 cursor-pointer border-0 group card-glow-amber">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-6">
                    <div
                      className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-3xl flex items-center justify-center transition-transform duration-300">
                      <Send className="w-8 h-8 text-amber-700"/>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">Enviar Lote</h3>
                      <p className="text-sm text-gray-600 font-medium">Lote</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Consultar Nota Fiscal */}
              <Card className="bg-white transition-all duration-300 cursor-pointer border-0 group card-glow-purple">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-6">
                    <div
                      className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl flex items-center justify-center transition-transform duration-300">
                      <FileSearch className="w-8 h-8 text-purple-700"/>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">Consultar</h3>
                      <p className="text-sm text-gray-600 font-medium">Nota Fiscal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Selecionar Empresa */}
              <Card className="bg-white transition-all duration-300 cursor-pointer border-0 group card-glow-orange">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-6">
                    <div
                      className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl flex items-center justify-center transition-transform duration-300">
                      <Building className="w-8 h-8 text-orange-700"/>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">Selecionar Empresa</h3>
                      <p className="text-sm text-gray-600 font-medium">Trocar contexto</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 gradient-text">Atividades Recentes</h2>
            <Card className="bg-white border-0 rounded-3xl">
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