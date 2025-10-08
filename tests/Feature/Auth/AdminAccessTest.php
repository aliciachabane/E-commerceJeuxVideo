<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Route;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Http\Middleware\AdminMiddleware;


class AdminAccessTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Création d’une route factice avec middleware admin pour test
        Route::middleware(['web', 'admin'])->get('/dummy-admin-route', function () {
            return 'admin only content';
        });
    }

    public function test_non_admin_cannot_access_admin_routes()
    {
        $user = User::factory()->create([
            'role' => 'user', // adapte à ta structure
        ]);

        $response = $this->actingAs($user)->get('/dummy-admin-route');

        $response->assertStatus(403);
    }

    public function test_admin_can_access_admin_routes()
    {
        $admin = User::factory()->create([
            'role' => 'admin', // adapte à ta structure
        ]);

        $response = $this->actingAs($admin)->get('/dummy-admin-route');

        $response->assertStatus(200);
        $response->assertSee('admin only content');
    }
}
