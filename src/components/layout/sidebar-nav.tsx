'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  PersonStanding,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="group/sidebar flex items-center gap-3 p-2 transition-all duration-200">
           <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary transition-all duration-200 group-data-[collapsible=icon]/sidebar:h-8 group-data-[collapsible=icon]/sidebar:w-8">
            <PersonStanding className="h-6 w-6 transition-all duration-200 group-data-[collapsible=icon]/sidebar:h-5 group-data-[collapsible=icon]/sidebar:w-5" />
          </div>
          <div className="overflow-hidden transition-all duration-200 group-data-[collapsible=icon]/sidebar:w-0">
            <h1 className="text-lg font-bold">PosturePal</h1>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
