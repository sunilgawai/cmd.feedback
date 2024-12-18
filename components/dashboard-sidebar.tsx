"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  CreditCard,
  Settings,
  Menu,
  LogOut,
  User,
  Bell,
  HelpCircle,
  Github,
  Users,
  TowerControl,
  UsersRoundIcon,
  Users2,
  MessagesSquare,
  Logs,
  PiggyBank,
  Coins,
  ArrowDownAZIcon,
  GitPullRequest,
  Mail
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";
import { RiOrderPlayLine } from "react-icons/ri";

const primaryNavItems = [
  {
    title: "Home",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: UsersRoundIcon,
  },
  {
    title: "Customer Submissions",
    href: "/dashboard/submissions",
    icon: UsersRoundIcon,
  },
  {
    title: "Send Emails",
    href: "/dashboard/send",
    icon: Mail,
  },
  {
    title: "Offers",
    href: "/dashboard/offers",
    icon: GitPullRequest,
  },
  {
    title: "Vouchers",
    href: "/dashboard/vouchers",
    icon: RiOrderPlayLine,
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: Coins,
  },
];

const secondaryNavItems = [
  {
    title: "Logo",
    href: "/dashboard/logos",
    icon: Coins,
    external: false,
  },
  {
    title: "Banners",
    href: "/dashboard/banners",
    icon: Coins,
    external: false,
  },
  {
    title: "Menus",
    href: "/dashboard/menus",
    icon: Coins,
    external: false,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    external: false,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <>
      <Sidebar suppressHydrationWarning>
        <SidebarHeader className="border-b p-4 mb-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl">{siteConfig.name}</span>
          </Link>
        </SidebarHeader>
        <SidebarContent className="flex flex-col gap-6">
          <SidebarMenu>
            {primaryNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                    pathname === item.href
                      ? "bg-accent text-black"
                      : "text-muted-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>

          <div>
            <div className="px-4 py-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Resources
              </p>
            </div>
            <SidebarMenu>
              {secondaryNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
        </SidebarContent>
        <SidebarFooter className="border-t p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 px-2"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src={session?.user?.image ?? undefined} />
                  <AvatarFallback>
                    {session?.user?.name?.[0]?.toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1 text-left">
                  <span className="text-sm font-medium">
                    {session?.user?.name ?? "User"}
                  </span>
                  <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                    {session?.user?.email}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="cursor-pointer">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut()}
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarTrigger className="fixed left-4 top-3 lg:hidden">
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SidebarTrigger>
    </>
  );
}
