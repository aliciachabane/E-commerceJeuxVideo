import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'user', 
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <AuthLayout title="Créer un compte" description="Entrer vos informations">
      <Head title="Register" />
      <form className="flex flex-col gap-6" onSubmit={submit}>
        <div className="grid gap-6">
          
          <div className="grid gap-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              type="text"
              required
              autoFocus
              autoComplete="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              disabled={processing}
              placeholder="Votre nom complet"
            />
            <InputError message={errors.name} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              disabled={processing}
              placeholder="email@example.com"
            />
            <InputError message={errors.email} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              required
              autoComplete="new-password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              disabled={processing}
              placeholder="Mot de passe"
            />
            <InputError message={errors.password} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password_confirmation">Confirmer le mot de passe</Label>
            <Input
              id="password_confirmation"
              type="password"
              required
              autoComplete="new-password"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              disabled={processing}
              placeholder="Confirmez le mot de passe"
            />
            <InputError message={errors.password_confirmation} />
          </div>

          <Button type="submit" className="mt-2 w-full" disabled={processing}>
            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
            S'enregistrer
          </Button>

          <div className="text-muted-foreground text-center text-sm mt-4">
            Déjà un compte ?{' '}
            <TextLink href={route('login')}>
              Connectez-vous
            </TextLink>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}
