'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileText, 
  Settings, 
  User, 
  Search, 
  X, 
  Building, 
  PlusCircle,
  Edit3,
  Ban,
  Send,
  Users,
  FileSearch,
  LogOut,
  List,
  AlertCircle,
  Calculator,
  BarChart3,
  Home,
  ChevronDown
} from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Dashboard() {
  const router = useRouter();
  const [selectedMenuItem, setSelectedMenuItem] = useState('tela-inicial');
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const menuItems = [
    { id: 'tela-inicial', label: 'Tela Inicial', icon: Home },
    { 
      id: 'nota-fiscal', 
      label: 'Nota Fiscal', 
      icon: FileText,
      submenu: [
        { id: 'emitir', label: 'Emitir' },
        { id: 'cancelar', label: 'Cancelar' },
        { id: 'reemitir', label: 'Reemitir' },
        { id: 'guia-fiscal', label: 'Guia Fiscal' }
      ]
    },
    { 
      id: 'nota-cancelada', 
      label: 'Nota Cancelada', 
      icon: Ban,
      submenu: [
        { id: 'consultar-cancelada', label: 'Consultar' },
        { id: 'pendentes', label: 'Pendentes' }
      ]
    },
    { id: 'consultar', label: 'Consultar', icon: Search },
    { 
      id: 'tomador', 
      label: 'Tomador', 
      icon: Users,
      submenu: [
        { id: 'cadastrar-tomador', label: 'Cadastrar' },
        { id: 'cancelamentos', label: 'Cancelamentos' }
      ]
    },
    { 
      id: 'guia', 
      label: 'Guia', 
      icon: Calculator,
      submenu: [
        { id: 'gerar', label: 'Gerar' },
        { id: 'consulta', label: 'Consulta' }
      ]
    },
    { 
      id: 'usuario-autorizacao', 
      label: 'Usuário Autorização', 
      icon: User,
      submenu: [
        { id: 'proprio', label: 'Próprio' },
        { id: 'aceitar', label: 'Aceitar' },
        { id: 'alterar', label: 'Alterar' },
        { id: 'cancelar-enviada', label: 'Cancelar Enviada' },
        { id: 'cancelar-recebida', label: 'Cancelar Recebida' }
      ]
    },
    { 
      id: 'configuracoes', 
      label: 'Configurações', 
      icon: Settings,
      submenu: [
        { id: 'personalizar', label: 'Personalizar' }
      ]
    },
    { id: 'escrituracao', label: 'Escrituração', icon: FileText },
    { 
      id: 'relatorios', 
      label: 'Relatórios', 
      icon: BarChart3,
      submenu: [
        { id: 'prestados', label: 'Prestados' },
        { id: 'guandos-final', label: 'Guandos (Final)' },
        { id: 'tomados', label: 'Tomados' }
      ]
    },
    { id: 'avisos', label: 'Avisos', icon: AlertCircle },
    { 
      id: 'regime-especial', 
      label: 'Regime Especial', 
      icon: List,
      submenu: [
        { id: 'notas-pendentes', label: 'Notas Pendentes' }
      ]
    },
    { 
      id: 'lote', 
      label: 'Lote', 
      icon: Send,
      submenu: [
        { id: 'enviar', label: 'Enviar' },
        { id: 'consultar-lote', label: 'Consultar' }
      ]
    },
  ];

  const handleLogout = () => {
    router.push('/');
  };

  const renderMenuItem = (item: any) => {
    const Icon = item.icon;
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = expandedMenus.includes(item.id);

    return (
      <div key={item.id} className="mb-2">
        <div
          onClick={() => hasSubmenu && toggleMenu(item.id)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 ${
            selectedMenuItem === item.id
              ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white'
              : 'text-gray-700 hover:bg-gray-100/80'
          } ${hasSubmenu ? 'cursor-pointer' : ''}`}
        >
          <div className="flex items-center space-x-4">
            <Icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.label}</span>
          </div>
          {hasSubmenu && (
            <div className="ml-auto">
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : 'rotate-0'
                }`} 
              />
            </div>
          )}
        </div>
        
        {hasSubmenu && isExpanded && (
          <div className="ml-6 mt-2 space-y-1">
            {item.submenu.map((subItem: any) => (
              <div
                key={subItem.id}
                className="flex items-center space-x-3 px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-all duration-200 cursor-pointer"
              >
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-sm">{subItem.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
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
              {menuItems.map(renderMenuItem)}
            </nav>

            <div className="p-6 border-t border-gray-200/50 mt-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="w-full rounded-2xl hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </aside>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8 pl-0">
          <div>
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

            {/* Quick Actions */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 gradient-text">Acesso Rápido</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Emitir Nota Fiscal */}
                <Card 
                  className="glass-card transition-all duration-300 cursor-pointer border-0 rounded-3xl group card-glow-primary" 
                  onClick={() => router.push('/nota-fiscal')}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl flex items-center justify-center transition-transform duration-300">
                        <PlusCircle className="w-8 h-8 text-primary-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Emitir</h3>
                        <p className="text-sm text-gray-600 font-medium">Nota Fiscal</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Personalizar Minha Nota Fiscal */}
                <Card className="glass-card transition-all duration-300 cursor-pointer border-0 rounded-3xl group card-glow-blue">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center transition-transform duration-300">
                        <Edit3 className="w-8 h-8 text-blue-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Personalizar Minha</h3>
                        <p className="text-sm text-gray-600 font-medium">Nota Fiscal</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cancelar Nota Fiscal */}
                <Card className="glass-card transition-all duration-300 cursor-pointer border-0 rounded-3xl group card-glow-red">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl flex items-center justify-center transition-transform duration-300">
                        <Ban className="w-8 h-8 text-red-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Cancelar</h3>
                        <p className="text-sm text-gray-600 font-medium">Nota Fiscal</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Enviar Lote */}
                <Card className="glass-card transition-all duration-300 cursor-pointer border-0 rounded-3xl group card-glow-green">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-3xl flex items-center justify-center transition-transform duration-300">
                        <Send className="w-8 h-8 text-green-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Enviar Lote</h3>
                        <p className="text-sm text-gray-600 font-medium">Processamento</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Consultar Nota Fiscal */}
                <Card className="glass-card transition-all duration-300 cursor-pointer border-0 rounded-3xl group card-glow-purple">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl flex items-center justify-center transition-transform duration-300">
                        <FileSearch className="w-8 h-8 text-purple-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">Consultar</h3>
                        <p className="text-sm text-gray-600 font-medium">Nota Fiscal</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Selecionar Empresa */}
                <Card className="glass-card transition-all duration-300 cursor-pointer border-0 rounded-3xl group card-glow-orange">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl flex items-center justify-center transition-transform duration-300">
                        <Building className="w-8 h-8 text-orange-700" />
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
              <Card className="glass-card border-0 rounded-3xl">
                <CardContent className="p-12">
                  <div className="text-center text-gray-500 py-12">
                    <FileText className="w-16 h-16 mx-auto mb-6 text-gray-300" />
                    <p className="text-lg font-medium">Nenhuma atividade recente</p>
                    <p className="text-sm mt-3">Suas notas fiscais emitidas aparecerão aqui</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}