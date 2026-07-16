"use client";

import { cn } from "@/lib/utils";
import {
    IconBookFilled,
    IconHomeFilled,
    IconMenu2Filled,
    IconMessageCircleFilled,
    IconMoonFilled,
    IconSunFilled,
    IconTerminal2,
    IconX,
    IconZoomExclamation,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger,
} from "../ui/drawer";
import Navlink from "./Navlink";
import { Span } from "./Texts";

const navLinks = [
    { label: "Home", href: "/", icon: IconHomeFilled },
    { label: "Courses", href: "/courses", icon: IconBookFilled },
    { label: "Feedbacks", href: "/feedbacks", icon: IconMessageCircleFilled },
    { label: "Resources", href: "/resources", icon: IconZoomExclamation },
    { label: "Dev Tools", href: "/tools", icon: IconTerminal2 },
];

const TopNavBar = () => {
    const pathname = usePathname();
    const isRoot = pathname === "/";
    const [isScrolledDown, setIsScrolledDown] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        if (!isRoot) return;

        const handleScroll = () => {
            setIsScrolledDown(window.scrollY > 80);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isRoot]);

    const scrolled = !isRoot || isScrolledDown;

    const iconBtnClass = cn(
        "transition-colors duration-300",
        scrolled
            ? "hover:bg-foreground/8 text-foreground/50 hover:text-foreground"
            : "hover:bg-white/10 text-white/60 hover:text-white",
    );

    return (
        <header
            className={cn(
                "fixed top-0 left-0 w-full z-50 h-12 py-8 md:py-0 md:h-16 flex items-center border-b transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 ease-in-out",
                scrolled
                    ? "bg-background backdrop-blur-xl border-border shadow-lg"
                    : "bg-transparent backdrop-blur-none border-transparent shadow-none",
            )}
        >
            <div
                suppressHydrationWarning
                className="container mx-auto px-4 md:px-8 h-full flex items-center justify-between"
            >
                {/* Logo */}
                <div>
                    <Link
                        href="/"
                        className="relative block h-[32px] w-[140px]"
                    >
                        <Image
                            src="/cobalt-studio-dark.png"
                            alt="cobalt studio logo"
                            width={140}
                            height={32}
                            priority
                            className="hidden dark:block"
                        />
                        <Image
                            src="/cobalt-studio-light.png"
                            alt="cobalt studio logo"
                            width={140}
                            height={32}
                            priority
                            className={
                                scrolled ? "block dark:hidden" : "hidden"
                            }
                        />
                        <Image
                            src="/cobalt-studio-light-bg-dark.png"
                            alt="cobalt studio logo"
                            width={140}
                            height={32}
                            priority
                            className={
                                scrolled
                                    ? "hidden dark:hidden"
                                    : "block dark:hidden"
                            }
                        />
                    </Link>
                </div>

                {/* Nav links (desktop) */}
                <nav className="hidden md:flex items-center justify-center gap-1">
                    {navLinks.map((l) => (
                        <Navlink
                            key={l.label}
                            href={l.href}
                            isScrolled={scrolled}
                            className={cn(
                                "rounded-lg px-2.5 h-8 flex items-center",
                                scrolled
                                    ? "hover:bg-foreground/8"
                                    : "hover:bg-white/20",
                            )}
                        >
                            {l.label}
                        </Navlink>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        className={cn(iconBtnClass, "hidden md:flex")}
                        onClick={() =>
                            setTheme(
                                resolvedTheme === "dark" ? "light" : "dark",
                            )
                        }
                    >
                        <IconSunFilled
                            size={22}
                            className="block dark:hidden"
                        />
                        <IconMoonFilled
                            size={22}
                            className="hidden dark:block"
                        />
                    </Button>
                    <Button
                        variant="ghost"
                        className={cn(iconBtnClass, "hidden md:flex")}
                    >
                        <Span>Login</Span>
                    </Button>

                    {/* Mobile menu — shadcn Drawer */}
                    <Drawer
                        open={isDrawerOpen}
                        onOpenChange={setIsDrawerOpen}
                        direction="right"
                    >
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
                                <DrawerTitle className="sr-only">
                                    Menu
                                </DrawerTitle>
                                <DrawerClose asChild>
                                    <Button
                                        variant="ghost"
                                        className="h-8 w-8 p-0 text-foreground/60 hover:text-foreground"
                                    >
                                        <IconX size={20} />
                                    </Button>
                                </DrawerClose>
                            </div>

                            <nav className="flex flex-col gap-1 px-3 py-4">
                                {navLinks.map((l) => {
                                    const isActive = pathname === l.href;
                                    const Icon = l.icon;
                                    return (
                                        <Link
                                            key={l.label}
                                            href={l.href}
                                            onClick={() =>
                                                setIsDrawerOpen(false)
                                            }
                                            className={cn(
                                                "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors",
                                                isActive
                                                    ? "bg-primary/10 text-primary"
                                                    : "text-foreground/80 hover:bg-foreground/5 hover:text-foreground",
                                            )}
                                        >
                                            <Icon
                                                size={18}
                                                className="shrink-0"
                                            />
                                            {l.label}
                                        </Link>
                                    );
                                })}
                            </nav>

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
                                            className="block dark:hidden"
                                        />
                                        <IconMoonFilled
                                            size={15}
                                            className="hidden dark:block"
                                        />
                                    </span>
                                </button>
                                <Button
                                    variant="secondary"
                                    className="w-full rounded-lg"
                                >
                                    Login
                                </Button>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>
        </header>
    );
};

export default TopNavBar;
