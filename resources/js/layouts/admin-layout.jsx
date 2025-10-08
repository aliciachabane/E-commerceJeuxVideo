import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { NavAdmin } from '@/components/nav-admin';
import { SidebarProvider } from '@/components/ui/sidebar';
import { UserInfo } from '@/components/user-info';
import { ChevronsUpDown, Menu as MenuIcon, X as CloseIcon } from 'lucide-react';

export default function AdminLayout({ children }) {
  const { auth } = usePage().props;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-gradient-to-b from-red-500 to-orange-500 flex flex-col relative overflow-x-hidden">
        {/* Header */}
        <header className="w-full  flex items-center justify-between px-4 py-3">
          {/* Logo ou titre */}
          <div className="text-white font-bold text-lg">
            Admin
          </div>

          {/* Bouton burger visible sur mobile */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Ouvrir le menu" >
            {menuOpen ? <CloseIcon size={32} /> : <MenuIcon size={32} />}
          </button>

          {/* Menu desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <NavAdmin />
              <UserInfo user={auth.user} />
              <ChevronsUpDown className="ml-1 size-4" />
           
          </nav>
        </header>

        {/* Menu mobile (menu burger) */}
        {menuOpen && (
          <div className="md:hidden absolute top-0 left-0 w-full bg-white shadow-lg  animate-fade-in-down">
            <div className="flex flex-col items-center py-6 gap-4">
              <NavAdmin />
              <div className="flex items-center gap-2">
                
               
              </div>
            </div>
          </div>
        )}

        {/* Contenu principal */}
        <main className="w-full max-w-7xl mx-auto px-4 py-12">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}