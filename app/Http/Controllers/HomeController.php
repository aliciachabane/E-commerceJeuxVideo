<?php

namespace App\Http\Controllers;

use App\Models\Produits; 
use Inertia\Inertia; 

class HomeController extends Controller
{
    public function index()
    {
      
        $produit = Produits::with(['plateformes', 'categories'])->get();

        return Inertia::render('Home', [
            'produits' => $produit, 
        ]);
    }
}