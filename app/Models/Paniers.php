<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paniers extends Model
{
    use HasFactory;

    protected $table = 'paniers'; 

    protected $fillable = [
        'user_id',
        'produit_id',
        'quantite',
        'statut',
        'prix',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function produit()
    {
        return $this->belongsTo(Produits::class);
    }
 public function commande()
   
{
    return $this->belongsTo(Commandes::class, 'commande_id'); 
}

    }