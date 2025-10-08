<?php

namespace App\Models;
use App\Models\Plateforme_Produit;


use Illuminate\Database\Eloquent\Model;

class PlateformeProduit extends Model
{
    public function run()
{
    PlateformeProduit::create([
        'plateforme_id' => 1,
        'produit_id' => 1,
        'prix' => 29.99,
    ]);
}
}