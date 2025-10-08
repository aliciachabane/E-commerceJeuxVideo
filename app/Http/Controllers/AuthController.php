<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Providers\RouteServiceProvider;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user', 
        ]);

        Auth::login($user);

        // Retour direct à l'accueil connecté utilisateur
        return redirect()->route('acceuil.connecter');
    }

    public function showLoginForm()
    {
        return Inertia::render('auth/Login');
    }

    public function showRegisterForm()
    {
        return Inertia::render('auth/Register');
    }

 public function loginSubmit(Request $request)
{
    $credentials = $request->validate([
        'email' => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();
        return redirect()->intended(RouteServiceProvider::HOME);
    }

    return back()->withErrors([
        'email' => 'Les informations de connexion sont invalides.',
    ]);
}
    
        
        // $request->validate([
        //     'email' => 'required|email',
        //     'password' => 'required|min:6',
        // ]);

    //     $credentials = $request->only('email', 'password');

    //     if (Auth::attempt($credentials)) {
    //         $request->session()->regenerate();

    //         $user = Auth::user();

    //         return $user->role === 'admin'
    //             ? redirect()->route('dashboard')
    //             : redirect()->route('acceuil.connecter');
    //     }

    //     return Inertia::render('auth/Login', [
    //         'error' => 'Email ou mot de passe incorrect.',
    //     ]);
    // }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home');
    }
}
