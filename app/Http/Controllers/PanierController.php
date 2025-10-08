<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use App\Models\Commandes;
use App\Models\Paniers;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PanierController extends Controller
{ 
    public function ajouterAuPanier(Request $request)
    {
        $request->validate([
            'produit_id' => 'required|exists:produits,id',
            'prix' => 'required|numeric|min:0',
            'quantite' => 'required|integer|min:1',
        ]);

        $userId = auth()->id();
        $panier = Paniers::where('user_id', $userId)
                        ->where('produit_id', $request->produit_id)
                        ->first();

        if ($panier) {
            $panier->quantite += $request->quantite;
            $panier->prix = $request->prix;
            $panier->save();
        } else {

            Paniers::create([
                'user_id' => $userId,
                'produit_id' => $request->produit_id,
                'quantite' => $request->quantite,
                'prix' => $request->prix,
            ]);
        }
        return redirect()->route('panier.afficher');
    }
    public function afficher()
    {
        $panier = Paniers::where('user_id', auth()->id())
                         ->with('produit') 
                         ->get();

        $panierDetails = $panier->map(function ($item) {
            $item->prix_total = $item->quantite * $item->prix;
            return $item;
        });

        return Inertia::render('Panier', [
            'panier' => $panierDetails,
        ]);
    }
    public function supprimer($id)
    {
        $panier = Paniers::where('id', $id)
                         ->where('user_id', auth()->id())
                         ->first();

        if ($panier) {
            $panier->delete();
            return redirect()->back()->with('success', 'Article supprimé du panier.');
        }

        return redirect()->back()->with('error', 'Article non trouvé.');
    }
}