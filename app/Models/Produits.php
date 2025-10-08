<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Produits extends Model
{
   use HasFactory;

    protected $table = 'produits';
    protected $fillable = ['category_id', 'nom', 'image', 'description', 'prix', 'stock', 'deleted_at'];
    public function category()
    {
        return $this->belongsTo(Categories::class, 'category_id'); 
    }

    public function plateformes()
    {
        return $this->belongsToMany(Plateforme::class, 'plateforme_produit', 'produit_id', 'plateforme_id')
                    ->withPivot('prix') 
                    ->withTimestamps();
    }

    public function getPrixAttribute($value)
    {
      
        return $value;
    }

    public function scopeAvailable($query)
    {
        return $query->where('stock', '>', 0)->whereNull('deleted_at');
    }
}