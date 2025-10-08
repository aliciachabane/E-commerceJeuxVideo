import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import SettingsLayout from '@/layouts/settings/layout';
import AppLayout from '@/layouts/app-layout';
import axios from 'axios';

export default function Enable2FA({ user }) {
  const [twoFAEnabled, setTwoFAEnabled] = useState(!!user.two_factor_secret);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [recoveryCodes, setRecoveryCodes] = useState([]);
  const [secret, setSecret] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showRecoveryCodes, setShowRecoveryCodes] = useState(false);

  const enable2FA = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/settings/2fa/enable');
      setSecret(response.data.secret);
      setRecoveryCodes(response.data.recoveryCodes);
      setQrCodeUrl(response.data.qrCodeUrl);
      setTwoFAEnabled(true);
      setShowRecoveryCodes(true);
    } catch (error) {
      console.error('Erreur lors de l’activation de la 2FA :', error);
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbs = [
    { title: 'Paramètres', href: '/settings' },
    { title: 'Double authentification', href: '/settings/2fa' },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Sécurité / Two-Factor Authentication" />

      <SettingsLayout>
        <div className="space-y-6">
          {!twoFAEnabled ? (
            <div>
              <p className="mb-4">
                La 2FA n’est pas encore activée pour votre compte.
              </p>
              <Button onClick={enable2FA} disabled={loading}>
                {loading ? 'Activation...' : 'Activer la 2FA'}
              </Button>
            </div>
          ) : (
            <>
              {qrCodeUrl && (
                <div>
                  <h2 className="font-bold text-lg">Scannez ce QR Code</h2>
                    <img src={`data:image/png;base64,${qrCodeUrl}`} alt="QR Code 2FA" />
                  <p className="mt-2">
                    Utilisez votre application Authenticator pour scanner le QR code et obtenir votre code TOTP.
                  </p>

                  {/* Vérification du code TOTP */}
                  <Verify2FA />
                </div>
              )}

              <div className="mt-4">
                <h2 className="font-bold text-lg">Codes de récupération</h2>
                <button
                  onClick={() => setShowRecoveryCodes(!showRecoveryCodes)}
                  className="mt-2 mb-2 underline text-blue-600"
                >
                  {showRecoveryCodes ? 'Masquer les codes' : 'Afficher les codes'}
                </button>
                {showRecoveryCodes && (
                  <ul className="list-disc ml-5">
                    {recoveryCodes.map((code, idx) => (
                      <li key={idx}>{code}</li>
                    ))}
                  </ul>
                )}
                {showRecoveryCodes && (
                  <p className="text-sm italic text-gray-600 mt-2">
                    Ces codes sont très importants. Conservez-les en lieu sûr, car ils permettent de récupérer l'accès en cas de perte de votre téléphone.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}

function Verify2FA() {
  const [code, setCode] = useState('');
  const [success, setSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const verifyCode = async () => {
    if (!/^\d{6}$/.test(code)) {
      setErrorMessage('Le code doit contenir 6 chiffres.');
      setSuccess(false);
      return;
    }
    try {
      setErrorMessage('');
      const response = await axios.post('/settings/2fa/verify', { code });
      setSuccess(response.data.success);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Code invalide, veuillez réessayer.');
      } else {
        setErrorMessage('Erreur serveur, veuillez réessayer.');
      }
      setSuccess(false);
    }
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder="Entrez le code TOTP"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border p-2 rounded"
        maxLength={6}
      />
      <button
        onClick={verifyCode}
        className="ml-2 px-3 py-2 bg-blue-600 text-white rounded"
        disabled={code.length !== 6}
      >
        Vérifier
      </button>
      {success === true && <p className="text-green-600 mt-2">2FA activée ✅</p>}
      {success === false && <p className="text-red-600 mt-2">{errorMessage}</p>}
    </div>
  );
}
