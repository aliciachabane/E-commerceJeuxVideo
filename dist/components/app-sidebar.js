import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';
const mainNavItems = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
];
const footerNavItems = [
    {
        title: 'Repository',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        url: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];
export function AppSidebar() {
    return (_jsxs(Sidebar, { collapsible: "icon", variant: "inset", children: [_jsx(SidebarHeader, { children: _jsx(SidebarMenu, { children: _jsx(SidebarMenuItem, { children: _jsx(SidebarMenuButton, { size: "lg", asChild: true, children: _jsx(Link, { href: "/dashboard", prefetch: true, children: _jsx(AppLogo, {}) }) }) }) }) }), _jsx(SidebarContent, { children: _jsx(NavMain, { items: mainNavItems }) }), _jsxs(SidebarFooter, { children: [_jsx(NavFooter, { items: footerNavItems, className: "mt-auto" }), _jsx(NavUser, {})] })] }));
}
