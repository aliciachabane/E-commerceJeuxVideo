<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Categories extends Model
{
    use HasFactory;
    
    protected $table = 'categories';  
    protected $fillable = ['nom', 'slug', 'parent_id']; 
   
    public function subCategory()
    {
        return $this->hasMany(Categories::class, 'parent_id');
    }

    public function produit()
    {
        return $this->hasMany(Produits::class);
    }

    public function parent()
    {
        return $this->belongsTo(Categories::class, 'parent_id');
    }
}