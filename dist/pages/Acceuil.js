import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Slider from "react-slick";
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import Hero from '@/components/hero';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AppLayout from "../layouts/app-layout";
export default function Accueil() {
    const { auth } = usePage().props;
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const handleRedirect = (url) => {
        Inertia.visit(url);
    };
    // Exemple de fonction de recherche (à connecter à ta barre de recherche)
    async function handleSearch(query) {
        if (!query.trim())
            return;
        setHasSearched(true);
        const response = await fetch(`/recherche-produits?search=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(Array.isArray(data) ? data : data.results || data.data || []);
    }
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } }
        ]
    };
    return (_jsxs("div", { children: [results.length === 1 && (_jsxs("div", { className: "max-w-xl mx-auto bg-white text-black rounded-lg shadow-lg p-6 mt-8", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: results[0].nom }), _jsx("img", { src: `/produits/${results[0].image}`, alt: results[0].nom, className: "w-full h-auto object-cover rounded mb-4" }), _jsx("p", { className: "mb-2 text-gray-700", children: results[0].description }), _jsxs("p", { className: "text-red-500 font-bold text-xl mb-2", children: [results[0].prix, " \u20AC"] }), _jsx("button", { onClick: () => { setResults([]); setHasSearched(false); }, className: "mt-6 bg-orange-400 text-white px-4 py-2 rounded shadow", children: "Retour \u00E0 l'accueil" })] })), hasSearched && results.length === 0 && (_jsxs("div", { className: "text-center text-red-500 mt-8", children: ["Produit indisponible", _jsx("button", { onClick: () => { setResults([]); setHasSearched(false); }, className: "ml-4 bg-orange-400 text-white px-4 py-2 rounded shadow", children: "Retour \u00E0 l'accueil" })] })), (!hasSearched || results.length !== 1) && (_jsxs("div", { className: "relative min-h-screen flex flex-col items-center overflow-x-hidden", children: [_jsx(Hero, {}), _jsx("img", { src: "/logo.png", alt: "", className: "absolute top-6 left-6 w-[100px] h-[100px] rounded-full z-20" }), !auth?.user && (_jsxs("div", { className: "absolute top-6 right-6 flex gap-2 z-20", children: [_jsx("button", { onClick: () => handleRedirect('/register'), className: "bg-orange-300 text-black p-2 rounded-md shadow", children: "S'inscrire" }), _jsx("button", { onClick: () => handleRedirect('/login'), className: "bg-orange-300 text-black p-2 rounded-md shadow", children: "Se Connecter" })] })), _jsx("h1", { className: "text-3xl font-bold mb-4 mt-8 z-10", children: "Bienvenue" }), _jsx("div", { className: "w-full mt-8 gap-4 z-10", children: _jsxs(Slider, { ...settings, children: [_jsx("img", { src: "/produits/asseto.png", alt: "", className: "w-full h-80 object-cover rounded-xl shadow-lg" }), _jsx("img", { src: "/produits/7daystodie.png", alt: "", className: "w-full h-80 object-cover rounded-xl shadow-lg" }), _jsx("img", { src: "/produits/cyberpunk.png", alt: "", className: "w-full h-80 object-cover rounded-xl shadow-lg" }), _jsx("img", { src: "/produits/rayman.png", alt: "", className: "w-full h-80 object-cover rounded-xl shadow-lg" })] }) }), _jsx("div", { className: "mt-6 z-10", children: auth?.user ? (_jsxs("p", { className: "text-xl", children: ["Bonjour, ", auth.user.name, "\u202F!"] })) : (_jsx("p", { className: "text-xl", children: "Vous n'\u00EAtes pas connect\u00E9." })) })] }))] }));
}
Accueil.layout = page => _jsx(AppLayout, { children: page });
