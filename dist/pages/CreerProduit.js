import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import AdminLayout from '../layouts/admin-layout';
export default function CreerProduit({ flash, categories, plateformes }) {
    const createForm = useForm({
        nom: '',
        image: null,
        description: '',
        stock: '',
        category_id: '',
        plateformes: [],
        prix_plateformes: {},
    });
    function handleCreate(e) {
        e.preventDefault();
        // Validation JS : chaque plateforme doit avoir un prix
        const missingPrice = createForm.data.plateformes.some(platId => createForm.data.prix_plateformes[platId] === undefined ||
            createForm.data.prix_plateformes[platId] === '');
        if (missingPrice) {
            alert("Merci de renseigner le prix pour chaque plateforme sélectionnée.");
            return;
        }
        createForm.post('/admin/products', {
            onSuccess: () => createForm.reset(),
        });
    }
    const [selectedImage, setSelectedImage] = useState(null);
    function onImageChange(e) {
        const file = e.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
        createForm.setData('image', file);
    }
    return (_jsxs("div", { className: "p-6 max-w-xl mx-auto", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Cr\u00E9er un nouveau produit" }), flash?.success && (_jsx("div", { className: "bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4", children: flash.success })), _jsxs("form", { onSubmit: handleCreate, className: "space-y-4 ", children: [_jsxs("div", { children: [_jsx("label", { className: "block font-medium", children: "Nom" }), _jsx("input", { type: "text", name: "nom", value: createForm.data.nom, onChange: e => createForm.setData('nom', e.target.value), className: "border rounded px-2 py-1 w-full bg-white" }), createForm.errors.nom && _jsx("div", { className: "text-red-500", children: createForm.errors.nom })] }), _jsxs("div", { children: [_jsx("label", { className: "block font-medium", children: "Image" }), selectedImage ? (_jsx("img", { src: selectedImage, alt: "Preview", className: "w-16 h-16 object-cover rounded mr-4" })) : (_jsx("div", { className: "w-16 h-16rounded mr-4" })), _jsx("input", { type: "file", name: "image", onChange: onImageChange, className: "border rounded px-2 py-1 w-full bg-white" }), createForm.errors.image && _jsx("div", { className: "text-red-500", children: createForm.errors.image })] }), _jsxs("div", { children: [_jsx("label", { className: "block font-medium", children: "Description" }), _jsx("textarea", { name: "description", value: createForm.data.description, onChange: e => createForm.setData('description', e.target.value), className: "border rounded px-2 py-1 w-full bg-white" }), createForm.errors.description && _jsx("div", { className: "text-red-500", children: createForm.errors.description })] }), _jsxs("div", { children: [_jsx("label", { className: "block font-medium", children: "Stock" }), _jsx("input", { type: "number", name: "stock", value: createForm.data.stock, onChange: e => createForm.setData('stock', e.target.value), className: "border rounded px-2 py-1 w-full bg-white" }), createForm.errors.stock && _jsx("div", { className: "text-red-500", children: createForm.errors.stock })] }), _jsxs("div", { children: [_jsx("label", { className: "block font-medium", children: "Cat\u00E9gorie" }), _jsxs("select", { name: "category_id", className: "border rounded px-2 py-1 w-full bg-white", value: createForm.data.category_id, onChange: e => createForm.setData('category_id', e.target.value), children: [_jsx("option", { value: "", children: "S\u00E9lectionnez une cat\u00E9gorie" }), categories.map((cat, idx) => (_jsx("option", { value: cat.id, children: cat.nom }, idx)))] }), createForm.errors.category_id && _jsx("div", { className: "text-red-500", children: createForm.errors.category_id })] }), _jsxs("div", { children: [_jsx("label", { className: "block font-medium", children: "Plateformes" }), _jsx("select", { name: "plateformes", className: "border rounded px-2 py-1 w-full bg-white", value: createForm.data.plateformes, onChange: e => {
                                    const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
                                    createForm.setData('plateformes', options);
                                    // Nettoie les prix des plateformes non sélectionnées
                                    const newPrix = { ...createForm.data.prix_plateformes };
                                    Object.keys(newPrix).forEach(id => {
                                        if (!options.includes(id))
                                            delete newPrix[id];
                                    });
                                    createForm.setData('prix_plateformes', newPrix);
                                }, multiple: true, children: plateformes.map((plat, idx) => (_jsx("option", { value: plat.id, children: plat.nom }, idx))) }), createForm.errors.plateformes && _jsx("div", { className: "text-red-500", children: createForm.errors.plateformes })] }), createForm.data.plateformes.length > 0 && (_jsxs("div", { children: [_jsx("label", { className: "block font-medium mb-1", children: "Prix par plateforme" }), createForm.data.plateformes.map(platId => {
                                const plat = plateformes.find(p => String(p.id) === String(platId));
                                return (_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("span", { className: "w-32", children: plat?.nom }), _jsx("input", { type: "number", min: "0", step: "0.01", className: "border rounded px-2 py-1 w-full bg-white", value: createForm.data.prix_plateformes[platId] || '', onChange: e => createForm.setData('prix_plateformes', {
                                                ...createForm.data.prix_plateformes,
                                                [platId]: e.target.value === '' ? '' : parseFloat(e.target.value)
                                            }), placeholder: `Prix pour ${plat?.nom}` })] }, platId));
                            }), createForm.errors.prix_plateformes && _jsx("div", { className: "text-red-500", children: createForm.errors.prix_plateformes })] })), _jsx("button", { type: "submit", className: "bg-blue-600 text-white px-4 py-2 rounded", disabled: createForm.processing, children: createForm.processing ? 'Création...' : 'Ajouter' })] })] }));
}
// Correction de la déclaration du layout
CreerProduit.layout = page => _jsx(AdminLayout, { children: page });
