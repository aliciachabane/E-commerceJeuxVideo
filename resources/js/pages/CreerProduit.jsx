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
    const missingPrice = createForm.data.plateformes.some(
      platId => createForm.data.prix_plateformes[platId] === undefined ||
        createForm.data.prix_plateformes[platId] === ''
    );
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

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-black">Créer un nouveau produit</h1>
      {flash?.success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
          {flash.success}
        </div>
      )}
      <form onSubmit={handleCreate} className="space-y-4 ">
        {/* Champ Nom */}
        <div>
          <label className="block font-medium">Nom</label>
          <input
            type="text"
            name="nom"
            value={createForm.data.nom}
            onChange={e => createForm.setData('nom', e.target.value)}
            className="border rounded px-2 py-1 w-full bg-white"
          />
          {createForm.errors.nom && <div className="text-red-500">{createForm.errors.nom}</div>}
        </div>

       <div>
  <label className="block font-medium">Image</label>
  {selectedImage ? (
    <img src={selectedImage} alt="Preview" className="w-16 h-16 object-cover rounded mr-4" />
  ) : (
    <div className="w-16 h-16rounded mr-4"></div>
  )}
  <input
    type="file"
    name="image"
    onChange={onImageChange}
    className="border rounded px-2 py-1 w-full bg-white"
  />
  {createForm.errors.image && <div className="text-red-500">{createForm.errors.image}</div>}
</div>
      
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={createForm.data.description}
            onChange={e => createForm.setData('description', e.target.value)}
            className="border rounded px-2 py-1 w-full bg-white"
          />
          {createForm.errors.description && <div className="text-red-500">{createForm.errors.description}</div>}
        </div>

        <div>
          <label className="block font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            value={createForm.data.stock}
            onChange={e => createForm.setData('stock', e.target.value)}
            className="border rounded px-2 py-1 w-full bg-white"
          />
          {createForm.errors.stock && <div className="text-red-500">{createForm.errors.stock}</div>}
        </div>

        <div>
          <label className="block font-medium">Catégorie</label>
          <select
            name="category_id"
            className="border rounded px-2 py-1 w-full bg-white"
            value={createForm.data.category_id}
            onChange={e => createForm.setData('category_id', e.target.value)}
          >
            <option value="">Sélectionnez une catégorie</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat.id}>{cat.nom}</option>
            ))}
          </select>
          {createForm.errors.category_id && <div className="text-red-500">{createForm.errors.category_id}</div>}
        </div>

        <div>
          <label className="block font-medium">Plateformes</label>
          <select
            name="plateformes"
            className="border rounded px-2 py-1 w-full bg-white"
            value={createForm.data.plateformes}
            onChange={e => {
              const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
              createForm.setData('plateformes', options);

              // Nettoie les prix des plateformes non sélectionnées
              const newPrix = { ...createForm.data.prix_plateformes };
              Object.keys(newPrix).forEach(id => {
                if (!options.includes(id)) delete newPrix[id];
              });
              createForm.setData('prix_plateformes', newPrix);
            }}
            multiple
          >
            {plateformes.map((plat, idx) => (
              <option key={idx} value={plat.id}>{plat.nom}</option>
            ))}
          </select>
          {createForm.errors.plateformes && <div className="text-red-500">{createForm.errors.plateformes}</div>}
        </div>

        {createForm.data.plateformes.length > 0 && (
          <div>
            <label className="block font-medium mb-1">Prix par plateforme</label>
            {createForm.data.plateformes.map(platId => {
              const plat = plateformes.find(p => String(p.id) === String(platId));
              return (
                <div key={platId} className="flex items-center gap-2 mb-2">
                  <span className="w-32">{plat?.nom}</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="border rounded px-2 py-1 w-full bg-white"
                    value={createForm.data.prix_plateformes[platId] || ''}
                    onChange={e =>
                      createForm.setData('prix_plateformes', {
                        ...createForm.data.prix_plateformes,
                        [platId]: e.target.value === '' ? '' : parseFloat(e.target.value)
                      })
                    }
                    placeholder={`Prix pour ${plat?.nom}`}
                  />
                </div>
              );
            })}
            {createForm.errors.prix_plateformes && <div className="text-red-500">{createForm.errors.prix_plateformes}</div>}
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={createForm.processing}>
          {createForm.processing ? 'Création...' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
}

// Correction de la déclaration du layout
CreerProduit.layout = page => <AdminLayout>{page}</AdminLayout>;