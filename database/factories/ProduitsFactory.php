<?php

namespace Database\Factories;

use App\Models\Produits;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProduitsFactory extends Factory
{
    protected $model = Produits::class;

    public function definition()
    {
        return [
            'category_id' => 1, // ou utilise faker pour générer une catégorie
            'nom' => $this->faker->words(3, true),
            'image' => 'path/to/image.jpg',
            'description' => $this->faker->paragraph(),
            'prix' => $this->faker->randomFloat(2, 10, 100),
            'stock' => $this->faker->numberBetween(0, 100),
            'deleted_at' => null,
        ];
    }
}
