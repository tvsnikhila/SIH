'use client';

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  BotMessageSquare,
  User,
  ClipboardList,
  BookUser,
} from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { UserNav } from './user-nav';

export function SidebarNav() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { state } = useSidebar();
  
  const navItems = [
    { href: '/dashboard', label: t('dashboard'), icon: <LayoutDashboard /> },
    { href: '/dashboard/advisory', label: t('advisory'), icon: <BotMessageSquare /> },
    { href: '/dashboard/activity-log', label: t('activityLog'), icon: <ClipboardList /> },
    { href: '/dashboard/profile', label: t('profile'), icon: <BookUser /> },
  ];

  return (
    <>
      <SidebarHeader>
        <Logo inSidebar />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        { state === 'collapsed' && <UserNav /> }
      </SidebarFooter>
    </>
  );
}
