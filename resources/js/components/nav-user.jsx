import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { useIsMobile } from '@/hooks/use-mobile';
import { usePage } from '@inertiajs/react';

export default function NavUser() {
  const { auth } = usePage().props;
  const { state } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              // couleurs, tailles, hover personnalisés ici
              className=" bg-white  min-h-[20px]  min-w-[50px] w-[50px] rounded-full ">
              <UserInfo user={auth.user} />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-64 bg-white text-red-600 rounded-3xl-lg border border-blue-100 "
            align="start"
            side={isMobile ? 'bottom' : state === 'collapsed' ? 'left' : 'bottom'}>
            <p className="block px-4 py-2 hover:bg-blue-50 rounded text-base font-medium">Mon profil</p>
            <UserMenuContent user={auth.user} className="bg-blue-50" />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
