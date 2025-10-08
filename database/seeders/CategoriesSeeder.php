<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Categories;  

class CategoriesSeeder extends Seeder
{
    public function run(): void
    {
       
        $categories = [
            ['nom' => 'Aventure'],
            ['nom' => 'RPG'],
            ['nom' => 'Action'],
            ['nom' => 'Plateforme'],
            ['nom' => 'Horreur'],
            ['nom' => 'Course'],
        ];

     
        foreach ($categories as $categorie) {
            Categories::firstOrCreate($categorie);
        }
    }
}