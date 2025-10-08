<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailCommandes extends Model
{
    use HasFactory;

    protected $fillable = [
        'commande_id',
        'produit_id',
        'quantite',
        'prix',
    ];

    public function commande()
    {
        return $this->belongsTo(Commandes::class, 'commande_id');
    }

    public function produit()
    {
        return $this->belongsTo(Produits::class);
    }
}