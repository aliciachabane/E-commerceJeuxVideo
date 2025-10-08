import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { usePage, Head } from '@inertiajs/react';
export default function MesCommandes() {
    const { commandes } = usePage().props; // Récupère les commandes envoyées depuis le contrôleur
    return (_jsxs("div", { className: "p-6 bg-gray-100 min-h-screen", children: [_jsx(Head, { title: "Mes Commandes" }), _jsx("h1", { className: "text-2xl font-bold mb-4", children: "Mes Commandes" }), commandes.length === 0 ? (_jsx("p", { children: "Aucune commande pour le moment." })) : (commandes.map((commande) => (_jsxs("div", { className: "mb-6 p-4 bg-white rounded shadow", children: [_jsxs("h2", { className: "font-semibold", children: ["Commande #", commande.id, " - ", commande.created_at] }), _jsxs("p", { children: ["Total : ", commande.total, " \u20AC"] }), " ", _jsx("ul", { className: "mt-2 list-disc list-inside", children: commande.detailCommandes && commande.detailCommandes.map((detail) => (_jsxs("li", { children: [detail.produit ? detail.produit.nom : 'Produit inconnu', " \u2014 ", detail.quantite, " \u00D7 ", detail.prix, " \u20AC"] }, detail.id))) })] }, commande.id))))] }));
}
