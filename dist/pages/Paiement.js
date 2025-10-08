import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Inertia } from '@inertiajs/inertia';
import { usePage, Head } from '@inertiajs/react';
import { useState } from 'react';
export default function Paiement() {
    const { panier, total } = usePage().props;
    // État pour les champs du formulaire
    const [form, setForm] = useState({
        prenom: '',
        nom: '',
        adresse: '',
        ville: '',
        code_postal: '',
        telephone: '',
        carte: '',
    });
    // Fonction pour mettre à jour les champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };
    // Fonction pour soumettre la commande
    const handleConfirmerCommande = () => {
        Inertia.post(route('paiement.valider'), form, {
            onSuccess: () => {
                // Redirige vers la page des commandes après succès
                Inertia.visit(route('commandes.mes'));
            },
            onError: (errors) => {
                // Gère les erreurs éventuelles (par exemple, formulaire incomplet)
                console.error(errors);
            }
        });
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-100 p-6", children: [_jsx(Head, { title: "Confirmation de commande" }), _jsxs("div", { className: "max-w-3xl mx-auto bg-white shadow rounded p-6", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Confirmation de votre commande" }), _jsx("ul", { className: "divide-y", children: panier.map((item) => (_jsxs("li", { className: "py-2 flex justify-between items-center", children: [_jsxs("span", { children: [item.produit.nom, " x ", item.quantite] }), _jsxs("span", { children: [(item.quantite * item.prix).toFixed(2), " \u20AC"] })] }, item.id))) }), _jsxs("div", { className: "mt-4 text-right font-bold text-xl", children: ["Total : ", total.toFixed(2), " \u20AC"] }), _jsxs("div", { className: "mt-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Informations de livraison" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "prenom", className: "block font-medium", children: "Prenom" }), _jsx("input", { type: "text", id: "prenom", name: "prenom", value: form.prenom, onChange: handleChange, className: "w-full p-2 border border-gray-300 rounded", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "nom", className: "block font-medium", children: "Nom" }), _jsx("input", { type: "text", id: "nom", name: "nom", value: form.nom, onChange: handleChange, className: "w-full p-2 border border-gray-300 rounded", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "adresse", className: "block font-medium", children: "Adresse" }), _jsx("input", { type: "text", id: "adresse", name: "adresse", value: form.adresse, onChange: handleChange, className: "w-full p-2 border border-gray-300 rounded", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "ville", className: "block font-medium", children: "Ville" }), _jsx("input", { type: "text", id: "ville", name: "ville", value: form.ville, onChange: handleChange, className: "w-full p-2 border border-gray-300 rounded", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "code_postal", className: "block font-medium", children: "Code postal" }), _jsx("input", { type: "text", id: "code_postal", name: "code_postal", value: form.code_postal, onChange: handleChange, className: "w-full p-2 border border-gray-300 rounded", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "telephone", className: "block font-medium", children: "T\u00E9l\u00E9phone" }), _jsx("input", { type: "text", id: "telephone", name: "telephone", value: form.telephone, onChange: handleChange, className: "w-full p-2 border border-gray-300 rounded", required: true }), _jsxs("div", { children: [_jsx("label", { htmlFor: "carte", className: "block font-medium", children: "Num\u00E9ro de carte (simulation)" }), _jsx("input", { type: "text", id: "carte", name: "carte", value: form.carte || '', onChange: handleChange, className: "w-full p-2 border border-gray-300 rounded", placeholder: "1234 5678 9012 3456" })] })] })] })] }), _jsx("button", { onClick: handleConfirmerCommande, className: "mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded", children: "Confirmer et valider la commande" })] })] }));
}
