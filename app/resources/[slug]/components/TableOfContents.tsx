import { IconList } from "@tabler/icons-react";
import { motion } from "motion/react";

interface HeadingItem {
    level: number;
    text: string;
    id: string;
}

interface TableOfContentsProps {
    headings: HeadingItem[];
    activeId: string;
    onHeadingClick: (
        e: React.MouseEvent<HTMLAnchorElement>,
        id: string,
    ) => void;
}

export default function TableOfContents({
    headings,
    activeId,
    onHeadingClick,
}: TableOfContentsProps) {
    if (headings.length === 0) return null;

    return (
        <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 self-start max-h-[calc(100vh-10rem)] overflow-y-auto pr-4 scrollbar-none">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-450 dark:text-zinc-500 mb-4 flex items-center gap-2">
                    <IconList className="h-4 w-4 text-primary" />
                    <span>Table of Contents</span>
                </h3>
                <nav className="space-y-1 relative">
                    {headings.map((h, i) => {
                        const isActive = activeId === h.id;
                        return (
                            <div
                                key={i}
                                className={`relative rounded-r-lg transition-colors duration-250 ${
                                    isActive
                                        ? "text-primary font-semibold"
                                        : "text-zinc-500 hover:text-primary"
                                } ${h.level === 3 ? "ml-4" : ""}`}
                            >
                                {/* Premium sliding highlight active pill */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTocHighlight"
                                        className="absolute inset-0 bg-primary/10 dark:bg-primary/5 border-l-2 border-primary rounded-r-lg -z-10"
                                        transition={{
                                            type: "spring",
                                            stiffness: 350,
                                            damping: 30,
                                        }}
                                    />
                                )}
                                <a
                                    href={`#${h.id}`}
                                    onClick={(e) => onHeadingClick(e, h.id)}
                                    className="block px-3 py-1.5 text-sm leading-normal"
                                >
                                    {h.text}
                                </a>
                            </div>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}
