import {ChevronDown, ChevronRight, Dot} from "lucide-react";
import {Dispatch, SetStateAction, useEffect} from "react";
import {Item} from "@/types/MenuItem";
import {usePathname, useRouter} from "next/navigation";

export default function MenuItem({
  item,
  selectedItem,
  setSelectedItem,
  expandedMenus,
  setExpandedMenus
}: {
  item: Item;
  selectedItem: string;
  setSelectedItem: Dispatch<SetStateAction<string>>;
  expandedMenus: string[];
  setExpandedMenus: Dispatch<SetStateAction<string[]>>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const hasSubmenu = item.submenus && item.submenus.length > 0;
  const isExpanded = expandedMenus.includes(item.id) || pathname.includes(item.id);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const handleNavigate = (id: string) => {
    setSelectedItem(id);
    router.push(id);
  }

  return (
    <div
      className={``}
      key={item.id}
    >
      <button
        onClick={() => hasSubmenu ? toggleMenu(item.id) : handleNavigate(item.id)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-full transition-all duration-300 ${
          pathname === item.id
            ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white text'
            : 'text-gray-700 hover:bg-primary-100/90 hover:text-accent'
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

      {hasSubmenu && isExpanded && (
        <div className="mt-2 p-2 space-y-2 bg-gray-50 rounded-3xl overflow-hidden transition-all duration-300">
          {item.submenus!!.map((submenu: any) => (
            <button
              onClick={() => handleNavigate(item.id + submenu.id)}
              key={submenu.id}
              className={`flex items-center w-full space-x-3 px-4 py-2 rounded-full text-gray-700 hover:bg-primary-100/90 hover:text-accent transition-all duration-200 ${
                pathname === item.id + submenu.id
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white text'
                  : 'text-gray-700 hover:bg-primary-100/90 hover:text-accent'
              } `}
            >
              <submenu.icon className="w-5 h-5"/>
              <span className="text-sm">{submenu.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

