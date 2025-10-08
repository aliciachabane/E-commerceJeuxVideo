import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { usePage, } from '@inertiajs/react';
import AdminLayout from '../layouts/admin-layout';
export default function Dashboard() {
    const { users, produits, commandes, stocks } = usePage().props;
    return (_jsxs("div", { children: [_jsx("div", { className: "flex justify-end mb-6" }), _jsx("h1", { className: "text-3xl font-bold mb-8 text-gray-800", children: "Tableau de bord administrateur" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [_jsx(StatCard, { label: "Utilisateurs inscrits", value: users }), _jsx(StatCard, { label: "Produits en vente", value: produits }), _jsx(StatCard, { label: "Commandes/Achats", value: commandes })] }), _jsxs("div", { className: "mt-8", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Stocks des produits" }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "min-w-full bg-white/80 rounded-xl shadow", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-2", children: "Image" }), _jsx("th", { className: "px-4 py-2", children: "Nom" }), _jsx("th", { className: "px-4 py-2", children: "Stock" })] }) }), _jsx("tbody", { children: stocks && stocks.length > 0 ? (stocks.map(product => (_jsxs("tr", { className: product.stock === 0 ? "bg-red-200" : "", children: [_jsx("td", { className: "px-4 py-2", children: product.image && (_jsx("img", { src: `/produits/${product.image}`, alt: product.nom, width: 60 })) }), _jsx("td", { className: "px-4 py-2", children: product.nom }), _jsx("td", { className: "px-4 py-2 font-bold", children: product.stock === 0
                                                    ? _jsx("span", { className: "text-red-600", children: "Rupture" })
                                                    : product.stock })] }, product.id)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 3, className: "text-center py-4", children: "Aucun produit trouv\u00E9." }) })) })] }) })] })] }));
}
function StatCard({ label, value }) {
    return (_jsxs("div", { className: "bg-white/80 rounded-xl p-6 shadow flex flex-col items-center", children: [_jsx("div", { className: "text-3xl font-bold text-red-500", children: value }), _jsx("div", { className: "mt-2 text-gray-700 font-semibold", children: label })] }));
}
Dashboard.layout = page => _jsx(AdminLayout, { children: page });
