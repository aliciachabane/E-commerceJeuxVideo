import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { usePage } from '@inertiajs/react';
import { NavMain } from '@/components/nav-main';
import { SidebarProvider } from '@/components/ui/sidebar';
export default function AppLayout({ children }) {
    const page = usePage();
    const platformItems = [
        { title: 'Toutes', icon: null },
        { title: 'Nintendo Switch', icon: null },
        { title: 'PlayStation', icon: null },
        { title: 'Xbox', icon: null },
        { title: 'PC', icon: null },
    ];
    const handlePlatformClick = (platform) => {
    };
    const handleSearch = (query) => {
    };
    return (_jsx(SidebarProvider, { children: _jsxs("div", { className: "bg-gradient-to-b from-red-500 to-orange-500 w-full flex-col items-center justify-center relative overflow-x-hidden", children: [_jsx("header", { className: "absolute top-10 left-0 w-full z-50", children: _jsx(NavMain, { items: platformItems, onPlatformClick: handlePlatformClick, onSearch: handleSearch }) }), _jsx("main", { className: "", children: children })] }) }));
}
