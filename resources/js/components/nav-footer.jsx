import React from 'react';
import { Icon } from '@/components/icon';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';

const footerItems = [
  { title: 'Accueil', url: '/', icon: 'home' },
  { title: 'Catalogue', url: '/catalogue', icon: 'list' },
  { title: 'Contact', url: '/contact', icon: 'mail' },
  { title: 'Mentions légales', url: '/mentions-legales', icon: 'info' },
];

export function NavFooter({ items = footerItems, className, ...props }) {
  return (
    <SidebarGroup {...props} className={`group-data-[collapsible=icon]:p-4 mt-40 bg-transparent  dark:bg-gray-900 ${className || ''}`}>
      <SidebarGroupContent>
        <SidebarMenu className="flex flex-col md:flex-row justify-center gap-6">
          {/* Affiche chaque lien */}
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className="text-black hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-400 flex items-center gap-2 px-3 py-2 rounded">
                <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.title}>
                  {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <div className="text-center text-black text-sm mt-6">
          © 2025 GameZone - Tous droits réservés
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
