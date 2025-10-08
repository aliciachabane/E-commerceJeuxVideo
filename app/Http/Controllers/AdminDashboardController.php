<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Produits;
use App\Models\Commandes;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
   
    public function index()
    {
        return Inertia::render('Dashboard', [
            'users'     => User::count(),
            'produits'  => Produits::count(),
            'commandes' => Commandes::count(),
            'stocks'    => Produits::select('id', 'nom', 'stock', 'image')->get(),
        ]);
    }

   
    public function users()
    {
        return Inertia::render('GererLesUtilisateurs', [
            'users' => User::all(),
            'auth'  => auth()->user(),
        ]);
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $id,
            'role'  => 'required|string|max:50',
        ]);

        $user->update($validated);

        return redirect()->back()->with('success', 'Utilisateur modifié avec succès.');
    }

  
    public function destroyUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->back()->with('success', 'Utilisateur supprimé avec succès.');
    }

    public function commandes()
    {
        return Inertia::render('GererLesCommandes', [
            'commandes' => Commandes::all(),
        ]);
    }

    public function updateCommande(Request $request, $id)
    {
        $commande = Commandes::findOrFail($id);

        $validated = $request->validate([
            'prenom'      => 'required|string|max:255',
            'nom'         => 'required|string|max:255',
            'adresse'     => 'required|string|max:255',
            'ville'       => 'required|string|max:255',
            'code_postal' => 'required|string|max:20',
            'telephone'   => 'required|string|max:20',
            'statut'      => 'required|string|max:50',
            'total'       => 'required|numeric|min:0',
        ]);

        $commande->update($validated);

        return redirect()->route('admin.commandes')->with('success', 'Commande modifiée avec succès.');
    }

    public function destroyCommande($id)
    {
        $commande = Commandes::findOrFail($id);
        $commande->delete();

        return redirect()->back()->with('success', 'Commande supprimée avec succès.');
    }
}
