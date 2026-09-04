import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { H1, Span } from "./Texts";

export interface BrandLogoProps {
    scrolled?: boolean;
    isHome?: boolean;
    href?: string | null;
    className?: string;
    imageClassName?: string;
    textClassName?: string;
    cobaltClassName?: string;
    studioClassName?: string;
    priority?: boolean;
    asH1?: boolean;
}

const BrandLogo = ({
    scrolled = false,
    isHome = false,
    href = "/",
    className,
    imageClassName,
    textClassName,
    cobaltClassName,
    studioClassName,
    priority = false,
    asH1 = false,
}: BrandLogoProps) => {
    // Only in the transparent navbar over the dark hero at the top of the home page
    // does "Cobalt" use "text-muted" in light theme (so it's light on the dark hero).
    // Everywhere else (footer, other routes, scrolled navbar, dashboard),
    // "Cobalt" is "text-secondary-foreground" (dark in light theme, white in dark theme).
    const isHeroNav = isHome && !scrolled;
    const cobaltColor = isHeroNav
        ? "text-muted dark:text-secondary-foreground"
        : "text-secondary-foreground";

    // In dark theme, only when scrolling down on the home page does the logo
    // turn into the white logo (/cobalt_logo_white.png).
    // Everywhere else (top of home page, other routes, footer, dashboard),
    // the blue primary logo (/favicon.png) is displayed.
    const showWhiteLogo = isHome && scrolled;

    const HeadingTag = asH1 ? H1 : Span;

    const content = (
        <>
            <div
                className={cn(
                    "relative h-7 aspect-445/560 shrink-0",
                    imageClassName,
                )}
            >
                {/* Primary Blue Logo */}
                <Image
                    src="/favicon.png"
                    alt="Cobalt Studio Logo"
                    width={26}
                    height={32}
                    priority={priority}
                    className={cn(
                        "absolute inset-0 h-full w-full object-contain transition-all duration-500 ease-in-out opacity-100 scale-100",
                        showWhiteLogo &&
                            "dark:opacity-0 dark:scale-90 dark:pointer-events-none",
                    )}
                />
                {/* White Logo (Crossfades in dark theme on homepage scroll) */}
                <Image
                    src="/cobalt_logo_white.png"
                    alt="Cobalt Studio Logo"
                    width={26}
                    height={32}
                    priority={priority}
                    className={cn(
                        "absolute inset-0 h-full w-full object-contain transition-all duration-500 ease-in-out hidden dark:block",
                        showWhiteLogo
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-90 pointer-events-none",
                    )}
                />
            </div>

            <HeadingTag
                className={cn(
                    "text-lg font-bold tracking-tight inline-flex items-center gap-1.5 select-none",
                    textClassName,
                )}
            >
                <Span
                    className={cn(
                        "transition-colors duration-500 ease-in-out",
                        cobaltColor,
                        cobaltClassName,
                    )}
                >
                    Cobalt
                </Span>
                <Span
                    className={cn(
                        "text-muted-foreground transition-colors duration-500 ease-in-out",
                        studioClassName,
                    )}
                >
                    Studio
                </Span>
            </HeadingTag>
        </>
    );

    const containerClasses = cn(
        "inline-flex items-center gap-2.5 group transition-all duration-300",
        className,
    );

    if (href) {
        return (
            <Link href={href} className={containerClasses}>
                {content}
            </Link>
        );
    }

    return <div className={containerClasses}>{content}</div>;
};

export { BrandLogo };
export default BrandLogo;
