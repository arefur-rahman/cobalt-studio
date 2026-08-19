import { Badge } from "@/components/ui/badge";
import {
    IconArrowLeft,
    IconCalendar,
    IconClock,
    IconEdit,
    IconLoader2,
    IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import { Article } from "../../articles";
import { formatDate } from "../../components/utils";

interface ArticleHeaderProps {
    article: Article;
    isAdmin?: boolean;
    onDelete?: () => void;
    isDeleting?: boolean;
}

export default function ArticleHeader({
    article,
    isAdmin,
    onDelete,
    isDeleting,
}: ArticleHeaderProps) {
    return (
        <header className="relative py-16 md:py-24 bg-linear-to-b from-zinc-50 to-background dark:from-zinc-950/20 dark:to-background border-b border-zinc-200 dark:border-zinc-800/40 overflow-hidden">
            {/* Accent glow graphics */}
            <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-primary/10 dark:bg-primary/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2" />
            <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-indigo-500/5 dark:bg-indigo-500/2 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-3xl">
                    {/* Back Arrow link & Admin Actions */}
                    <div className="flex items-center justify-between gap-4 mb-8">
                        <Link
                            href="/resources"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-primary transition-all duration-200 group/back"
                        >
                            <IconArrowLeft className="h-4 w-4 group-hover/back:-translate-x-1 transition-transform duration-200" />
                            <span>Back to resources</span>
                        </Link>

                        {isAdmin && (
                            <div className="flex items-center gap-2">
                                <Link
                                    href={`/resources/edit/${article.slug}`}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 hover:border-primary/40 hover:text-primary transition-all"
                                >
                                    <IconEdit className="h-3.5 w-3.5" />
                                    <span>Edit Article</span>
                                </Link>

                                {onDelete && (
                                    <button
                                        type="button"
                                        onClick={onDelete}
                                        disabled={isDeleting}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50/50 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/60 transition-all disabled:opacity-50"
                                    >
                                        {isDeleting ? (
                                            <IconLoader2 className="h-3.5 w-3.5 animate-spin" />
                                        ) : (
                                            <IconTrash className="h-3.5 w-3.5" />
                                        )}
                                        <span>Delete Article</span>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Metadata indicators */}
                    <div className="flex flex-wrap items-center gap-3 text-xs mb-6 text-zinc-500">
                        <Badge
                            variant="outline"
                            className="bg-primary/5 text-primary border-primary/20 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md"
                        >
                            {article.category}
                        </Badge>
                        <span className="text-zinc-300 dark:text-zinc-800">
                            •
                        </span>
                        <div className="flex items-center gap-1.5 font-medium">
                            <IconCalendar className="h-3.5 w-3.5" />
                            <span>{formatDate(article.publishDate)}</span>
                        </div>
                        <span className="text-zinc-300 dark:text-zinc-800">
                            •
                        </span>
                        <div className="flex items-center gap-1.5 font-medium">
                            <IconClock className="h-3.5 w-3.5" />
                            <span>{article.readTime} min read</span>
                        </div>
                    </div>

                    {/* Title & Description */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-950 dark:text-white leading-[1.1] tracking-tight mb-6 text-wrap: balance">
                        {article.title}
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-zinc-650 dark:text-zinc-400 font-normal leading-relaxed mb-8 text-wrap: pretty">
                        {article.excerpt}
                    </p>
                </div>
            </div>
        </header>
    );
}
