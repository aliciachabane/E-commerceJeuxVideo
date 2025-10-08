<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureTwoFactorIsConfirmed
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        if ($user && ! $user->two_factor_confirmed) {
            // Redirige vers la page 2FA challenge/instruction
            return redirect()->route('two-factor.challenge');
        }

        return $next($request);
    }
}
