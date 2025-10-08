<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Providers\RouteServiceProvider;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_screen_can_be_rendered()
    {
       $this->withoutExceptionHandling();
        $response = $this->get('/login');
        $response->assertStatus(200);
    }

   public function test_user_can_login_with_correct_credentials()
{
    $this->withoutExceptionHandling();

   $user = User::factory()->create([
    'password' => 'password',
]);
    

    $response = $this->post(route('login'), [
        'email' => $user->email,
        'password' => 'password',
    ]);

    

    $this->assertAuthenticatedAs($user);
    $response->assertRedirect(RouteServiceProvider::HOME);
}

}