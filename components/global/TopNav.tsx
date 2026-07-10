import { IconMoonFilled, IconSparkles } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import Navlink from "./Navlink";
import { Span } from "./Texts";

const TopNav = ({ isScrolled = false }: { isScrolled?: boolean }) => {
    const navLinks = [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Courses",
            href: "/courses",
        },
        {
            label: "Feedbacks",
            href: "/feedbacks",
        },
        {
            label: "YouTube",
            href: "/youtube",
        },
        {
            label: "Motion Tool",
            href: "/motion-tool",
        },
    ];
    return (
        <div className="container mx-auto px-4 md:px-8 h-full flex items-center justify-between">
            <div>
                <Link href={"/"} className="relative block h-[32px] w-[140px]">
                    <Image
                        src="/cobalt-studio-dark.png"
                        alt="cobalt studio logo"
                        width={140}
                        height={32}
                        priority
                        className={isScrolled ? "hidden dark:block" : "block"}
                    />
                    <Image
                        src="/cobalt-studio-light.png"
                        alt="cobalt studio logo"
                        width={140}
                        height={32}
                        priority
                        className={isScrolled ? "block dark:hidden" : "hidden"}
                    />
                </Link>
            </div>
            <nav className="hidden lg:flex items-center justify-center gap-1">
                {navLinks.map((l) => (
                    <Button
                        variant={"ghost"}
                        key={l.label}
                        className="hover:bg-muted/18"
                        asChild
                    >
                        <Navlink href={l.href}>{l.label}</Navlink>
                    </Button>
                ))}
                <Button
                    className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-4.5 py-1.5 flex items-center gap-1.5 shadow-md shadow-primary/25 transition-all duration-300 ml-2 cursor-pointer"
                    asChild
                >
                    <Link href={"#"}>
                        <IconSparkles className="size-4 text-white" />
                        <span>{"Batch 1"}</span>
                    </Link>
                </Button>
            </nav>
            <div className="flex items-center gap-3">
                <Button
                    variant={"ghost"}
                    className="hover:bg-muted/18 text-white/60 hover:text-white! group-[.header-scrolled]:text-zinc-500 group-[.header-scrolled]:hover:text-zinc-950! dark:group-[.header-scrolled]:text-zinc-400 dark:group-[.header-scrolled]:hover:text-zinc-100! transition-colors duration-200"
                >
                    <IconMoonFilled size={22} />
                </Button>
                <Button
                    variant={"ghost"}
                    className="hover:bg-muted/18 text-white/60 hover:text-white! group-[.header-scrolled]:text-zinc-500 group-[.header-scrolled]:hover:text-zinc-950! dark:group-[.header-scrolled]:text-zinc-400 dark:group-[.header-scrolled]:hover:text-zinc-100! transition-colors duration-200"
                >
                    <Span>Login</Span>
                </Button>
            </div>
        </div>
    );
};

export default TopNav;
