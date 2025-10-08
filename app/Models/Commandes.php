<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commandes extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'commande_id', 
        'prenom',
        'nom',
        'adresse',
        'ville',
        'code_postal',
        'telephone',
        'statut',
        'total',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function commandeParent()
    {
        return $this->belongsTo(Commandes::class, 'commande_id');  
    }

   public function detailCommandes()
{
    return $this->hasMany(DetailCommandes::class, 'commande_id');
}

    public function paniers()
    {
        return $this->hasMany(Paniers::class);
    }
}