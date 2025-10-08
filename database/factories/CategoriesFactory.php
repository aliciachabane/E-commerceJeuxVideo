<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;


use App\Models\Categories;

class CategoriesFactory extends Factory
{
    protected $model = Categories::class;

    public function definition()
    {
        return [
            'nom' => $this->faker->word(),
            'slug' => $this->faker->slug(),
            'parent_id' => null,
        ];
    }
}
