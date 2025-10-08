import { usePage, router } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { FaTrashAlt } from "react-icons/fa";
import React, { lazy, Suspense, useState,useCallback } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";


export default function Panier() {
    const { panier } = usePage().props;

function handleDelete(id) {
    router.delete(`/panier/${id}`, {
        preserveScroll: true,
    });
}
return (
        <div className="bg-gradient-to-r to-red-500 from-orange-500 min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Votre Panier</h1>
            <div className="space-y-4">
                {panier.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded shadow-lg flex items-center space-x-4">
                        <img  src={`/produits/${item.produit.image}`} 
                         alt={item.produit.nom} 
                        className="w-24 h-24 object-cover rounded"/>
                        <div className="flex flex-col">
                            <h2 className="text-lg font-semibold">{item.produit.nom}</h2>
                            <p>Quantité: {item.quantite}</p>
                            <p>Prix Unitaire: {item.prix} €</p>
                            <p className="font-semibold">Prix Total: {item.prix_total} €</p>
                        </div>
                <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 hover:text-red-700 text-xl items-end"
                title="Supprimer l'article">
                <FaTrashAlt />
                </button>
                    </div>
               ))}
            </div>
             <ErrorBoundary>
             <Suspense fallback={<div>Chargement de la description...</div>}>
            <button 
            onClick={() => Inertia.visit(route('paiement.page'))}
            className='bg-amber-400 px-4 py-2 rounded text-white font-semibold hover:bg-amber-400'>
            Paiement
            </button>
      </Suspense>
      </ErrorBoundary>
        </div>
    );
}