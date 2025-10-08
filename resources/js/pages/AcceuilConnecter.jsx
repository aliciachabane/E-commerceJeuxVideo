import { Head, usePage } from '@inertiajs/react';
import { NavMain } from '@/components/nav-main';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Gamepad2, MonitorSmartphone, Disc3, Globe } from 'lucide-react';
import { router } from '@inertiajs/react';
import NavUser from '@/components/nav-user';
import ErrorBoundary from "@/components/ErrorBoundary";
import React, { lazy, Suspense, useState,useCallback } from "react";

export default function AcceuilConnecter() {
    const { auth, produits } = usePage().props;
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [results, setResults] = useState([]);

    /** --- Recherche Produits --- **/
    async function handleSearch(query) {
        if (!query.trim()) return;
        const response = await fetch(`/recherche-produits?search=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(Array.isArray(data) ? data : data.results || data.data || []);
    }

    /** --- Mapping Plateformes --- **/
    const platformGroupMap = {
        PlayStation: ['PS4', 'PS5'],
        Xbox: ['Xbox One', 'Xbox Series X', 'Xbox Series S'],
        'Nintendo Switch': ['Nintendo Switch'],
        PC: ['PC'],
    };

    const platformItems = [
        { title: 'Toutes', icon: Globe },
        { title: 'Nintendo Switch', icon: MonitorSmartphone },
        { title: 'PlayStation', icon: Disc3 },
        { title: 'Xbox', icon: Gamepad2 },
        { title: 'PC', icon: Disc3 },
    ];

    /** --- Filtrage Produits --- **/
    const filteredProducts =
        selectedPlatform && selectedPlatform !== 'Toutes'
            ? produits.filter((produit) =>
                  produit.plateformes?.some((plateforme) =>
                      platformGroupMap[selectedPlatform]?.includes(plateforme.nom)
                  )
              )
            : produits;

    /** --- Handlers --- **/
    const handlePlatformClick = (platformName) => setSelectedPlatform(platformName);
    const handleRedirect = (url) => (window.location.href = url);
    const handleVoirPanier = () => (window.location.href = route('panier.afficher'));
    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    return (
         <SidebarProvider>
      <div className="min-h-screen relative w-full bg-gradient-to-l from-red-500 to-orange-500 text-white">
       <img src="/logo.webp" alt="" className="w-[100px] h-[100px] rounded-full ml-12 mt-6"/>
      <div className="fixed top-6 right-6 z-50 text-black">
          <NavUser />
        </div>
        <main className="w-full p-6 pt-24">
        <ErrorBoundary>
         <Suspense fallback={<div>Chargement de la navigation...</div>}>
          <NavMain
            items={platformItems}
            onPlatformClick={handlePlatformClick}
            onSearch={handleSearch}/>
            </Suspense>
                 </ErrorBoundary>
                    {/* Résultats recherche */}
                    <div>
                        {results.length > 0 ? (
                            <ul>
                                {results.map((product) => (
                                    <li
                                        key={product.id}
                                        className="border-b last:border-b-0 px-4 py-2 flex items-center" >
                                        <img
                                            src={`/produits/${product.image}`}
                                            alt={product.nom}
                                            className="w-16 h-16 object-cover rounded mr-4"/>
                                        <span>{product.nom} - {product.prix} €</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div></div>
                        )}
                    </div>

                    {/* Résultats de recherche détaillés */}
                    {results.length > 0 && (
                        <div className="w-[80%] max-w-5xl mx-auto mt-4">
                            <ul>
                                {results.map((product) => (
                                    <li
                                        key={product.id}
                                        className="border-b last:border-b-0 px-4 py-2">
                                        {product.name} - {product.price}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <Head title="Accueil" />

                    <h1 className="text-3xl font-bold mb-4">Bienvenue sur votre espace</h1>
                    {auth?.user ? (
                        <p className="text-xl mb-4">Bonjour, {auth.user.name} !</p>
                    ) : (
                        <p className="text-xl mb-4">Vous êtes connecté.</p>
                    )}

                    {/* Produits */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4 text-white">Nos produits :</h2>
                        <ErrorBoundary>
                         <Suspense fallback={<div>Chargement des produits...</div>}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {filteredProducts?.length > 0 ? (
                                filteredProducts.map((produit) => (
                                    <div
                                        key={produit.id}
                                        className="bg-white text-black p-4 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer"
                                        onClick={() => handleRedirect(route('produits.show', produit.id))}>
                                        <h3 className="text-xl font-semibold mb-2">{produit.nom}</h3>
                                        <p className="text-red-500 font-bold mb-2">Prix : {produit.prix} €</p>
                                        <p className="text-sm text-gray-500">
                                            Catégorie : {produit.category?.nom ?? 'Non classé'}
                                        </p>
                                        <div className="mt-2">
                                            <p className="text-sm font-medium">Plateformes disponibles :</p>
                                            {produit.plateformes.map((plateforme) => (
                                                <p key={plateforme.id} className="text-gray-600">
                                                    {plateforme.nom} - Prix : {plateforme.pivot?.prix ?? produit.prix} €
                                                </p>
                                            ))}
                                        </div>
                                        {produit.image && (
                                            <div className="mt-4">
                                                <img
                                                    src={`/produits/${produit.image}`}
                                                    alt={produit.nom}
                                                    className="w-full h-auto object-cover rounded"/>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>Aucun produit disponible pour cette plateforme.</p>
                            )}
                        </div>
                    </Suspense>
                    </ErrorBoundary>
                    </div>
                </main>

            </div>
        </SidebarProvider>
    );
}
