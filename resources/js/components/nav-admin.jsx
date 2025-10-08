import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { UserInfo } from '@/components/user-info';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePage, router, Link } from '@inertiajs/react';

export function NavAdmin() {
  const { auth } = usePage().props;
  const { state } = useSidebar();
  const isMobile = useIsMobile();

  const handleLogout = (e) => {
    e.preventDefault();
    router.post('/logout');
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent group">
              {auth?.user ? (
                <UserInfo user={auth.user} />
              ) : (
                <span className="text-gray-400 italic">Non connecté</span>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            align="end"
            side={isMobile ? 'bottom' : state === 'collapsed' ? 'left' : 'bottom'}>
            <div className="border-t mt-2 pt-2">
              <div className="block px-4 py-2 bg-gray-100 rounded">
                Tableau de bord admin
              
              <Link href="/admin/user" className="block px-4 py-2 hover:bg-gray-100 rounded">Gérer les Utilisateurs</Link>
              <Link href="/admin/commandes" className="block px-4 py-2 hover:bg-gray-100 rounded">Gérer les Commandes</Link>
              <Link href="/admin/products" className="block px-4 py-2 hover:bg-gray-100 rounded">Gérer les produits</Link>
              <Link href="/admin/store" className="block px-4 py-2 hover:bg-gray-100 rounded">Créer des Produits</Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100 rounded">
                Déconnexion
              </button>
            </div>
         </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
