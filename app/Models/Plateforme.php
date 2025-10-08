<?php

namespace App\Models;

use App\Models\Produits;
use Illuminate\Database\Eloquent\Model;

class Plateforme extends Model
{
    protected $fillable = ['nom']; 

    public function produit()
    {
        return $this->belongsToMany(Produits::class, 'plateforme_produit', 'plateforme_id', 'produit_id')
        ->withPivot('prix')
        ->withTimestamps(); 
    }                      
}