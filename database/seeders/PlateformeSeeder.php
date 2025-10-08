<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; 
use App\Models\Plateforme;

class PlateformeSeeder extends Seeder
{
    public function run()
    {
        DB::table('plateformes')->insert([
            ['nom' => 'PS4'],
            ['nom' => 'PS5'],
            ['nom' => 'Xbox One'],
            ['nom' => 'Xbox Series X'],
            ['nom' => 'Xbox Series S'],
            ['nom' => 'PC'],
            ['nom' => 'Nintendo Switch'],
        ]);
    }
}