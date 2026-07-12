"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlink = ({
    href,
    children,
    className,
    isScrolled = false,
}: {
    href: string;
    children: React.ReactNode;
    className?: string;
    isScrolled?: boolean;
}) => {
    const pathName = usePathname();
    const isActive = pathName === href;
    return (
        <Link
            href={href}
            className={cn(
                "transition-colors duration-300 text-sm font-medium",
                isActive
                    ? isScrolled
                        ? "text-foreground"
                        : "text-white"
                    : isScrolled
                      ? "text-foreground/50 hover:text-foreground!"
                      : "text-white/60 hover:text-white!",
                className,
            )}
        >
            {children}
        </Link>
    );
};

export default Navlink;
