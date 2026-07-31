"use client";

import { Span } from "@/components/global/Texts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import {
    IconMenu2Filled,
    IconMoonFilled,
    IconSunFilled,
    IconX,
} from "@tabler/icons-react";
import { LayoutGrid, LogOut, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const TopBar = () => {
    const { setTheme, resolvedTheme } = useTheme();

    const { user, logout, loading } = useAuth();

    const name = user?.displayName || user?.email?.split("@")[0] || "User";
    const email = user?.email || "";
    const initials =
        name
            .split(/\s+/)
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "U";
    const role = user?.role;

    const iconBtnClass = cn(
        "transition-colors duration-200 text-muted-foreground hover:text-foreground hover:bg-accent",
    );

    return (
        <header className="sticky top-0 z-30 h-16 w-full flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-4 md:px-6">
            {/* Left side: Sidebar Trigger */}
            <div className="flex items-center gap-3 ">
                <SidebarTrigger className="-ml-1" />
            </div>

            {/* Right side: Actions */}
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(iconBtnClass, "hidden md:flex")}
                    onClick={() =>
                        setTheme(resolvedTheme === "dark" ? "light" : "dark")
                    }
                >
                    <IconSunFilled size={20} className="block dark:hidden" />
                    <IconMoonFilled size={20} className="hidden dark:block" />
                </Button>
                {loading ? (
                    <div className="relative w-12 h-8 flex items-center justify-center overflow-hidden">
                        <span className="absolute size-1 bg-primary rounded-full animate-win-dot-1 shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
                        <span className="absolute size-1 bg-primary rounded-full animate-win-dot-2 shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
                        <span className="absolute size-1 bg-primary rounded-full animate-win-dot-3 shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
                    </div>
                ) : user ? (
                    <div className="pl-2 border-l-2 border-l-primary/30 pr-10">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex cursor-pointer focus:outline-none transition-transform hover:scale-105">
                                    <Avatar className="size-8 rounded-lg after:rounded-lg bg-primary text-primary-foreground shadow-md shadow-primary/20">
                                        <AvatarFallback className="rounded-lg bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center">
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-80 p-0 overflow-hidden rounded-2xl! bg-white dark:bg-[#0c0a09] border border-gray-100 dark:border-zinc-800 shadow-2xl transition-colors duration-200">
                                {/* Header Section */}
                                <div className="p-5 flex items-center gap-4 bg-linear-to-b from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent">
                                    {/* Avatar */}
                                    <Avatar className="size-14 rounded-2xl after:rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                                        {user?.photoURL && (
                                            <AvatarImage
                                                src={user?.photoURL}
                                                alt={name}
                                                className="rounded-2xl"
                                                referrerPolicy="no-referrer"
                                            />
                                        )}
                                        <AvatarFallback className="rounded-2xl bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center">
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>

                                    {/* User Details */}
                                    <div className="flex flex-col overflow-hidden">
                                        <h3 className="font-bold text-base text-gray-900 dark:text-white truncate">
                                            {name}
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-zinc-400 truncate mb-1.5">
                                            {email}
                                        </p>
                                        <span className="inline-block w-fit px-2.5 py-0.5 rounded-md bg-primary text-primary-foreground text-[11px] font-medium leading-tight">
                                            {role}
                                        </span>
                                    </div>
                                </div>

                                {/* Navigation Options */}
                                <div className="py-2 px-3">
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href="/dashboard"
                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/10 text-foreground/80 hover:text-primary font-medium text-sm transition-colors cursor-pointer outline-none"
                                        >
                                            <LayoutGrid className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
                                            <span>Studio Dashboard</span>
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem asChild>
                                        <Link
                                            href="/profile"
                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/10 text-foreground/80 hover:text-primary font-medium text-sm transition-colors cursor-pointer outline-none"
                                        >
                                            <User className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
                                            <span>Profile</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </div>

                                {/* Divider */}
                                <DropdownMenuSeparator className="my-1" />

                                {/* Logout Action */}
                                <div className="p-3 pt-2">
                                    <DropdownMenuItem asChild>
                                        <button
                                            onClick={logout}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-destructive/10 text-foreground/80 hover:text-destructive font-medium text-sm transition-colors cursor-pointer outline-none"
                                        >
                                            <LogOut className="w-4 h-4 text-gray-500 dark:text-zinc-400 group-hover:text-destructive" />
                                            <span className="tracking-wide">
                                                Sign out
                                            </span>
                                        </button>
                                    </DropdownMenuItem>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    <Link href={"/signin"}>
                        <Button
                            variant="ghost"
                            className={cn(
                                iconBtnClass,
                                "hidden md:flex cursor-pointer",
                            )}
                        >
                            <Span>Sign in</Span>
                        </Button>
                    </Link>
                )}

                {/* Mobile menu — shadcn Drawer */}
                <Drawer direction="right">
                    <DrawerTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(iconBtnClass, "flex md:hidden")}
                        >
                            <IconMenu2Filled size={20} />
                        </Button>
                    </DrawerTrigger>

                    <DrawerContent className="h-full w-[80%] max-w-xs rounded-none border-l border-border data-[vaul-drawer-direction=right]:sm:max-w-xs">
                        <div className="flex items-center justify-end border-b border-border px-5 py-4">
                            <DrawerTitle className="sr-only">Menu</DrawerTitle>
                            <DrawerClose asChild>
                                <Button
                                    variant="ghost"
                                    className="h-8 w-8 p-0 text-foreground/60 hover:text-foreground"
                                >
                                    <IconX size={20} />
                                </Button>
                            </DrawerClose>
                        </div>

                        <div className="mt-auto border-t border-border px-4 py-4 flex flex-col gap-2">
                            <button
                                className="flex items-center justify-between w-full rounded-lg px-2 py-2 text-sm text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
                                onClick={() =>
                                    setTheme(
                                        resolvedTheme === "dark"
                                            ? "light"
                                            : "dark",
                                    )
                                }
                            >
                                <Span className="text-lg">Theme</Span>
                                <span className="h-8 w-8 flex items-center justify-center rounded-md border border-border">
                                    <IconSunFilled
                                        size={15}
                                        className={cn("block dark:hidden")}
                                    />
                                    <IconMoonFilled
                                        size={15}
                                        className={cn("hidden dark:block")}
                                    />
                                </span>
                            </button>
                            {user ? (
                                <Button
                                    variant="secondary"
                                    className="w-full rounded-lg cursor-pointer"
                                >
                                    Sign out
                                </Button>
                            ) : (
                                <Link href={"/signin"}>
                                    <Button
                                        variant="secondary"
                                        className="w-full rounded-lg"
                                    >
                                        Sign in
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </header>
    );
};

export default TopBar;
