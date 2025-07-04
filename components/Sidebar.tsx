import {
  AlertCircle,
  Ban,
  BarChart3, Building,
  Calculator,
  ChevronDown, ChevronRight,
  FileText,
  Home, List, LogOut, LucideIcon,
  Search, Send,
  Settings,
  User,
  Users
} from 'lucide-react';
import {Dispatch, SetStateAction, useState} from "react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

interface Submenu {
  id: string;
  label: string;
}

interface Item {
  id: string;
  label: string;
  icon: LucideIcon;
  submenus?: Submenu[]
}

const menuItems: Item[] = [
  { id: 'tela-inicial', label: 'Tela Inicial', icon: Home },
  {
    id: 'nota-fiscal',
    label: 'Nota Fiscal',
    icon: FileText,
    submenus: [
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
    submenus: [
      { id: 'consultar-cancelada', label: 'Consultar' },
      { id: 'pendentes', label: 'Pendentes' }
    ]
  },
  { id: 'consultar', label: 'Consultar', icon: Search },
  {
    id: 'tomador',
    label: 'Tomador',
    icon: Users,
    submenus: [
      { id: 'cadastrar-tomador', label: 'Cadastrar' },
      { id: 'cancelamentos', label: 'Cancelamentos' }
    ]
  },
  {
    id: 'guia',
    label: 'Guia',
    icon: Calculator,
    submenus: [
      { id: 'gerar', label: 'Gerar' },
      { id: 'consulta', label: 'Consulta' }
    ]
  },
  {
    id: 'usuario-autorizacao',
    label: 'Usuário Autorização',
    icon: User,
    submenus: [
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
    submenus: [
      { id: 'personalizar', label: 'Personalizar' }
    ]
  },
  { id: 'escrituracao', label: 'Escrituração', icon: FileText },
  {
    id: 'relatorios',
    label: 'Relatórios',
    icon: BarChart3,
    submenus: [
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
    submenus: [
      { id: 'notas-pendentes', label: 'Notas Pendentes' }
    ]
  },
  {
    id: 'lote',
    label: 'Lote',
    icon: Send,
    submenus: [
      { id: 'enviar', label: 'Enviar' },
      { id: 'consultar-lote', label: 'Consultar' }
    ]
  },
];

const Item = (
  item: Item,
  selectedItem: string,
  setSelectedItem: Dispatch<SetStateAction<string>>,
  expandedMenus: string[],
  setExpandedMenus: Dispatch<SetStateAction<string[]>>
) => {
  const hasSubmenu = item.submenus && item.submenus.length > 0;
  const isExpanded = expandedMenus.includes(item.id);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  return (
    <div key={item.id} className="mb-2">
      <div
        onClick={() => hasSubmenu && toggleMenu(item.id)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-full transition-all duration-300 ${
          selectedItem === item.id
            ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white text'
            : 'text-gray-700 hover:bg-primary-100/90 hover:text-accent'
        } ${hasSubmenu ? 'cursor-pointer' : ''}`}
      >
        <div className="flex items-center space-x-4">
          <item.icon className="w-5 h-5" />
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
          {item.submenus!!.map((subItem: any) => (
            <div
              key={subItem.id}
              className="flex items-center space-x-3 px-4 py-2 rounded-full text-gray-700 hover:bg-primary-100/90 hover:text-accent transition-all duration-200 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4"/>
              <span className="text-sm">{subItem.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Sidebar() {
  const router = useRouter();

  const [selectedItem, setSelectedItem] = useState<string>('tela-inicial');
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const handleLogout = () => {
    router.push('/');
  };

  return (
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
          {menuItems.map((item) => Item(item, selectedItem, setSelectedItem, expandedMenus, setExpandedMenus))}
        </nav>

        <div className="p-6 border-t border-gray-200/50 mt-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full rounded-full hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </aside>
    </div>
  );
};