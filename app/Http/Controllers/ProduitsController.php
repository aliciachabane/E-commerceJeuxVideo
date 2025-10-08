<?php

namespace App\Http\Controllers;
use App\Models\Produits;
use App\Models\Categories;
use App\Models\Plateforme;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ProduitsController extends Controller
{
   
    public function acceuil()
    {
        $produits = Produits::with(['category', 'plateformes'])->get();
        return Inertia::render('AcceuilConnecter', [
            'produits' => $produits,
            'auth' => ['user' => auth()->user()],
        ]);
    }

 public function index()
{
    $produits = Produits::all(); 
    return Inertia::render('GererLesProduits', [
        'produits' => $produits,
    ]);
}

    public function show($id)
    {
        $produit = Produits::with(['category', 'plateformes'])->findOrFail($id);

        return Inertia::render('DetailProduit', [
            'produit' => $produit,
            'prixParPlateforme' => $produit->plateformes->pluck('pivot.prix', 'nom'),
        ]);
    }

    public function showNintendo()
    {
        $produits = Produits::whereHas('plateformes', function ($query) {
            $query->where('nom', 'Nintendo Switch');
        })->get();

        return Inertia::render('AcceuilConnecter', compact('produits'));
    }

    public function showPlayStation()
    {
        $plateformes = ['PS4','PS5'];

        $produits = Produits::whereHas('plateformes', function ($query) use ($plateformes) {
            $query->whereIn('nom', $plateformes);
        })->get();

        return Inertia::render('AcceuilConnecter', compact('produits'));
    }

    public function showXbox()
    {
        $plateformes = ['Xbox One', 'Xbox Serie X', 'Xbox Serie S'];

        $produits = Produits::whereHas('plateformes', function ($query) use ($plateformes) {
            $query->whereIn('nom', $plateformes);
        })->get();

        return Inertia::render('AcceuilConnecter', compact('produits'));
    }

    public function search(Request $request)
    {
        $search = $request->query('search', '');
        $produits = Produits::where('nom', 'like', "%{$search}%")->get();

        return response()->json($produits);
    }

    public function create()
    {
        $categories = Categories::all();
        $plateformes = Plateforme::all();

        return Inertia::render('CreerProduit', [
            'categories' => $categories,
            'plateformes' => $plateformes,
        ]);
    }

   public function store(Request $request)
{
    $validated = $request->validate([
        'nom' => 'required|string|max:255',
        'description' => 'required|string',
        'image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        'stock' => 'required|integer|min:0',
        'category_id' => 'required|exists:categories,id',
        'plateformes' => 'required|array',
        'plateformes.*' => 'exists:plateformes,id',
        'prix_plateformes' => 'required|array',
        'prix_plateformes.*' => 'required|numeric|min:0',
    ]);
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('produits', 'public');
        $validated['image'] = $imagePath;
    }

    $produit = Produits::create([
        'nom' => $validated['nom'],
        'description' => $validated['description'],
        'image' => $validated['image'],
         'prix' => 0,
        'stock' => $validated['stock'],
        'category_id' => $validated['category_id'],
    ]);

    $pivotData = [];
    foreach ($validated['plateformes'] as $plateformeId) {
        $pivotData[$plateformeId] = [
            'prix' => $validated['prix_plateformes'][$plateformeId]
        ];
    }
    $produit->plateformes()->sync($pivotData);

    return redirect()->route('products.index')->with('success', 'Produit créé avec succès !');
}
  public function update(Request $request, Produits $produits)
{
    $request->validate([
        'nom' => 'required',
        'prix' => 'required|numeric',
        'stock' => 'required|integer|min:0', 
        'description' => 'nullable|string', 
        'image' => 'nullable|string',        
    ]);
    $produits->update($request->only('nom', 'prix', 'stock', 'description', 'image')); 
    return redirect()->route('products.index')->with('success', 'Produit modifié !');
}

    public function destroy(Produits $produits)
    {
        $produits->delete();
        return redirect()->route('products.index')->with('success', 'Produit supprimé !');
    }
}