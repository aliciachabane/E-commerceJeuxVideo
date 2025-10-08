import { useState, useRef, useEffect, useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePage } from "@inertiajs/react";

export function NavMain({ items = [], onPlatformClick, onSearch, results = [] }) {
  const page = usePage();
  const [showInput, setShowInput] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  // Mémoriser les fonctions pour éviter les re-renders inutiles chez les enfants
  const handlePlatformClick = useCallback(
    (platform) => {
      if (onPlatformClick) {
        onPlatformClick(platform);
      }
    },
    [onPlatformClick]
  );

  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (onSearch && searchValue.trim() !== "") {
        onSearch(searchValue);
        setShowInput(false);
        setSearchValue("");
      }
    },
    [onSearch, searchValue]
  );

  return (
    <div>
      <nav className="w-full sm:w-[90%] max-w-5xl mx-auto bg-gradient-to-l from-white to-transparent shadow-sm rounded-[30px]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-2 gap-3">
          <SidebarGroup className="flex-1 w-full">
            <SidebarGroupLabel className="sr-only">Navigation principale</SidebarGroupLabel>
            <SidebarMenu className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="flex-shrink-0 text-white">
                  <SidebarMenuButton
                    asChild
                    isActive={item.url === page.url}
                    className="flex items-center bg-neutral-600 w-full sm:w-auto"
                  >
                    <button
                      type="button"
                      onClick={() => handlePlatformClick(item.title)}
                      className="flex items-center px-3 py-2 rounded hover:bg-white/10 transition w-full sm:w-auto justify-start sm:justify-center"
                    >
                      {item.icon && <item.icon className="mr-2 w-4 h-4 flex-shrink-0" />}
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          <div className="sm:ml-6 flex-shrink-0 relative">
            {!showInput && (
              <button
                type="button"
                className="p-2 rounded-full hover:bg-neutral-200 transition"
                onClick={() => setShowInput(true)}
                aria-label="Afficher la recherche"
              >
                <FiSearch className="w-5 h-5 text-red-400" />
              </button>
            )}
            {showInput && (
              <form onSubmit={handleSearchSubmit}>
                <input
                  ref={inputRef}
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="absolute right-0 top-0 px-3 py-2 bg-amber-500 rounded border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition w-[80vw] sm:w-[220px]"
                  placeholder="Rechercher un produit..."
                  style={{ zIndex: 10 }}
                />
              </form>
            )}
          </div>
        </div>
      </nav>

      {results.length > 0 && (
        <div className="w-full sm:w-[90%] max-w-5xl mx-auto mt-2 bg-white rounded shadow p-4">
          <ul>
            {results.map((product) => (
              <li key={product.id} className="py-2 border-b last:border-0 text-sm sm:text-base">
                {product.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
