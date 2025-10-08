import { Inertia } from '@inertiajs/inertia';
import { usePage, Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Paiement() {
    const { panier, total } = usePage().props;

    // État pour les champs du formulaire
   const [form, setForm] = useState({
    prenom: '',
    nom: '',
    adresse: '',
    ville: '',
    code_postal: '',
    telephone: '',
    carte: '',
});

    // Fonction pour mettre à jour les champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    // Fonction pour soumettre la commande
    const handleConfirmerCommande = () => {
        Inertia.post(route('paiement.valider'), form, {
            onSuccess: () => {
                // Redirige vers la page des commandes après succès
                Inertia.visit(route('commandes.mes'));
            },
            onError: (errors) => {
                // Gère les erreurs éventuelles (par exemple, formulaire incomplet)
                console.error(errors);
            }
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b to-red-500 from-orange-500  p-6">
            <Head title="Confirmation de commande" />

            <div className="max-w-3xl mx-auto bg-white shadow rounded p-6">
                <h1 className="text-2xl font-bold mb-4">Confirmation de votre commande</h1>

                {/* Liste des produits dans le panier */}
                <ul className="divide-y">
                    {panier.map((item) => (
                        <li key={item.id} className="py-2 flex justify-between items-center">
                            <span>{item.produit.nom} x {item.quantite}</span>
                            <span>{(item.quantite * item.prix).toFixed(2)} €</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-4 text-right font-bold text-xl">
                    Total : {total.toFixed(2)} €
                </div>

                {/* Formulaire de commande */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">Informations de livraison</h2>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="prenom" className="block font-medium">Prenom</label>
                            <input
                                type="text"
                                id="prenom"
                                name="prenom"
                                value={form.prenom}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                       
                        <div>
                            <label htmlFor="nom" className="block font-medium">Nom</label>
                            <input
                                type="text"
                                id="nom"
                                name="nom"
                                value={form.nom}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                       
                        <div>
                            <label htmlFor="adresse" className="block font-medium">Adresse</label>
                            <input
                                type="text"
                                id="adresse"
                                name="adresse"
                                value={form.adresse}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="ville" className="block font-medium">Ville</label>
                            <input
                                type="text"
                                id="ville"
                                name="ville"
                                value={form.ville}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="code_postal" className="block font-medium">Code postal</label>
                            <input
                                type="text"
                                id="code_postal"
                                name="code_postal"
                                value={form.code_postal}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="telephone" className="block font-medium">Téléphone</label>
                            <input
                                type="text"
                                id="telephone"
                                name="telephone"
                                value={form.telephone}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        
                        <div>
                    <label htmlFor="carte" className="block font-medium">Numéro de carte (simulation)</label>
                    <input
                    type="text"
                     id="carte"
                    name="carte"
                    value={form.carte || ''}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="1234 5678 9012 3456" />
                    </div>
                        
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleConfirmerCommande}
                    className="mt-6 w-full bg-green-500 hover:bg-green-600 text-black py-2 px-4 rounded">
                    Confirmer et valider la commande
                </button>
            </div>
        </div>
    );
}
