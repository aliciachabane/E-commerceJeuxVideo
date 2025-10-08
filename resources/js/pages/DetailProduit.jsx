import { Inertia } from '@inertiajs/inertia';
import { usePage, Head } from '@inertiajs/react';
import React, { lazy, Suspense, useState,useCallback } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function DetailProduit() {
    const { produit, prixParPlateforme } = usePage().props;

    const plateformes = Object.keys(prixParPlateforme);
    const [plateformeSelectionnee, setPlateformeSelectionnee] = useState(
        plateformes.length > 0 ? plateformes[0] : ''
    );
    const [quantite, setQuantite] = useState(1);

    const handleChange = (e) => setPlateformeSelectionnee(e.target.value);
    const handleQuantiteChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 1) setQuantite(value);
    };

    const handleAjouterAuPanier = () => {
        Inertia.post(route('panier.ajouter'), {
            produit_id: produit.id,
            prix: prixParPlateforme[plateformeSelectionnee] ?? produit.prix,
            quantite: quantite,
        }, {
            onSuccess: () => Inertia.visit(route('panier.afficher'))
        });
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-l from-red-500 to-orange-500 p-0 text-white absolute">
         
            {/* Contenu principal */}
            <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center mt-[10em] pb-10">
                <Head title={`Détail - ${produit.nom}`} />

                <div className="bg-gray-700 w-full rounded-lg shadow-lg p-6 flex flex-col items-center">
                    {plateformes.length > 1 && (
                        <select
                            className="bg-amber-100 text-center  text-black mb-4 rounded items-end"
                            value={plateformeSelectionnee}
                            onChange={handleChange}>
                            {plateformes.map((plateforme) => (
                                <option key={plateforme} value={plateforme}>
                                    {plateforme}
                                </option>
                            ))}
                        </select>
                    )}

                    <h1 className="text-2xl font-bold text-white">{produit.nom}</h1>
                     <ErrorBoundary>
                    <Suspense fallback={<div>Chargement de la description...</div>}>
                    <img
                        src={`/produits/${produit.image}`}
                        alt={produit.nom}
                        className="mt-4 w-full max-w-md rounded "/>
                 </Suspense>
                </ErrorBoundary>
                 <ErrorBoundary>
                 <Suspense fallback={<div>Chargement de la description...</div>}>  
                    <div className="bg-gray-800 text-white p-4 rounded-lg shadow mt-6 w-full">
                        <p className="mt-4">{produit.description}</p>
                    </div>
                    <p className="mt-4 font-semibold text-amber-400 text-xl">
                        {prixParPlateforme[plateformeSelectionnee] ?? produit.prix} €
                    </p>
                </Suspense> 
                </ErrorBoundary>
                    <input
                        type="number"
                        min="1"
                        value={quantite}
                        max={produit.stock}
                        onChange={handleQuantiteChange}
                        className="mt-4 px-2 py-1 rounded text-center w-20 bg-white text-black"/>

                    <button
                        onClick={handleAjouterAuPanier}
                        className="bg-amber-400 mt-4 text-black px-4 py-2 rounded">
                        Ajouter au panier
                    </button>
                </div>
            </div>
        </div>
    );
}