'use client';

import {
  AlertCircle,
  BarChart3,
  Check,
  CheckCheck,
  CheckCircle,
  CircleOff,
  Clock,
  FileClock,
  FileText,
  Home,
  LayoutList,
  LogOut,
  MessageCircleOff,
  MessageCircleX,
  PlusSquare,
  ReceiptText,
  Repeat,
  ScrollText,
  Search,
  Send,
  SendHorizontal,
  Settings,
  Sparkle,
  SquarePen,
  UserLock,
  UsersRound
} from 'lucide-react';
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {usePathname, useRouter} from "next/navigation";
import {Item} from "@/types/MenuItem";
import MenuItem from "@/components/MenuItem";
import Image from "next/image";

const menuItems: Item[] = [
  {id: '/tela-inicial', label: 'Tela Inicial', icon: Home},
  {
    id: '/nota-fiscal',
    label: 'Nota Fiscal',
    icon: ReceiptText,
    submenus: [
      {id: '/emitir', label: 'Emitir', icon: PlusSquare},
      {id: '/cancelar', label: 'Cancelar', icon: CircleOff},
      {id: '/reemitir', label: 'Reemitir', icon: Repeat},
      {id: '/guia-fiscal', label: 'Guia Fiscal', icon: FileText},
      {id: '/personalizar', label: 'Personalizar', icon: SquarePen}
    ]
  },
  {
    id: '/nota-cancelada',
    label: 'Nota Cancelada',
    icon: CircleOff,
    submenus: [
      {id: '/consultar-cancelada', label: 'Consultar', icon: Search},
      {id: '/pendentes', label: 'Pendentes', icon: Clock}
    ]
  },
  {id: '/consulta', label: 'Consulta', icon: Search},
  {
    id: '/tomador',
    label: 'Tomador',
    icon: UsersRound,
    submenus: [
      {id: '/cadastrar-tomador', label: 'Cadastrar', icon: PlusSquare},
      {id: '/cancelamentos', label: 'Cancelamentos', icon: CircleOff}
    ]
  },
  {
    id: '/guia',
    label: 'Guia',
    icon: FileText,
    submenus: [
      {id: '/gerar', label: 'Gerar', icon: PlusSquare},
      {id: '/consulta', label: 'Consulta', icon: Search}
    ]
  },
  {
    id: '/autorizacao-usuario',
    label: 'Autorização de Usuário ',
    icon: UserLock,
    submenus: [
      {id: '/propor', label: 'Propor', icon: SendHorizontal},
      {id: '/aceitar', label: 'Aceitar', icon: CheckCircle},
      {id: '/alterar', label: 'Alterar', icon: SquarePen},
      {id: '/cancelar-enviada', label: 'Cancelar Enviada', icon: MessageCircleX},
      {id: '/cancelar-recebida', label: 'Cancelar Recebida', icon: MessageCircleOff}
    ]
  },
  {id: '/escrituracao', label: 'Escrituração', icon: ScrollText},
  {
    id: '/relatorios',
    label: 'Relatórios',
    icon: BarChart3,
    submenus: [
      {id: '/prestados', label: 'Prestados', icon: Check},
      {id: '/grandes', label: 'Grandes', icon: LayoutList},
      {id: '/tomados', label: 'Tomados', icon: CheckCheck}
    ]
  },
  {id: '/avisos', label: 'Avisos', icon: AlertCircle},
  {
    id: '/regime-especial',
    label: 'Regime Especial',
    icon: Sparkle,
    submenus: [
      {id: '/notas-pendentes', label: 'Notas Pendentes', icon: FileClock}
    ]
  },
  {
    id: '/lote',
    label: 'Lote',
    icon: Send,
    submenus: [
      {id: '/enviar', label: 'Enviar', icon: SendHorizontal},
      {id: '/consultar-lote', label: 'Consultar', icon: Search}
    ]
  },
  {
    id: '/configuracoes',
    label: 'Configurações',
    icon: Settings,
    submenus: [
      {id: '/personalizar', label: 'Personalizar', icon: SquarePen}
    ]
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const firstPath = pathname.split('/')[1]

  const [selectedItem, setSelectedItem] = useState<string>('tela-inicial');
  const [expandedMenu, setExpandedMenu] = useState<string>('');

  const handleLogout = () => {
    router.push('/');
  };

  useEffect(() => {
    setExpandedMenu(firstPath);
  }, []);

  return (
    <div className="flex flex-col fixed h-screen overflow-hidden min-w-[360px] bg-white shadow-md z-10">
      <CardHeader className="flex items-center space-x-3 p-6 border-b border-gray-200/50">
        <Image
          alt="Logo"
          src="/images/logo.png"
          width={2196}
          height={803}
          className="w-auto h-10 mx-auto rounded-full"
        />
      </CardHeader>
      <CardContent role="navigation" className="py-3 space-y-3">
        {menuItems.map((item: Item, index: number) =>
          <MenuItem
            key={index}
            item={item}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            expandedMenu={expandedMenu}
            setExpandedMenu={setExpandedMenu}
          />
        )}
      </CardContent>
      <CardFooter className="border-t border-gray-200/50 w-full hover:border-red-50 px-3 py-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="w-full rounded-full hover:bg-red-50 hover:text-red-600 transition-colors space-x-2 p-6"
        >
          <LogOut className="w-4 h-4"/>
          <span>Sair</span>
        </Button>
      </CardFooter>
    </div>
  );
};