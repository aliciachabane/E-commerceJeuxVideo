<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\CategoriesSeeder;
use Database\Seeders\PlateformeSeeder;
use Database\Seeders\ProduitsSeeder;
use Database\Seeders\PlatformProduitSeeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CategoriesSeeder::class,
            PlateformeSeeder::class,
            ProduitsSeeder::class,
            PlatformProduitSeeder::class
        ]);
    }
}