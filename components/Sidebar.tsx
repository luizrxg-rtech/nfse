import {
  AlertCircle,
  Ban,
  BarChart3,
  Building,
  Calculator, ChevronRight,
  File, FileInput, FilePlus, FilePlus2, FileSearch, FileX, FileX2,
  Home,
  List,
  LogOut, ScrollText,
  Search,
  Send,
  Settings,
  User,
  Users
} from 'lucide-react';
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {usePathname, useRouter} from "next/navigation";
import {Item} from "@/types/MenuItem";
import MenuItem from "@/components/MenuItem";
import Image from "next/image";

const menuItems: Item[] = [
  { id: '/dashboard', label: 'Dashboard', icon: Home },
  {
    id: '/nota-fiscal',
    label: 'Nota Fiscal',
    icon: File,
    submenus: [
      { id: '/emitir', label: 'Emitir', icon: FilePlus2 },
      { id: '/cancelar', label: 'Cancelar', icon: FileX2 },
      { id: '/reemitir', label: 'Reemitir', icon: FileInput },
      { id: '/guia-fiscal', label: 'Guia Fiscal', icon: FileSearch }
    ]
  },
  {
    id: '/nota-cancelada',
    label: 'Nota Cancelada',
    icon: FileX,
    submenus: [
      { id: '/consultar-cancelada', label: 'Consultar', icon: ChevronRight },
      { id: '/pendentes', label: 'Pendentes', icon: ChevronRight }
    ]
  },
  { id: '/consultar', label: 'Consultar', icon: Search },
  {
    id: '/tomador',
    label: 'Tomador',
    icon: Users,
    submenus: [
      { id: '/cadastrar-tomador', label: 'Cadastrar', icon: ChevronRight },
      { id: '/cancelamentos', label: 'Cancelamentos', icon: ChevronRight }
    ]
  },
  {
    id: '/guia',
    label: 'Guia',
    icon: Calculator,
    submenus: [
      { id: '/gerar', label: 'Gerar', icon: ChevronRight },
      { id: '/consulta', label: 'Consulta', icon: ChevronRight }
    ]
  },
  {
    id: '/usuario-autorizacao',
    label: 'Autorização de Usuário ',
    icon: User,
    submenus: [
      { id: '/proprio', label: 'Propor', icon: ChevronRight},
      { id: '/aceitar', label: 'Aceitar', icon: ChevronRight},
      { id: '/alterar', label: 'Alterar', icon: ChevronRight},
      { id: '/cancelar-enviada', label: 'Cancelar Enviada', icon: ChevronRight },
      { id: '/cancelar-recebida', label: 'Cancelar Recebida', icon: ChevronRight }
    ]
  },
  {
    id: '/configuracoes',
    label: 'Configurações',
    icon: Settings,
    submenus: [
      { id: '/personalizar', label: 'Personalizar', icon: ChevronRight }
    ]
  },
  { id: '/escrituracao', label: 'Escrituração', icon: ScrollText },
  {
    id: '/relatorios',
    label: 'Relatórios',
    icon: BarChart3,
    submenus: [
      { id: '/prestados', label: 'Prestados', icon: ChevronRight},
      { id: '/guandos-final', label: 'Grandes', icon: ChevronRight},
      { id: '/tomados', label: 'Tomados', icon: ChevronRight }
    ]
  },
  { id: '/avisos', label: 'Avisos', icon: AlertCircle },
  {
    id: '/regime-especial',
    label: 'Regime Especial',
    icon: List,
    submenus: [
      { id: '/notas-pendentes', label: 'Notas Pendentes', icon: ChevronRight }
    ]
  },
  {
    id: '/lote',
    label: 'Lote',
    icon: Send,
    submenus: [
      { id: '/enviar', label: 'Enviar', icon: ChevronRight },
      { id: '/consultar-lote', label: 'Consultar', icon: ChevronRight }
    ]
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const firstPath = pathname.split('/')[1]

  const [selectedItem, setSelectedItem] = useState<string>('dashboard');
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const handleLogout = () => {
    router.push('/');
  };

  useEffect(() => {
    setExpandedMenus(prev =>
      prev.includes(firstPath)
        ? prev.filter(id => id !== firstPath)
        : [...prev, firstPath]
    );
  }, []);

  return (
    <aside className="flex flex-col w-80 h-fit bg-white rounded-3xl overflow-hidden max-w-[260px]">
      <div className="flex items-center space-x-3 p-4 border-b border-gray-200/50">
        <Image
          alt="Logo"
          src="/images/logo.jpg"
          width={48}
          height={48}
          className="w-12 h-12 rounded-full"
        />
        <div className="text-sm text-primary-800">
          <div className="font-bold text-lg">NFS-e</div>
          <div className="text-sm text-gray-600 font-medium">Prefeitura de Tupaciguara</div>
        </div>
      </div>

      <nav className="px-2 py-3 space-y-2">
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