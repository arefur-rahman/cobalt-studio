"use client";

import BrandLogo from "@/components/global/BrandLogo";
import {
    BookOpen,
    DollarSign,
    HelpCircle,
    LayoutGrid,
    Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar";
import TopBar from "./components/global/TopBar";

// Navigation Items
const navigationItems = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutGrid,
    },
    {
        title: "My Courses",
        url: "/my-courses",
        icon: BookOpen,
    },
    {
        title: "Payments",
        url: "/payments",
        icon: DollarSign,
    },
    {
        title: "Help & Support",
        url: "/support",
        icon: HelpCircle,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <SidebarProvider defaultOpen={true}>
            <Sidebar className="border-r border-sidebar-border bg-sidebar">
                {/* Header / Logo */}
                <SidebarHeader className="p-4 border-b border-sidebar-border/50">
                    <BrandLogo priority />
                </SidebarHeader>

                {/* Main Content */}
                <SidebarContent className="px-2 mt-2">
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-xs uppercase text-muted-foreground px-2 py-1 font-semibold">
                            STUDENT
                        </SidebarGroupLabel>
                        <SidebarGroupContent className="mt-2">
                            <SidebarMenu>
                                {navigationItems.map((item) => {
                                    const isActive = pathname === item.url;
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={isActive}
                                                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                    isActive
                                                        ? "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary font-semibold"
                                                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                                }`}
                                            >
                                                <Link
                                                    href={item.url}
                                                    className="flex items-center gap-3 w-full"
                                                >
                                                    <item.icon className="h-4 w-4 shrink-0" />
                                                    <span className="flex-1">
                                                        {item.title}
                                                    </span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>

            <SidebarInset className="flex flex-col flex-1 min-h-screen">
                <TopBar />
                <main className="flex-1 p-6">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    );
}
