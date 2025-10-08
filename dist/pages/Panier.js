import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { usePage, router } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { FaTrashAlt } from "react-icons/fa";
export default function Panier() {
    const { panier } = usePage().props;
    function handleDelete(id) {
        router.delete(`/panier/${id}`, {
            preserveScroll: true,
        });
    }
    return (_jsxs("div", { className: "bg-gradient-to-b from-red-500 to-orange-500 min-h-screen p-4", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Votre Panier" }), _jsx("div", { className: "space-y-4", children: panier.map((item) => (_jsxs("div", { className: "bg-white p-4 rounded shadow-lg flex items-center space-x-4", children: [_jsx("img", { src: `/produits/${item.produit.image}`, alt: item.produit.nom, className: "w-24 h-24 object-cover rounded" }), _jsxs("div", { className: "flex flex-col", children: [_jsx("h2", { className: "text-lg font-semibold", children: item.produit.nom }), _jsxs("p", { children: ["Quantit\u00E9: ", item.quantite] }), _jsxs("p", { children: ["Prix Unitaire: ", item.prix, " \u20AC"] }), _jsxs("p", { className: "font-semibold", children: ["Prix Total: ", item.prix_total, " \u20AC"] })] }), _jsx("button", { onClick: () => handleDelete(item.id), className: "text-red-500 hover:text-red-700 text-xl items-end", title: "Supprimer l'article", children: _jsx(FaTrashAlt, {}) })] }, item.id))) }), _jsx("button", { onClick: () => Inertia.visit(route('paiement.page')), className: 'bg-amber-400 px-4 py-2 rounded text-white font-semibold hover:bg-amber-400', children: "Paiement" })] }));
}
