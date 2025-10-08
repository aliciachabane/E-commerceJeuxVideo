import React, { useState } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import AdminLayout from '../layouts/admin-layout';

export default function GererLesUtilisateurs() {
  const { users, flash } = usePage().props;
  const [editId, setEditId] = useState(null);

  // Formulaire d'édition
  const editForm = useForm({
    id: null,
    name: '',
    email: '',
    role: '',
  });

  // Préparer édition
  function startEdit(user) {
    setEditId(user.id);
    editForm.setData({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  }

  // Soumission édition
  function handleEdit(e) {
    e.preventDefault();
    editForm.put(`/admin/user/${editForm.data.id}`, {
      onSuccess: () => {
        setEditId(null);
        editForm.reset();
      }
    });
  }

  // Suppression
  function handleDelete(id) {
    if (confirm('Supprimer cet utilisateur ?')) {
      router.delete(`/admin/user/${id}`);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestion des utilisateurs</h1>

      {flash?.success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-6">
          {flash.success}
        </div>
      )}

      <div className="flex flex-col gap-6">
        {users && users.length > 0 ? (
          users.map(user => (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row md:items-center md:justify-between"
            >
              {editId === user.id ? (
                <form onSubmit={handleEdit} className="flex flex-col md:flex-row md:items-center gap-4 w-full">
                  <input
                    className="border rounded px-3 py-2"
                    value={editForm.data.name}
                    onChange={e => editForm.setData('name', e.target.value)}
                    placeholder="Nom"
                  />
                  {editForm.errors.name && <div className="text-red-500">{editForm.errors.name}</div>}

                  <input
                    className="border rounded px-3 py-2"
                    value={editForm.data.email}
                    onChange={e => editForm.setData('email', e.target.value)}
                    placeholder="Email"
                  />
                  {editForm.errors.email && <div className="text-red-500">{editForm.errors.email}</div>}

                  <input
                    className="border rounded px-3 py-2"
                    value={editForm.data.role}
                    onChange={e => editForm.setData('role', e.target.value)}
                    placeholder="Rôle"
                  />
                  {editForm.errors.role && <div className="text-red-500">{editForm.errors.role}</div>}

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
                    <div className="font-bold text-lg">{user.name}</div>
                    <div className="text-gray-600">{user.email}</div>
                    <div className="text-sm text-gray-500">Rôle : {user.role}</div>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <button
                      onClick={() => startEdit(user)}
                      className="bg-yellow-400 text-white px-4 py-2 rounded"
                      type="button"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
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
          <div className="text-center text-gray-500">Aucun utilisateur trouvé.</div>
        )}
      </div>
    </div>
  );
}

GererLesUtilisateurs.layout = page => <AdminLayout>{page}</AdminLayout>;
