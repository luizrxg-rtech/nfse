import {
  AlertCircle,
  Ban,
  BarChart3,
  Building,
  Calculator,
  FileText,
  Home,
  List,
  LogOut,
  Search,
  Send,
  Settings,
  User,
  Users
} from 'lucide-react';
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {Item} from "@/types/MenuItem";
import MenuItem from "@/components/MenuItem";

const menuItems: Item[] = [
  { id: '/dashboard', label: 'Tela Inicial', icon: Home },
  {
    id: '/nota-fiscal',
    label: 'Nota Fiscal',
    icon: FileText,
    submenus: [
      { id: '/emitir', label: 'Emitir' },
      { id: '/cancelar', label: 'Cancelar' },
      { id: '/reemitir', label: 'Reemitir' },
      { id: '/guia-fiscal', label: 'Guia Fiscal' }
    ]
  },
  {
    id: '/nota-cancelada',
    label: 'Nota Cancelada',
    icon: Ban,
    submenus: [
      { id: '/consultar-cancelada', label: 'Consultar' },
      { id: '/pendentes', label: 'Pendentes' }
    ]
  },
  { id: '/consultar', label: 'Consultar', icon: Search },
  {
    id: '/tomador',
    label: 'Tomador',
    icon: Users,
    submenus: [
      { id: '/cadastrar-tomador', label: 'Cadastrar' },
      { id: '/cancelamentos', label: 'Cancelamentos' }
    ]
  },
  {
    id: '/guia',
    label: 'Guia',
    icon: Calculator,
    submenus: [
      { id: '/gerar', label: 'Gerar' },
      { id: '/consulta', label: 'Consulta' }
    ]
  },
  {
    id: '/usuario-autorizacao',
    label: 'Usuário Autorização',
    icon: User,
    submenus: [
      { id: '/proprio', label: 'Próprio' },
      { id: '/aceitar', label: 'Aceitar' },
      { id: '/alterar', label: 'Alterar' },
      { id: '/cancelar-enviada', label: 'Cancelar Enviada' },
      { id: '/cancelar-recebida', label: 'Cancelar Recebida' }
    ]
  },
  {
    id: '/configuracoes',
    label: 'Configurações',
    icon: Settings,
    submenus: [
      { id: '/personalizar', label: 'Personalizar' }
    ]
  },
  { id: '/escrituracao', label: 'Escrituração', icon: FileText },
  {
    id: '/relatorios',
    label: 'Relatórios',
    icon: BarChart3,
    submenus: [
      { id: '/prestados', label: 'Prestados' },
      { id: '/guandos-final', label: 'Guandos (Final)' },
      { id: '/tomados', label: 'Tomados' }
    ]
  },
  { id: '/avisos', label: 'Avisos', icon: AlertCircle },
  {
    id: '/regime-especial',
    label: 'Regime Especial',
    icon: List,
    submenus: [
      { id: '/notas-pendentes', label: 'Notas Pendentes' }
    ]
  },
  {
    id: '/lote',
    label: 'Lote',
    icon: Send,
    submenus: [
      { id: '/enviar', label: 'Enviar' },
      { id: '/consultar-lote', label: 'Consultar' }
    ]
  },
];

export default function Sidebar() {
  const router = useRouter();

  const [selectedItem, setSelectedItem] = useState<string>('dashboard');
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <aside className="flex flex-col w-80 h-fit bg-white rounded-3xl overflow-hidden">
      <div className="flex items-center space-x-3 p-4 border-b border-gray-200/50">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center">
          <FileText className="w-7 h-7 text-white" />
        </div>
        <div className="text-sm text-primary-800">
          <div className="font-bold text-lg">NFSE</div>
          <div className="text-sm text-gray-600 font-medium">Prefeitura de Tupaciguara</div>
        </div>
      </div>

      <nav className="p-2 space-y-2">
        {menuItems.map((item) =>
          <MenuItem
            item={item}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            expandedMenus={expandedMenus}
            setExpandedMenus={setExpandedMenus}
          />
        )}
      </nav>

      <div className="border-t hover:border-red-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full rounded-none hover:bg-red-50 hover:text-red-600 transition-colors space-x-2 p-6"
        >
          <LogOut className="w-4 h-4" />
          <span>Sair</span>
        </Button>
      </div>
    </aside>
  );
};