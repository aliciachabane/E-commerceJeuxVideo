<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_can_authenticate_using_the_login_screen()
    {
        // Crée un utilisateur avec mot de passe haché
        $user = User::factory()->create();

        // Effectue une requête POST pour se logger
        $response = $this->post(route('login'), [
            'email' => $user->email,
            'password' => 'password', // mot de passe en clair
        ]);

        // Vérifie que l’utilisateur est authentifié
        $this->assertAuthenticated();

        // Vérifie la redirection après login
        $response->assertRedirect('/dashboard');
    }
}
