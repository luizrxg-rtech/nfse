import {ChevronDown, ChevronRight, Dot} from "lucide-react";
import {Dispatch, SetStateAction, useEffect} from "react";
import {Item, Submenu} from "@/types/MenuItem";
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
    <div>
      <button
        onClick={() => hasSubmenu ? toggleMenu(item.id) : handleNavigate(item.id)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
          pathname === item.id
            ? 'bg-primary-600 text-white text'
            : 'text-gray-700 hover:bg-primary-100 hover:text-accent'
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
        <div className="space-y-2 p-2 my-2 bg-gray-600/5 rounded-xl overflow-hidden transition-all duration-300">
          {item.submenus!!.map((submenu: Submenu, index: number) => (
            <button
              key={index}
              onClick={() => handleNavigate(item.id + submenu.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                pathname === item.id + submenu.id
                  ? 'bg-primary-600 text-white text'
                  : 'text-gray-700 hover:bg-primary-100 hover:text-accent'
              } `}
            >
              <div className="flex items-center space-x-4 mr-4">
                <submenu.icon className="w-5 h-5"/>
                <span className="text-sm font-medium">{submenu.label}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

