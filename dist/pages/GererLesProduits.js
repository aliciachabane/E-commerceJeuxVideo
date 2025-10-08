import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import AdminLayout from '../layouts/admin-layout';
export default function GererLesProduits() {
    const { auth, produits, flash } = usePage().props;
    const [editId, setEditId] = useState(null);
    // Formulaire de création
    const createForm = useForm({
        nom: '',
        image: '',
        description: '',
        prix: '',
        stock: '',
    });
    // Formulaire d'édition
    const editForm = useForm({
        id: null,
        nom: '',
        image: '',
        description: '',
        prix: '',
        stock: '',
    });
    // Préparer édition
    function startEdit(produit) {
        setEditId(produit.id);
        editForm.setData({
            id: produit.id,
            nom: produit.nom,
            image: produit.image,
            description: produit.description,
            prix: produit.prix,
            stock: produit.stock,
        });
    }
    // Soumission édition
    function handleEdit(e) {
        e.preventDefault();
        editForm.put(`/admin/products/${editForm.data.id}`, {
            onSuccess: () => {
                setEditId(null);
                editForm.reset();
            }
        });
    }
    // Suppression
    function handleDelete(id) {
        if (confirm('Supprimer ce produit ?')) {
            router.delete(`/admin/products/${id}`);
        }
    }
    return (_jsxs("div", { className: "p-6", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Gestion des produits" }), flash?.success && (_jsx("div", { className: "bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4", children: flash.success })), _jsxs("table", { className: "w-full border bg-white", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "border px-2 py-1", children: "Nom" }), _jsx("th", { className: "border px-2 py-1", children: "Image" }), _jsx("th", { className: "border px-2 py-1", children: "Description" }), _jsx("th", { className: "border px-2 py-1", children: "Prix" }), _jsx("th", { className: "border px-2 py-1", children: "Stock" }), _jsx("th", { className: "border px-2 py-1", children: "Actions" })] }) }), _jsx("tbody", { children: produits && produits.length > 0 ? (produits.map(produit => (_jsx("tr", { children: editId === produit.id ? (_jsxs(_Fragment, { children: [_jsxs("td", { className: "border px-2 py-1", children: [_jsx("input", { className: "border rounded px-2 py-1", value: editForm.data.nom, onChange: e => editForm.setData('nom', e.target.value) }), editForm.errors.nom && _jsx("div", { className: "text-red-500", children: editForm.errors.nom })] }), _jsxs("td", { className: "border px-2 py-1", children: [_jsx("input", { className: "border rounded px-2 py-1", value: editForm.data.image, onChange: e => editForm.setData('image', e.target.value) }), editForm.errors.image && _jsx("div", { className: "text-red-500", children: editForm.errors.image })] }), _jsxs("td", { className: "border px-2 py-1", children: [_jsx("input", { className: "border rounded px-2 py-1", value: editForm.data.description, onChange: e => editForm.setData('description', e.target.value) }), editForm.errors.description && _jsx("div", { className: "text-red-500", children: editForm.errors.description })] }), _jsxs("td", { className: "border px-2 py-1", children: [_jsx("input", { type: "number", className: "border rounded px-2 py-1", value: editForm.data.prix, onChange: e => editForm.setData('prix', e.target.value) }), editForm.errors.prix && _jsx("div", { className: "text-red-500", children: editForm.errors.prix })] }), _jsxs("td", { className: "border px-2 py-1", children: [_jsx("input", { type: "number", className: "border rounded px-2 py-1", value: editForm.data.stock, onChange: e => editForm.setData('stock', Number(e.target.value)) }), editForm.errors.stock && _jsx("div", { className: "text-red-500", children: editForm.errors.stock })] }), _jsxs("td", { className: "border px-2 py-1 flex gap-2", children: [_jsx("button", { onClick: handleEdit, className: "bg-green-600 text-white px-2 py-1 rounded", disabled: editForm.processing, children: "Sauver" }), _jsx("button", { onClick: () => setEditId(null), className: "bg-gray-400 text-white px-2 py-1 rounded", type: "button", children: "Annuler" })] })] })) : (_jsxs(_Fragment, { children: [_jsx("td", { className: "border px-2 py-1", children: produit.nom }), _jsx("td", { className: "border px-2 py-1", children: produit.image && (_jsx("img", { src: `/produits/${produit.image}`, alt: "Image du produit", className: "h-12 w-12 object-cover rounded" })) }), _jsx("td", { className: "border px-2 py-1", children: produit.description }), _jsxs("td", { className: "border px-2 py-1", children: [Number(produit.prix).toFixed(2), " \u20AC"] }), _jsx("td", { className: "border px-2 py-1", children: produit.stock }), _jsxs("td", { className: "border px-2 py-1 flex gap-2", children: [_jsx("button", { onClick: () => startEdit(produit), className: "bg-yellow-400 text-white px-2 py-1 rounded", type: "button", children: "Modifier" }), _jsx("button", { onClick: () => handleDelete(produit.id), className: "bg-red-500 text-white px-2 py-1 rounded", type: "button", children: "Supprimer" })] })] })) }, produit.id)))) : (_jsx("tr", { children: _jsx("td", { colSpan: "6", className: "text-center py-4", children: "Aucun produit trouv\u00E9." }) })) })] })] }));
}
GererLesProduits.layout = page => _jsx(AdminLayout, { children: page });
