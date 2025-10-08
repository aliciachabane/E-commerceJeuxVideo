import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { NavMain } from '@/components/nav-main';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Gamepad2, MonitorSmartphone, Disc3, Globe } from 'lucide-react';
import { router } from '@inertiajs/react';
export default function AcceuilConnecter() {
    const { auth, produits } = usePage().props;
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    // Pour la recherche
    const [results, setResults] = useState([]);
    async function handleSearch(query) {
        if (!query.trim())
            return;
        const response = await fetch(`/recherche-produits?search=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(Array.isArray(data) ? data : data.results || data.data || []);
    }
    // Mapping pour le filtrage
    const platformGroupMap = {
        'PlayStation': ['PS4', 'PS5'],
        'Xbox': ['Xbox One', 'Xbox Series X', 'Xbox Series S'],
        'Nintendo Switch': ['Nintendo Switch'],
        'PC': ['PC'],
    };
    // Liste des plateformes pour la nav
    const platformItems = [
        { title: 'Toutes', icon: Globe },
        { title: 'Nintendo Switch', icon: MonitorSmartphone },
        { title: 'PlayStation', icon: Disc3 },
        { title: 'Xbox', icon: Gamepad2 },
        { title: 'PC', icon: Disc3 },
    ];
    // Filtrage dynamique côté client
    const filteredProducts = selectedPlatform && selectedPlatform !== 'Toutes'
        ? produits.filter((produit) => produit.plateformes?.some((plateforme) => platformGroupMap[selectedPlatform]?.includes(plateforme.nom)))
        : produits;
    // Handler pour la sélection de plateforme
    const handlePlatformClick = (platformName) => {
        setSelectedPlatform(platformName);
    };
    // Navigation vers la fiche produit
    const handleRedirect = (url) => {
        window.location.href = url;
    };
    // Voir panier
    const handleVoirPanier = () => {
        window.location.href = route('panier.afficher');
    };
    // Déconnexion
    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };
    return (_jsx(SidebarProvider, { children: _jsxs("div", { className: "min-h-screen relative w-full", children: [_jsxs("main", { className: " w-full bg-gradient-to-l from-red-500 to-orange-500 p-6 text-white pt-24", children: [_jsx(NavMain, { items: platformItems, onPlatformClick: handlePlatformClick, onSearch: handleSearch }), _jsx("div", { children: results.length > 0 ? (_jsx("ul", { children: results.map(product => (_jsxs("li", { className: "border-b last:border-b-0 px-4 py-2 flex items-center", children: [_jsx("img", { src: `/produits/${product.image}`, alt: product.nom, className: "w-16 h-16 object-cover rounded mr-4" }), _jsxs("span", { children: [product.nom, " - ", product.prix, " \u20AC"] })] }, product.id))) })) : (_jsx("div", {})) }), results.length > 0 && (_jsx("div", { className: "w-[80%] max-w-5xl mx-auto mt-4 ", children: _jsx("ul", { children: results.map(product => (_jsxs("li", { className: "border-b last:border-b-0 px-4 py-2", children: [product.name, " - ", product.price] }, product.id))) }) })), _jsx(Head, { title: "Accueil" }), _jsx("h1", { className: "text-3xl font-bold mb-4", children: "Bienvenue sur votre espace" }), auth && auth.user ? (_jsxs("p", { className: "text-xl mb-4", children: ["Bonjour, ", auth.user.name, " !"] })) : (_jsx("p", { className: "text-xl mb-4", children: "Vous \u00EAtes connect\u00E9." })), _jsxs("div", { className: "mt-8", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4 text-white", children: "Nos produits :" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6", children: filteredProducts && filteredProducts.length > 0 ? (filteredProducts.map((produit) => (_jsxs("div", { className: "bg-white text-black p-4 rounded-lg shadow-lg hover:shadow-xl transition cursor-pointer ", onClick: () => handleRedirect(route('produits.show', produit.id)), children: [_jsx("h3", { className: "text-xl font-semibold mb-2", children: produit.nom }), _jsxs("p", { className: "text-red-500 font-bold mb-2", children: ["Prix : ", produit.prix, " \u20AC"] }), _jsxs("p", { className: "text-sm text-gray-500", children: ["Cat\u00E9gorie : ", produit.category?.nom ?? 'Non classé'] }), _jsxs("div", { className: "mt-2", children: [_jsx("p", { className: "text-sm font-medium", children: "Plateformes disponibles :" }), produit.plateformes.map((plateforme) => (_jsxs("p", { className: "text-gray-600", children: [plateforme.nom, " - Prix : ", plateforme.pivot?.prix ?? produit.prix, " \u20AC"] }, plateforme.id)))] }), produit.image && (_jsx("div", { className: "mt-4", children: _jsx("img", { src: `/produits/${produit.image}`, alt: produit.nom, className: "w-full h-auto object-cover rounded" }) }))] }, produit.id)))) : (_jsx("p", { children: "Aucun produit disponible pour cette plateforme." })) })] })] }), _jsxs("div", { className: "absolute top-6 right-6 flex flex-col gap-4", children: [_jsx("button", { onClick: handleVoirPanier, className: "bg-white text-red-500 px-4 py-2 rounded hover:bg-red-100 transition", children: "Voir mon Panier" }), _jsx("button", { onClick: handleLogout, className: "bg-white text-red-500 px-4 py-2 rounded hover:bg-red-100 transition", children: "D\u00E9connexion" })] })] }) }));
}
