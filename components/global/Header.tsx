"use client";

import { cn } from "@/lib/utils";
import {
    IconMoonFilled,
    IconSparkles,
    IconSunFilled,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Navlink from "./Navlink";
import { Span } from "./Texts";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Feedbacks", href: "/feedbacks" },
    { label: "YouTube", href: "/youtube" },
    { label: "Motion Tool", href: "/motion-tool" },
];

const TopNavBar = () => {
    const pathname = usePathname();
    const isRoot = pathname === "/";
    const [isScrolledDown, setIsScrolledDown] = useState(false);
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
            className={`fixed top-0 left-0 w-full z-50 h-12 md:h-16 flex items-center border-b
                transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 ease-in-out
                ${
                    scrolled
                        ? "bg-background backdrop-blur-xl border-border shadow-lg"
                        : "bg-transparent backdrop-blur-none border-transparent shadow-none"
                }`}
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

                {/* Nav links */}
                <nav className="hidden lg:flex items-center justify-center gap-1">
                    {navLinks.map((l) => (
                        <Button
                            variant="ghost"
                            key={l.label}
                            className={cn(
                                "transition-colors duration-300",
                                scrolled
                                    ? "hover:bg-foreground/8"
                                    : "hover:bg-white/20",
                            )}
                            asChild
                        >
                            <Navlink href={l.href} isScrolled={scrolled}>
                                {l.label}
                            </Navlink>
                        </Button>
                    ))}
                    <Button
                        className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-4.5 py-1.5 flex items-center gap-1.5 shadow-md shadow-primary/25 transition-all duration-300 ml-2 cursor-pointer"
                        asChild
                    >
                        <Link href="#">
                            <IconSparkles className="size-4 text-white" />
                            <span>{"Batch 1"}</span>
                        </Link>
                    </Button>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        className={iconBtnClass}
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
                    <Button variant="ghost" className={iconBtnClass}>
                        <Span>Login</Span>
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default TopNavBar;
