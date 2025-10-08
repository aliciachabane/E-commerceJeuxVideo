<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Paniers;
use App\Models\Commandes;
use App\Models\DetailCommandes;
use Inertia\Inertia;

class CommandeController extends Controller
{
   public function checkout()
{
    $userId = auth()->id();

    $panierItems = Paniers::where('user_id', $userId)->get();

    if ($panierItems->isEmpty()) {
        return redirect()->back()->with('error', 'Votre panier est vide.');
    }

    // Exemple d'action pour panier non vide, par exemple afficher une vue
    return Inertia::render('Checkout', [
        'panierItems' => $panierItems,
    ]);
}
    public function afficherPagePaiement()
    {
        $userId = auth()->id();
        $panier = Paniers::where('user_id', $userId)
                         ->with('produit')  
                         ->get();

        if ($panier->isEmpty()) {
            return redirect()->route('panier.afficher')->with('error', 'Votre panier est vide.');
        }

        $total = $panier->reduce(function ($carry, $item) {
            return $carry + ($item->quantite * $item->prix);
        }, 0);

        return Inertia::render('Paiement', [
            'panier' => $panier,
            'total' => $total,
        ]);
    }
public function validerCommande(Request $request)
{
    $request->validate([
        'prenom' => 'required|string',
        'nom' => 'required|string',
        'adresse' => 'required|string',
        'ville' => 'required|string',
        'code_postal' => 'required|string',
        'telephone' => 'required|string',
    ]);

    $userId = auth()->id();
    $panier = Paniers::where('user_id', $userId)->with('produit')->get();

    if ($panier->isEmpty()) {
        return redirect()->route('panier.afficher')->with('error', 'Votre panier est vide.');
    }

   
    $total = $panier->reduce(function ($carry, $item) {
        return $carry + ($item->quantite * $item->prix);
    }, 0);

    $commande = new Commandes();
    $commande->user_id = $userId;
    $commande->prenom = $request->prenom;
    $commande->nom = $request->nom;
    $commande->adresse = $request->adresse;
    $commande->ville = $request->ville;
    $commande->code_postal = $request->code_postal;
    $commande->telephone = $request->telephone;
    $commande->total = $total;
    $commande->save();

   
    foreach ($panier as $item) {
        $commande->detailCommandes()->create([
            'produit_id' => $item->produit_id,
            'quantite' => $item->quantite,
            'prix' => $item->prix,
        ]);
    }

    Paniers::where('user_id', $userId)->delete();

    return redirect()->route('commandes.mes')->with('success', 'Commande passée avec succès !');
}

public function mesCommandes()
{
    $userId = auth()->id();
    $commandes = Commandes::with('detailCommandes.produit') 
        ->where('user_id', $userId)
        ->latest()
        ->get();

    return Inertia::render('MesCommandes', [
        'commandes' => $commandes,
    ]);
}
}