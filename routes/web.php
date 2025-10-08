<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PanierController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\AdminDashboardController;
use App\Models\Produits;
use App\Models\User;
use App\Http\Controllers\TwoFactorAuthController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\ProduitsController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Middleware\AdminMiddleware;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Acceuil');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/acceuil-connecter', function () {
        $produits = Produits::with(['category', 'plateformes'])->get();
        return Inertia::render('AcceuilConnecter', [
            'produits' => $produits,
            'auth' => ['user' => auth()->user()],
        ]);
    })->name('acceuil.connecter');
});

// Route::get('/email/verify', function () {
//     return Inertia::render('auth/verify-email'); 
// })->middleware('auth')->name('verification.notice');

// Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
//     $request->fulfill();
//     return redirect('/acceuil-connecter');
// })->middleware(['auth', 'signed'])->name('verification.verify');

// Route::post('/email/verification-notification', function () {
//     request()->user()->sendEmailVerificationNotification();
//     return back()->with('message', 'Un nouveau lien de vérification a été envoyé !');
// })->middleware(['auth', 'throttle:6,1'])->name('verification.send');

Route::middleware(['auth'])->group(function () {
    Route::get('/settings/2fa', [TwoFactorAuthController::class, 'index'])->name('2fa.index');
    Route::post('/settings/2fa/enable', [TwoFactorAuthController::class, 'enable'])->name('2fa.enable');
    Route::post('/settings/2fa/verify', [TwoFactorAuthController::class, 'verify2FA'])->name('2fa.verify');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/two-factor-challenge', [TwoFactorController::class, 'showChallenge'])->name('two-factor.challenge');
    Route::post('/two-factor-challenge', [TwoFactorController::class, 'verifyChallenge'])->name('two-factor.verify');
});

Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login.form');
Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register.form');
Route::post('/login', [AuthController::class, 'loginSubmit'])->name('login');
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/test-hash', function () {
    $user = User::find(1); 

    if (Hash::check('motdepasseenclair', $user->password)) {
        return 'Mot de passe correct';
    } else {
        return 'Mot de passe incorrect';
    }
});

Route::middleware(['auth'])->group(function () {
    // Page pour afficher le formulaire de changement de mot de passe
    Route::get('/settings/password', [PasswordController::class, 'edit'])->name('password.edit');

    // Route pour mettre à jour le mot de passe
    Route::put('/settings/password', [PasswordController::class, 'update'])->name('password.update');
});

Route::middleware(['auth'])->group(function () {
    // Page des réglages d'apparence
    Route::get('/settings/appearance', [ProfileController::class, 'appearance'])->name('appearance.edit');
});

 Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])
    ->middleware('guest')
    ->name('password.request');

 Route::middleware(['throttle:5,1'])->group(function () {
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
        ->middleware('guest')
        ->name('password.email');
});


Route::get('/settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');

Route::get('/produits', [ProduitsController::class, 'index']);
Route::get('/produits/{id}', [ProduitsController::class, 'show'])->name('produits.show');


Route::middleware('auth')->post('/ajouter-au-panier', [PanierController::class, 'ajouterAuPanier'])->name('panier.ajouter');

Route::get('/panier', [PanierController::class, 'afficher'])->name('panier.afficher');

Route::delete('/panier/{id}', [PanierController::class, 'supprimer'])->name('panier.supprimer');

Route::middleware(['auth'])->group(function () {
    Route::get('/paiement', [CommandeController::class, 'afficherPagePaiement'])->name('paiement.page');
    Route::post('/paiement/valider', [CommandeController::class, 'validerCommande'])->name('paiement.valider');
});

Route::get('/mes-commandes', [CommandeController::class, 'mesCommandes'])->name('commandes.mes');

Route::get('/recherche-produits', [ProduitsController::class, 'search']);

Route::get('/dashboard', [AdminDashboardController::class, 'index'])
    ->middleware(['auth',])
    ->name('dashboard');

Route::middleware(['auth', AdminMiddleware::class])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        Route::get('/produits', [ProduitsController::class, 'index'])->name('produits.index');
        Route::get('/produits/creer', [ProduitsController::class, 'create'])->name('produits.create'); 
        Route::post('/produits', [ProduitsController::class, 'store'])->name('produits.store');
        Route::put('/produits/{produit}', [ProduitsController::class, 'update'])->name('produits.update');
        Route::delete('/produits/{produit}', [ProduitsController::class, 'destroy'])->name('produits.destroy');

        Route::get('/utilisateurs', [AdminDashboardController::class, 'users'])->name('utilisateurs.index');
        Route::put('/utilisateurs/{id}', [AdminDashboardController::class, 'update'])->name('utilisateurs.update');
        Route::delete('/utilisateurs/{id}', [AdminDashboardController::class, 'destroy'])->name('utilisateurs.destroy');

      
        Route::get('/commandes', [AdminDashboardController::class, 'commandes'])->name('commandes.index');
        Route::put('/commandes/{id}', [AdminDashboardController::class, 'update'])->name('commandes.update');
        Route::delete('/commandes/{id}', [AdminDashboardController::class, 'destroy'])->name('commandes.destroy');
});

// Routes de test

Route::middleware(['web', 'admin'])->get('/dummy-admin-route', function () {
    return 'admin only content';
});

Route::post('/cart/add', [PanierController::class, 'ajouterAuPanier'])->name('panier.ajouter');
Route::post('/order/checkout', [CommandeController::class, 'validerCommande'])->name('commande.checkout');

