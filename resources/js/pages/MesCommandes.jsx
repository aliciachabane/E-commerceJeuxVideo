import { usePage, Head } from '@inertiajs/react';

export default function MesCommandes() {
    const { commandes } = usePage().props; // Récupère les commandes envoyées depuis le contrôleur

    return (
        <div className="p-6 bg-gradient-to-b from-red-500 to-orange-500 w-full  min-h-screen">
            <Head title="Mes Commandes" />

            <h1 className="text-2xl font-bold mb-4">Mes Commandes</h1>

            {commandes.length === 0 ? (
                <p>Aucune commande pour le moment.</p>
            ) : (
                commandes.map((commande) => (
                    <div key={commande.id} className="mb-6 p-4 bg-white rounded shadow">
                        <h2 className="font-semibold">
                            Commande #{commande.id} - {commande.created_at}
                        </h2>
                        <p>Total : {commande.total} €</p> {/* Assure-toi d'afficher correctement le total ici */}
                        <ul className="mt-2 list-disc list-inside">
                            {/* Ici on accède aux détails de chaque commande */}
                            {commande.detailCommandes && commande.detailCommandes.map((detail) => (
                                <li key={detail.id}>
                                    {detail.produit ? detail.produit.nom : 'Produit inconnu'} — {detail.quantite} × {detail.prix} €
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
}