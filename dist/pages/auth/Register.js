import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
        admin_code: '',
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };
    return (_jsxs(AuthLayout, { title: "Cr\u00E9er un compte", description: "Entrer vos informations", children: [_jsx(Head, { title: "Register" }), _jsxs("form", { className: "flex flex-col gap-6", onSubmit: submit, children: [_jsxs("div", { className: "grid gap-6", children: [_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "role", children: "R\u00F4le" }), _jsxs("select", { id: "role", name: "role", value: data.role, onChange: (e) => setData('role', e.target.value), disabled: processing, className: "border rounded p-2", children: [_jsx("option", { value: "user", children: "Utilisateur" }), _jsx("option", { value: "admin", children: "Administrateur" })] }), _jsx(InputError, { message: errors.role })] }), data.role === 'admin' && (_jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "admin_code", children: "Code Administrateur" }), _jsx(Input, { id: "admin_code", type: "text", value: data.admin_code, onChange: (e) => setData('admin_code', e.target.value), disabled: processing, placeholder: "Code secret admin" }), _jsx(InputError, { message: errors.admin_code })] })), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "name", children: "Nom" }), _jsx(Input, { id: "name", type: "text", required: true, autoFocus: true, autoComplete: "name", value: data.name, onChange: (e) => setData('name', e.target.value), disabled: processing, placeholder: "Votre nom complet" }), _jsx(InputError, { message: errors.name })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "email", children: "Email" }), _jsx(Input, { id: "email", type: "email", required: true, autoComplete: "email", value: data.email, onChange: (e) => setData('email', e.target.value), disabled: processing, placeholder: "email@example.com" }), _jsx(InputError, { message: errors.email })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "password", children: "Mot de passe" }), _jsx(Input, { id: "password", type: "password", required: true, autoComplete: "new-password", value: data.password, onChange: (e) => setData('password', e.target.value), disabled: processing, placeholder: "Mot de passe" }), _jsx(InputError, { message: errors.password })] }), _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "password_confirmation", children: "Confirmer le mot de passe" }), _jsx(Input, { id: "password_confirmation", type: "password", required: true, autoComplete: "new-password", value: data.password_confirmation, onChange: (e) => setData('password_confirmation', e.target.value), disabled: processing, placeholder: "Confirmez le mot de passe" }), _jsx(InputError, { message: errors.password_confirmation })] }), _jsxs(Button, { type: "submit", className: "mt-2 w-full", disabled: processing, children: [processing && _jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }), "S'enregistrer"] })] }), _jsxs("div", { className: "text-muted-foreground text-center text-sm mt-4", children: ["D\u00E9j\u00E0 un compte ?", ' ', _jsx(TextLink, { href: route('login'), children: "Connectez-vous" })] })] })] }));
}
