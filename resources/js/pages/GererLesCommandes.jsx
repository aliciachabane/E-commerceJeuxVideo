import React, { useState } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import AdminLayout from '../layouts/admin-layout';

export default function GererLesCommandes() {
  const { commandes, flash } = usePage().props;
  const [editId, setEditId] = useState(null);

  // Formulaire d'édition
  const editForm = useForm({
    id: null,
    use_id: '',
    commande_id: '',
    prenom: '',
    nom: '',
    adresse: '',
    ville: '',
    code_postal: '',
    telephone: '',
    statut: '',
    total: '',
  });

  // Préparer édition
  function startEdit(commande) {
    setEditId(commande.id);
    editForm.setData({
      id: commande.id,
      use_id: commande.use_id,
      commande_id: commande.commande_id,
      prenom: commande.prenom,
      nom: commande.nom,
      adresse: commande.adresse,
      ville: commande.ville,
      code_postal: commande.code_postal,
      telephone: commande.telephone,
      statut: commande.statut,
      total: commande.total,
    });
  }

  // Soumission édition
  function handleEdit(e) {
    e.preventDefault();
    editForm.put(`/admin/commandes/${editForm.data.id}`, {
      onSuccess: () => {
        setEditId(null);
        editForm.reset();
      }
    });
  }

  // Suppression
  function handleDelete(id) {
    if (confirm('Supprimer cette commande ?')) {
      router.delete(`/admin/commandes/${id}`);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestion des commandes</h1>

      {flash?.success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-6">
          {flash.success}
        </div>
      )}

      <div className="flex flex-col gap-6">
        {commandes && commandes.length > 0 ? (
          commandes.map(commande => (
            <div
              key={commande.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row md:items-center md:justify-between"
            >
              {editId === commande.id ? (
                <form onSubmit={handleEdit} className="flex flex-col md:flex-row md:items-center gap-4 w-full">
                  <input
                    className="border rounded px-3 py-2"
                    value={editForm.data.prenom}
                    onChange={e => editForm.setData('prenom', e.target.value)}
                    placeholder="Prénom"
                  />
                  {editForm.errors.prenom && <div className="text-red-500">{editForm.errors.prenom}</div>}

                  <input
                    className="border rounded px-3 py-2"
                    value={editForm.data.nom}
                    onChange={e => editForm.setData('nom', e.target.value)}
                    placeholder="Nom"
                  />
                  {editForm.errors.nom && <div className="text-red-500">{editForm.errors.nom}</div>}

                  <input
                    className="border rounded px-3 py-2"
                    value={editForm.data.adresse}
                    onChange={e => editForm.setData('adresse', e.target.value)}
                    placeholder="Adresse"
                  />
                  {editForm.errors.adresse && <div className="text-red-500">{editForm.errors.adresse}</div>}

                  <input
                    className="border rounded px-3 py-2"
                    value={editForm.data.ville}
                    onChange={e => editForm.setData('ville', e.target.value)}
                    placeholder="Ville"
                  />
                  {editForm.errors.ville && <div className="text-red-500">{editForm.errors.ville}</div>}

                  <input
                    className="border rounded px-3 py-2"
                    value={editForm.data.code_postal}
                    onChange={e => editForm.setData('code_postal', e.target.value)}
                    placeholder="Code postal"
                  />
                  {editForm.errors.code_postal && <div className="text-red-500">{editForm.errors.code_postal}</div>}

                  <input
                    className="border rounded px-3 py-2"
                    value={editForm.data.telephone}
                    onChange={e => editForm.setData('telephone', e.target.value)}
                    placeholder="Téléphone"
                  />
                  {editForm.errors.telephone && <div className="text-red-500">{editForm.errors.telephone}</div>}

                  <input
                    className="border rounded px-3 py-2"
                    value={editForm.data.statut}
                    onChange={e => editForm.setData('statut', e.target.value)}
                    placeholder="Statut"
                  />
                  {editForm.errors.statut && <div className="text-red-500">{editForm.errors.statut}</div>}

                  <input
                    className="border rounded px-3 py-2"
                    value={editForm.data.total}
                    onChange={e => editForm.setData('total', e.target.value)}
                    placeholder="Total"
                  />
                  {editForm.errors.total && <div className="text-red-500">{editForm.errors.total}</div>}

                  <div className="flex gap-2">
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
                <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
                  <div>
                    <div className="font-bold text-lg">{commande.prenom} {commande.nom}</div>
                    <div className="text-gray-600">{commande.adresse}, {commande.ville}</div>
                    <div className="text-sm text-gray-500">Code postal : {commande.code_postal}</div>
                    <div className="text-sm text-gray-500">Téléphone : {commande.telephone}</div>
                    <div className="text-sm text-gray-500">Statut : {commande.statut}</div>
                    <div className="text-sm text-gray-500">Total : {commande.total}</div>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <button
                      onClick={() => startEdit(commande)}
                      className="bg-yellow-400 text-white px-4 py-2 rounded"
                      type="button"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(commande.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      type="button"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">Aucune commande trouvée.</div>
        )}
      </div>
    </div>
  );
}

GererLesCommandes.layout = page => <AdminLayout>{page}</AdminLayout>;
