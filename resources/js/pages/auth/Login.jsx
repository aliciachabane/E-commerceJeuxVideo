import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import AuthLayout from '@/layouts/auth-layout';

export default function Login({ status, error }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        role: 'user', 
        remember: false,
        admin_code: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Connexion à votre compte" description="Entrez votre email et mot de passe pour vous connecter">
            <Head title="Connexion" />

            {error && (
                <div className="mb-4 text-sm font-medium text-red-600 text-center">
                    {error}
                </div>
            )}

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">

                    {/* Sélecteur de rôle */}
                    <div className="grid gap-2">
                        <Label htmlFor="role">Rôle</Label>
                        <select
                            id="role"
                            name="role"
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                            disabled={processing}
                            className="border rounded p-2">
                            <option value="user">Utilisateur</option>
                            <option value="admin">Administrateur</option>
                        </select>
                        <InputError message={errors.role} />
                    </div>

                    {data.role === 'admin' && (
                        <div className="grid gap-2">
                            <Label htmlFor="admin_code">Code Administrateur</Label>
                            <Input
                                id="admin_code"
                                type="text"
                                value={data.admin_code}
                                onChange={(e) => setData('admin_code', e.target.value)}
                                disabled={processing}
                                placeholder="Code secret admin"
                            />
                            <InputError message={errors.admin_code} />
                        </div>
                    )}

                    {/* Champ Email */}
                    <div className="grid gap-2">
                        <Label htmlFor="email">Adresse email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                            disabled={processing}
                        />
                        <InputError message={errors.email} />
                    </div>

                    {/* Champ Mot de passe */}
                    <div className="grid gap-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Mot de passe"
                            disabled={processing}
                        />
                        <InputError message={errors.password} />
                    </div>

                    {/* Checkbox Remember Me */}
                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            disabled={processing}
                        />
                        <Label htmlFor="remember">Se souvenir de moi</Label>
                    </div>

                    {/* Bouton de connexion */}
                    <Button type="submit" className="mt-4 w-full" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                        Se connecter
                    </Button>
                </div>

                {/* Message de succès */}
                {status && (
                    <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>
                )}

                {/* Lien vers l'inscription */}
                <div className="text-muted-foreground text-center text-sm mt-4">
                    Pas encore de compte ? <a href={route('register')} className="underline">Créer un compte</a>
                </div>
            </form>
        </AuthLayout>
    );
}