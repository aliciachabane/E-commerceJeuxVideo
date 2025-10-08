import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { NavAdmin } from '@/components/nav-admin';
import { SidebarProvider } from '@/components/ui/sidebar';
import { UserInfo } from '@/components/user-info';
import { ChevronsUpDown, Menu as MenuIcon, X as CloseIcon } from 'lucide-react';
export default function AdminLayout({ children }) {
    const { auth } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);
    return (_jsx(SidebarProvider, { children: _jsxs("div", { className: "min-h-screen w-full bg-gradient-to-b from-red-500 to-orange-500 flex flex-col relative overflow-x-hidden", children: [_jsxs("header", { className: "w-full  flex items-center justify-between px-4 py-3", children: [_jsx("div", { className: "text-white font-bold text-lg", children: "Admin" }), _jsx("button", { className: "md:hidden text-white", onClick: () => setMenuOpen(!menuOpen), "aria-label": "Ouvrir le menu", children: menuOpen ? _jsx(CloseIcon, { size: 32 }) : _jsx(MenuIcon, { size: 32 }) }), _jsxs("nav", { className: "hidden md:flex items-center gap-6", children: [_jsx(NavAdmin, {}), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(UserInfo, { user: auth.user }), _jsx(ChevronsUpDown, { className: "ml-1 size-4" })] })] })] }), menuOpen && (_jsx("div", { className: "md:hidden absolute top-0 left-0 w-full bg-white shadow-lg  animate-fade-in-down", children: _jsxs("div", { className: "flex flex-col items-center py-6 gap-4", children: [_jsx(NavAdmin, {}), _jsx("div", { className: "flex items-center gap-2" })] }) })), _jsx("main", { className: "w-full max-w-7xl mx-auto px-4 py-12", children: children })] }) }));
}
