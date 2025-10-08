import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from '@/components/ui/sidebar';
import { usePage } from '@inertiajs/react';
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
    return (_jsxs("div", { children: [_jsx("nav", { className: "w-[70%] sm:w-[80%] max-w-5xl mx-auto bg-gradient-to-l from-white to-transparent backdrop-blur-md shadow-sm rounded-[40px] mt-10 sm:mt-12", children: _jsxs("div", { className: "max-w-7xl mx-auto flex items-center px-4 py-2 ", children: [_jsxs(SidebarGroup, { className: "flex-1", children: [_jsx(SidebarGroupLabel, { className: "sr-only", children: "Platform" }), _jsx(SidebarMenu, { className: "flex flex-row items-center gap-4", children: items.map((item) => (_jsx(SidebarMenuItem, { className: "flex-shrink-0 text-white", children: _jsx(SidebarMenuButton, { asChild: true, isActive: item.url === page.url, className: "flex items-center bg-neutral-600", children: _jsxs("button", { type: "button", onClick: () => onPlatformClick(item.title), className: "flex items-center px-3 py-2 rounded hover:bg-white/10 transition", children: [item.icon && _jsx(item.icon, { className: "mr-2 w-4 h-4" }), _jsx("span", { children: item.title })] }) }) }, item.title))) })] }), _jsxs("div", { className: "ml-6 flex-shrink-0 relative", children: [!showInput && (_jsx("button", { type: "button", className: "p-2 rounded-full hover:bg-neutral-200 transition", onClick: () => setShowInput(true), "aria-label": "Afficher la recherche", children: _jsx(FiSearch, { className: "w-5 h-5 text-red-400" }) })), showInput && (_jsx("form", { onSubmit: e => {
                                        e.preventDefault();
                                        onSearch(searchValue);
                                        setShowInput(false);
                                        setSearchValue("");
                                    }, children: _jsx("input", { ref: inputRef, type: "text", value: searchValue, onChange: e => setSearchValue(e.target.value), className: "absolute right-0 top-0 px-3 py-2 bg-amber-500 rounded border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-red-500 transition", placeholder: "Rechercher un produit...", style: { width: 200, zIndex: 10 } }) }))] })] }) }), results.length > 0 && (_jsx("div", { className: "w-[80%] max-w-5xl mx-auto mt-2 bg-white rounded shadow p-4", children: _jsx("ul", { children: results.map(product => (_jsx("li", { className: "py-1 border-b last:border-0", children: product.name }, product.id))) }) }))] }));
}
