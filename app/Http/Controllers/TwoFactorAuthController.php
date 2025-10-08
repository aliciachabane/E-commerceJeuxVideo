<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PragmaRX\Google2FAQRCode\Google2FA;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TwoFactorAuthController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $qrCode = null;
        $recoveryCodes = [];

        // Si 2FA activée, on génère QR + codes
        if ($user->two_factor_secret) {
            $google2fa = new Google2FA();

            $qrCode = $google2fa->getQRCodeInline(
                config('app.name'),
                $user->email,
                $user->two_factor_secret
            );

            $recoveryCodes = json_decode(decrypt($user->two_factor_recovery_codes), true);
        }

        return Inertia::render('settings/Enable2FA', [
            'user' => $user,
            'qrCode' => $qrCode,
            'recoveryCodes' => $recoveryCodes,
        ]);
    }

public function enable(Request $request)
{
    $user = $request->user();
    $google2fa = new Google2FA();

    // Générer la clé secrète
    $secret = $google2fa->generateSecretKey();

    // Générer les codes de récupération
    $recoveryCodes = [
        Str::random(10),
        Str::random(10),
        Str::random(10),
    ];

    // Mettre à jour l'utilisateur
    $user->update([
        'two_factor_secret' => encrypt($secret),
        'two_factor_recovery_codes' => encrypt(json_encode($recoveryCodes)),
    ]);

    // Générer le QR Code base64
    $qrCodeUrl = $google2fa->getQRCodeInline(
        config('app.name'),
        $user->email,
        $secret
    );

    // Retourner tout en JSON
    return response()->json([
        'secret' => $secret,
        'recoveryCodes' => $recoveryCodes,
        'qrCodeUrl' => $qrCodeUrl, // base64 prêt à afficher
    ]);
}

public function verify2FA(Request $request)

{
    $request->validate(['code' => 'required']);

    $google2fa = new Google2FA();

    // Décrypter le secret avant vérification
    $secret = decrypt($request->user()->two_factor_secret);

    $valid = $google2fa->verifyKey(
        $secret,
        $request->input('code')
    );

    if ($valid) {
        $request->user()->update(['two_factor_confirmed_at' => now()]);
        return response()->json(['success' => true]);
    }

    return response()->json(['success' => false], 422);
}
}
