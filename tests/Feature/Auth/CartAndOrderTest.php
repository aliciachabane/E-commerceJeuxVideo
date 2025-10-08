<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Produits;
use App\Models\Categories;
use App\Models\Paniers;
use App\Models\Commandes;
use App\Models\DetailCommandes;

class CartAndOrderTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_add_produits_to_panier_and_place_commandes()
    {
        // 1️⃣ Création d'un utilisateur
        $user = User::factory()->create();

        // 2️⃣ Création d'une catégorie et d'un produit
        $category = Categories::factory()->create();
        $produit = Produits::factory()->create([
            'category_id' => $category->id,
        ]);

        // 3️⃣ Ajouter le produit au panier
        $this->actingAs($user)
            ->post(route('panier.ajouter'), [
                'produit_id' => $produit->id,
                'prix' => $produit->prix,
                'quantite' => 1,
            ])
            ->assertRedirect(route('panier.afficher'));

        // 4️⃣ Vérifier que le panier existe en base
        $this->assertDatabaseHas('paniers', [
            'user_id' => $user->id,
            'produit_id' => $produit->id,
            'quantite' => 1,
            'prix' => $produit->prix,
        ]);

        // 5️⃣ Passer la commande
        $this->actingAs($user)
            ->post(route('commande.checkout'), [
                'prenom' => 'Test',
                'nom' => 'User',
                'adresse' => '123 Rue Test',
                'ville' => 'Testville',
                'code_postal' => '75000',
                'telephone' => '0102030405',
            ])
            ->assertRedirect(route('commandes.mes')); // adapte la route de confirmation réelle

        // 6️⃣ Vérifier que la commande existe en base
        $this->assertDatabaseHas('commandes', [
            'user_id' => $user->id,
            'prenom' => 'Test',
            'nom' => 'User',
        ]);

        // 7️⃣ Vérifier que le produit est dans les détails de la commande
        $commande = Commandes::where('user_id', $user->id)->first();
        $this->assertDatabaseHas('detail_commandes', [
            'commande_id' => $commande->id,
            'produit_id' => $produit->id,
            'quantite' => 1,
            'prix' => $produit->prix,
        ]);

        // 8️⃣ Vérifier que le panier de l'utilisateur est maintenant vide
        $this->assertDatabaseMissing('paniers', [
            'user_id' => $user->id,
            'produit_id' => $produit->id,
        ]);
    }
}
