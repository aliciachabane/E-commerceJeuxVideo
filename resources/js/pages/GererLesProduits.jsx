import React, { useState } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import AdminLayout from '../layouts/admin-layout';

export default function GererLesProduits() {
  const { produits, flash } = usePage().props;
  const [editId, setEditId] = useState(null);

  const editForm = useForm({
    id: null,
    nom: '',
    image: '',
    description: '',
    prix: '',
    stock: '',
  });

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

  function handleEdit(e) {
    e.preventDefault();
    editForm.put(`/admin/products/${editForm.data.id}`, {
      onSuccess: () => {
        setEditId(null);
        editForm.reset();
      }
    });
  }

  function handleDelete(id) {
    if (confirm('Supprimer ce produit ?')) {
      router.delete(`/admin/products/${id}`);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestion des produits</h1>

      {flash?.success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-6">
          {flash.success}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produits && produits.length > 0 ? (
          produits.map(produit => (
            <div
              key={produit.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col"
            >
              {editId === produit.id ? (
                <form onSubmit={handleEdit} className="flex flex-col gap-3">
                  <input
                    type="text"
                    className="border rounded px-3 py-2"
                    value={editForm.data.nom}
                    onChange={e => editForm.setData('nom', e.target.value)}
                    placeholder="Nom"
                  />
                  {editForm.errors.nom && <div className="text-red-500">{editForm.errors.nom}</div>}

                  <input
                    type="text"
                    className="border rounded px-3 py-2"
                    value={editForm.data.image}
                    onChange={e => editForm.setData('image', e.target.value)}
                    placeholder="URL Image"
                  />
                  {editForm.errors.image && <div className="text-red-500">{editForm.errors.image}</div>}

                  <textarea
                    className="border rounded px-3 py-2"
                    value={editForm.data.description}
                    onChange={e => editForm.setData('description', e.target.value)}
                    placeholder="Description"
                  />
                  {editForm.errors.description && <div className="text-red-500">{editForm.errors.description}</div>}

                  <input
                    type="number"
                    className="border rounded px-3 py-2"
                    value={editForm.data.prix}
                    onChange={e => editForm.setData('prix', e.target.value)}
                    placeholder="Prix"
                  />
                  {editForm.errors.prix && <div className="text-red-500">{editForm.errors.prix}</div>}

                  <input
                    type="number"
                    className="border rounded px-3 py-2"
                    value={editForm.data.stock}
                    onChange={e => editForm.setData('stock', e.target.value)}
                    placeholder="Stock"
                  />
                  {editForm.errors.stock && <div className="text-red-500">{editForm.errors.stock}</div>}

                  <div className="flex gap-3 mt-2">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded"
                      disabled={editForm.processing}
                    >
                      Sauver
                    </button>
                    <button
                      type="button"
                      className="bg-gray-400 text-white px-4 py-2 rounded"
                      onClick={() => setEditId(null)}
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  {produit.image && (
                    <img
                      src={`/produits/${produit.image}`}
                      alt={produit.nom}
                      className="h-40 w-full object-cover rounded mb-4"
                    />
                  )}
                  <h2 className="text-xl font-semibold mb-2">{produit.nom}</h2>
                  <p className="text-gray-600 mb-3 flex-grow">{produit.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold">{Number(produit.prix).toFixed(2)} €</span>
                    <span className="text-sm text-gray-500">Stock: {produit.stock}</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => startEdit(produit)}
                      className="bg-yellow-400 text-white px-4 py-2 rounded"
                      type="button"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(produit.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      type="button"
                    >
                      Supprimer
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">Aucun produit trouvé.</p>
        )}
      </div>
    </div>
  );
}

GererLesProduits.layout = page => <AdminLayout>{page}</AdminLayout>;
