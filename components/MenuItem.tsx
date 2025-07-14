'use client';

import {ChevronDown, ChevronRight, Dot} from "lucide-react";
import {Dispatch, SetStateAction, useEffect} from "react";
import {Item, Submenu} from "@/types/MenuItem";
import {usePathname, useRouter} from "next/navigation";

interface MenuItemProps {
  item: Item,
  selectedItem: string,
  setSelectedItem(value: string | ((prev: string) => string)): void,
  expandedMenu: string,
  setExpandedMenu(value: string | ((prev: string) => string)): void
}

export default function MenuItem({
  item,
  selectedItem,
  setSelectedItem,
  expandedMenu,
  setExpandedMenu
}: MenuItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const hasSubmenu = item.submenus && item.submenus.length > 0;
  const isExpanded = expandedMenu == item.id

  const toggleMenu = () => {
    setExpandedMenu(prev => prev === item.id ? '' : item.id);
  };

  const handleNavigate = (id: string) => {
    setSelectedItem(id);
    router.push(id);
  }

  return (
    <div className="flex flex-col">
      <button
        onClick={() => hasSubmenu ? toggleMenu() : handleNavigate(item.id)}
        style={{width: "calc(100% - 1.5rem)"}}
        className={`w-full flex items-center justify-between px-4 py-3 mx-3 rounded-full transition-all duration-300 ${
          pathname === item.id
            ? 'bg-accent text-white text'
            : 'text-gray-700 hover:bg-accent-100 hover:text-accent'
        } `}
      >
        <div className="flex items-center space-x-4">
          <item.icon className="w-5 h-5"/>
          <span className="text-sm font-medium">{item.label}</span>
        </div>
        {hasSubmenu && (
          <ChevronDown
            className={`w-4 h-4 ml-auto transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : 'rotate-0'
            }`}
          />
        )}
      </button>

      <div
        className={
          `overflow-hidden px-3 transition-all duration-300
            ${(hasSubmenu && isExpanded) ? "h-fit border-y border-gray-200/50 space-y-2 py-2 mt-2 " : "max-h-0"}
        `}
      >
        {item.submenus?.map((submenu: Submenu, index: number) => (
          <button
            key={index}
            onClick={() => handleNavigate(item.id + submenu.id)}
            className={`w-full flex items-center px-4 py-3 rounded-full transition-all duration-300 ${
              pathname === item.id + submenu.id
                ? 'bg-accent text-white text'
                : 'text-gray-700 hover:bg-accent-100 hover:text-accent'
            } `}
          >
            <div className="flex items-center space-x-3 mr-4">
              <submenu.icon className="w-4 h-4"/>
              <span className="text-sm font-medium">{submenu.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

