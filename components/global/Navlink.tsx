"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlink = ({
    href,
    children,
    className,
}: {
    href: string;
    children: React.ReactNode;
    className?: string;
}) => {
    const pathName = usePathname();
    const isActive = pathName === href;
    return (
        <Link
            href={href}
            className={cn(
                "transition-colors duration-200 text-sm font-medium",
                isActive
                    ? "text-white group-[.header-scrolled]:text-zinc-950! dark:group-[.header-scrolled]:text-white!"
                    : "text-white/60 hover:text-white! group-[.header-scrolled]:text-zinc-500 group-[.header-scrolled]:hover:text-zinc-950! dark:group-[.header-scrolled]:text-zinc-400 dark:group-[.header-scrolled]:hover:!text-zinc-100",
                className,
            )}
        >
            {children}
        </Link>
    );
};

export default Navlink;
