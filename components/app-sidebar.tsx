"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  Newspaper,
  Tags,
  FileText,
  ImageIcon,
  Settings,
  Users,
  Link2,
  Globe,
  ChevronRight,
} from "lucide-react";
import { signOutAction } from "@/app/login/actions";
import ThemeToggle from "@/components/theme-toggle";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

type AppSidebarProps = {
  className?: string;
};

export function AppSidebar({ className }: AppSidebarProps) {
  const pathname = usePathname();
  const isSettingsOpen = pathname.startsWith("/admin/settings");
  const { isMobile, setOpenMobile, state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const closeSidebarOnMobile = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="icon" className={className}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-3">
          {/* Logo - Always visible, centered when collapsed */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <LayoutDashboard className="h-5 w-5" />
          </div>

          {/* Brand text - Hidden when collapsed */}
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-semibold text-base">
              Admin Panel
            </span>
            <span className="truncate text-xs text-muted-foreground">
              Adibayu Group
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin"}>
                  <Link
                    href="/admin"
                    onClick={closeSidebarOnMobile}
                    className="flex w-full items-center gap-2"
                  >
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Content Management */}
        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith("/admin/posts")}
                >
                  <Link
                    href="/admin/posts"
                    onClick={closeSidebarOnMobile}
                    className="flex w-full items-center gap-2"
                  >
                    <Newspaper />
                    <span>Posts</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith("/admin/categories")}
                >
                  <Link
                    href="/admin/categories"
                    onClick={closeSidebarOnMobile}
                    className="flex w-full items-center gap-2"
                  >
                    <Tags />
                    <span>Categories</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/admin/tags"
                    onClick={closeSidebarOnMobile}
                    className="flex w-full items-center gap-2"
                  >
                    <FileText />
                    <span>Tags</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Site Settings */}
        <SidebarGroup>
          <SidebarGroupLabel>Site</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/admin/media"
                    onClick={closeSidebarOnMobile}
                    className="flex w-full items-center gap-2"
                  >
                    <ImageIcon />
                    <span>Media Library</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Collapsible
                  defaultOpen={isSettingsOpen}
                  className="group/collapsible"
                >
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Settings">
                      <Settings />
                      {!isCollapsed && <span>Settings</span>}
                      {!isCollapsed && (
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === "/admin/settings/company"}
                        >
                          <Link
                            href="/admin/settings/company"
                            onClick={closeSidebarOnMobile}
                            className="flex w-full items-center gap-2"
                          >
                            <LayoutDashboard />
                            <span>Company Profile</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === "/admin/settings/social"}
                        >
                          <Link
                            href="/admin/settings/social"
                            onClick={closeSidebarOnMobile}
                            className="flex w-full items-center gap-2"
                          >
                            <Link2 />
                            <span>Social Links</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === "/admin/settings/seo"}
                        >
                          <Link
                            href="/admin/settings/seo"
                            onClick={closeSidebarOnMobile}
                            className="flex w-full items-center gap-2"
                          >
                            <Globe />
                            <span>SEO</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Advanced */}
        <SidebarGroup>
          <SidebarGroupLabel>Advanced</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/admin/users"
                    onClick={closeSidebarOnMobile}
                    className="flex w-full items-center gap-2"
                  >
                    <Users />
                    <span>Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <ThemeToggle />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/"
                onClick={closeSidebarOnMobile}
                className="flex w-full items-center gap-2"
              >
                <Globe />
                <span>View Site</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <form
              action={signOutAction}
              onSubmit={() => {
                if (isMobile) setOpenMobile(false);
              }}
            >
              <SidebarMenuButton type="submit" tooltip="Logout">
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
