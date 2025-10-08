import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };
    return (_jsxs(AuthLayout, { title: "Connexion \u00E0 votre compte", description: "Entrez votre email et mot de passe pour vous connecter", children: [_jsx(Head, { title: "Connexion" }), error && (_jsx("div", { className: "mb-4 text-sm font-medium text-red-600 text-center", children: error })), _jsxs("form", { className: "flex flex-col gap-6", onSubmit: submit, children: [_jsxs("div", { className: "grid gap-6", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "role", children: "R\u00F4le" }), _jsxs("select", { id: "role", name: "role", value: data.role, onChange: (e) => setData('role', e.target.value), disabled: processing, className: "border rounded p-2", children: [_jsx("option", { value: "user", children: "Utilisateur" }), _jsx("option", { value: "admin", children: "Administrateur" })] }), _jsx(InputError, { message: errors.role })] }), data.role === 'admin' && (_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "admin_code", children: "Code Administrateur" }), _jsx(Input, { id: "admin_code", type: "text", value: data.admin_code, onChange: (e) => setData('admin_code', e.target.value), disabled: processing, placeholder: "Code secret admin" }), _jsx(InputError, { message: errors.admin_code })] })), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "email", children: "Adresse email" }), _jsx(Input, { id: "email", type: "email", required: true, autoFocus: true, value: data.email, onChange: (e) => setData('email', e.target.value), placeholder: "email@example.com", disabled: processing }), _jsx(InputError, { message: errors.email })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "password", children: "Mot de passe" }), _jsx(Input, { id: "password", type: "password", required: true, value: data.password, onChange: (e) => setData('password', e.target.value), placeholder: "Mot de passe", disabled: processing }), _jsx(InputError, { message: errors.password })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Checkbox, { id: "remember", name: "remember", checked: data.remember, onClick: () => setData('remember', !data.remember), disabled: processing }), _jsx(Label, { htmlFor: "remember", children: "Se souvenir de moi" })] }), _jsxs(Button, { type: "submit", className: "mt-4 w-full", disabled: processing, children: [processing && _jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }), "Se connecter"] })] }), status && (_jsx("div", { className: "mb-4 text-center text-sm font-medium text-green-600", children: status })), _jsxs("div", { className: "text-muted-foreground text-center text-sm mt-4", children: ["Pas encore de compte ? ", _jsx("a", { href: route('register'), className: "underline", children: "Cr\u00E9er un compte" })] })] })] }));
}
