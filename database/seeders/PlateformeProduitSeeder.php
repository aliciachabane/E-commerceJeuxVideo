<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlatformeProduitSeeder extends Seeder
{
    public function run()
    {
        $donnees = [];
        $plateformeCount = 7;

      
        $produits = DB::table('produits')->get();

        foreach ($produits as $produit) {
            for ($i = 1; $i <= $plateformeCount; $i++) {
                $donnees[] = [
                    'produit_id' => $produit->id, 
                    'plateforme_id' => $i,  
                    'prix' => $produit->prix, 
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        dd($donnees);

        DB::table('plateforme_produit')->insert($donnees);
    }
}