"use client";

import { Badge } from "@/components/ui/badge";
import {
    IconCalendar,
    IconCheck,
    IconClock,
    IconLink,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Article } from "../articles";
import { formatDate } from "./utils";

interface ArticleCardProps {
    article: Article;
    index: number;
    copiedSlug: string | null;
    onCopySlug: (e: React.MouseEvent, slug: string) => void;
}

const ArticleCard = ({
    article,
    index,
    copiedSlug,
    onCopySlug,
}: ArticleCardProps) => {
    return (
        <Link href={`/resources/${article.slug}`} className="block group">
            <motion.article
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="h-full flex flex-col justify-between p-6 bg-zinc-50/50 dark:bg-zinc-900/20 hover:bg-zinc-50 dark:hover:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/80 hover:border-primary/40 dark:hover:border-primary/40 rounded-2xl shadow-2xs hover:shadow-md transition-all duration-300 relative overflow-hidden"
            >
                {/* Corner decorative accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full translate-x-4 -translate-y-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none" />

            <div>
                {/* Header metadata */}
                <div className="flex items-center justify-between gap-2 mb-4">
                    <Badge
                        variant="outline"
                        className="bg-primary/5 text-primary border-primary/20 text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-md"
                    >
                        {article.category}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <IconClock className="h-3.5 w-3.5" />
                        <span>{article.readTime} min read</span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-zinc-950 dark:text-white group-hover:text-primary transition-colors duration-200 leading-snug tracking-tight mb-3 text-wrap: balance">
                    {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed mb-6 text-wrap: pretty">
                    {article.excerpt}
                </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-zinc-200/50 dark:border-zinc-800/50 pt-4 mt-auto">
                <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-medium">
                    <IconCalendar className="h-3.5 w-3.5" />
                    <span>{formatDate(article.publishDate)}</span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => onCopySlug(e, article.slug)}
                        className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-500 hover:text-primary hover:border-primary/30 transition-all"
                        title="Copy link to article"
                    >
                        {copiedSlug === article.slug ? (
                            <IconCheck className="h-3.5 w-3.5 text-emerald-500" />
                        ) : (
                            <IconLink className="h-3.5 w-3.5" />
                        )}
                    </button>

                    <span className="text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform duration-200 flex items-center gap-1">
                        Read
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </span>
                </div>
            </div>
            </motion.article>
        </Link>
    );
};

export default ArticleCard;
