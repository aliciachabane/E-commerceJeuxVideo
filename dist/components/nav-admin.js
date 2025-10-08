import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { UserInfo } from '@/components/user-info';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePage, router, Link } from '@inertiajs/react';
export function NavAdmin() {
    const { auth } = usePage().props;
    const { state } = useSidebar();
    const isMobile = useIsMobile();
    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout');
    };
    return (_jsx(SidebarMenu, { children: _jsx(SidebarMenuItem, { children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(SidebarMenuButton, { size: "lg", className: "text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent group", children: _jsx(UserInfo, { user: auth.user }) }) }), _jsx(DropdownMenuContent, { className: "min-w-56 rounded-lg", align: "end", side: isMobile ? 'bottom' : state === 'collapsed' ? 'left' : 'bottom', children: _jsxs("div", { className: "border-t mt-2 pt-2", children: [_jsx("div", { className: "block px-4 py-2 hover:bg-gray-100 rounded", children: "Tableau de bord admin" }), _jsx(Link, { href: "/admin/products", className: "block px-4 py-2 hover:bg-gray-100 rounded", children: "Gere les produits" }), _jsx(Link, { href: "/admin/store", className: "block px-4 py-2 hover:bg-gray-100 rounded", children: "Cr\u00E9er des Produits" }), _jsx("button", { onClick: handleLogout, className: "block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100 rounded", children: "D\u00E9connexion" })] }) })] }) }) }));
}
