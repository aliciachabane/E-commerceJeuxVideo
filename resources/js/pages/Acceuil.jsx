import React, { lazy, Suspense, useState, useCallback, useMemo } from "react";
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AppLayout from "../layouts/app-layout";
import ErrorBoundary from "@/components/ErrorBoundary";
import { NavFooter } from "@/components/nav-footer";
import HeavyComponent from '@/components/HeavyComponent';

const Hero = lazy(() => import('@/components/hero'));
const Slider = lazy(() => import('react-slick'));

const MemoizedHeavyComponent = React.memo(HeavyComponent);

const footerItems = [
  { title: "Accueil", url: "/" },
  { title: "Jeux", url: "/jeux" },
  { title: "Contact", url: "/contact" },
];

function computeHeavyValue(input) {
  return input * 10;
}

export default function Accueil() {
  const { auth } = usePage().props;
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const dep = 42;
  const memoizedValue = useMemo(() => computeHeavyValue(dep), [dep]);
  const handleRedirect = useCallback((url) => {
    Inertia.visit(url);
  }, []);

  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) return;
    setHasSearched(true);
    const response = await fetch(`/recherche-produits?search=${encodeURIComponent(query)}`);
    const data = await response.json();
    setResults(Array.isArray(data) ? data : data.results || data.data || []);
  }, []);

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
    ],
    lazyLoad: 'ondemand'
  };

  return (
    <>
      <header className="relative">
        <img
          src="/logo.webp"
          alt="Logo"
          className="absolute top-6 left-6 w-[100px] h-[100px] rounded-full z-20"
          loading="lazy"/>
        {!auth?.user && (
        <nav
            className="absolute top-4 right-4 flex flex-col sm:flex-row gap-2 z-20"
            aria-label="Navigation utilisateur">
            <button onClick={() => handleRedirect("/register")}aria-label="S'inscrire"
                className="bg-orange-300 text-black px-3 py-1 sm:px-4 sm:py-2 rounded-md shadow text-sm sm:text-base" >
                S'inscrire
            </button>
            <button onClick={() => handleRedirect("/login")} aria-label="Se connecter"
                className="bg-orange-300 text-black px-3 py-1 sm:px-4 sm:py-2 rounded-md shadow text-sm sm:text-base">
                Se Connecter
            </button>
            </nav>
        )}
      </header>
      <main className="relative min-h-screen flex flex-col items-center overflow-x-hidden">
        <ErrorBoundary>
          <Suspense fallback={<div>Chargement du Hero...</div>}>
            <section aria-label="Section héro">
              <Hero />
            </section>
          </Suspense>
        </ErrorBoundary>

        {results.length === 1 && (
          <article className="max-w-xl mx-auto bg-white text-black rounded-lg shadow-lg p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4">{results[0].nom}</h2>
            <img
              src={`/produits/${results[0].image}`}
              alt={results[0].nom}
              className="w-full h-auto object-cover rounded mb-4"
              loading="lazy"/>
            <p className="mb-2 text-gray-700">{results[0].description}</p>
            <p className="text-red-500 font-bold text-xl mb-2">{results[0].prix} €</p>
            <button
              onClick={() => { setResults([]); setHasSearched(false); }}
              className="mt-6 bg-orange-400 text-white px-4 py-2 rounded shadow">
              Retour à l'accueil
            </button>
          </article>
        )}

        {hasSearched && results.length === 0 && (
          <section aria-live="polite" className="text-center text-red-500 mt-8">
            Produit indisponible
            <button
              aria-label="Retour à l'accueil"
              onClick={() => { setResults([]); setHasSearched(false); }}
              className="ml-4 bg-orange-400 text-white px-4 py-2 rounded shadow">
              Retour à l'accueil
            </button>
          </section>
        )}

        {(!hasSearched || results.length !== 1) && (
          <>
            <h1 className="text-3xl font-bold mb-4 mt-8 z-10">Bienvenue</h1>
<ErrorBoundary>
    <Suspense fallback={<div>Chargement du slider…</div>}>
        <section aria-label="Slider de produits" className="w-full mt-8 gap-4 z-10">
            <Slider {...settings}>
                <img src="/produits/asseto.webp"alt="Asseto" loading="lazy" className="w-full h-80 object-cover rounded-xl shadow-lg" />
                <img src="/produits/7daystodie.webp" alt="7 Days to Die" loading="lazy" className="w-full h-80 object-cover rounded-xl shadow-lg" />
                <img src="/produits/cyberpunk.webp" alt="Cyberpunk" loading="lazy" className="w-full h-80 object-cover rounded-xl shadow-lg" />
                <img src="/produits/rayman.webp" alt="Rayman" loading="lazy" className="w-full h-80 object-cover rounded-xl shadow-lg" />
            </Slider>
        </section>
    </Suspense>
</ErrorBoundary>

            <section className="mt-6 z-10" aria-label="Message utilisateur">
              {auth?.user ? (
                <p className="text-xl">Bonjour, {auth.user.name} !</p>
              ) : (
                <p className="text-xl">Vous n'êtes pas connecté.</p>
              )}
            </section>
          </>
        )}
      </main>

      <footer>
        <NavFooter items={footerItems} />
      </footer>
    </>
  );
}
Accueil.layout = page => <AppLayout>{page}</AppLayout>;
