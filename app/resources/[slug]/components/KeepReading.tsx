import { Badge } from "@/components/ui/badge";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";
import { Article } from "../../articles";

interface KeepReadingProps {
    prevArticle: Article | null;
    nextArticle: Article | null;
}

export default function KeepReading({
    prevArticle,
    nextArticle,
}: KeepReadingProps) {
    return (
        <div className="border-t border-zinc-200 dark:border-zinc-800/80 mt-16 pt-12">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6">
                Keep Reading
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Previous Card */}
                <div>
                    {prevArticle && (
                        <Link
                            href={`/resources/${prevArticle.slug}`}
                            className="group p-5 border border-zinc-200 dark:border-zinc-800/60 hover:border-primary/30 rounded-2xl bg-zinc-50/40 dark:bg-zinc-900/10 hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-all flex flex-col justify-between"
                        >
                            <div>
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                                    <IconChevronLeft className="h-3.5 w-3.5" />
                                    <span>Previous Article</span>
                                </p>
                                <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                                    {prevArticle.title}
                                </h4>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <Badge
                                    variant="outline"
                                    className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 text-[9px] px-2 py-0.5 rounded-md font-semibold"
                                >
                                    {prevArticle.category}
                                </Badge>
                                <span className="text-xs text-zinc-400 group-hover:translate-x-[-2px] transition-transform font-semibold flex items-center gap-0.5">
                                    Read
                                </span>
                            </div>
                        </Link>
                    )}
                </div>

                {/* Next Card */}
                <div>
                    {nextArticle && (
                        <Link
                            href={`/resources/${nextArticle.slug}`}
                            className="group p-5 border border-zinc-200 dark:border-zinc-800/60 hover:border-primary/30 rounded-2xl bg-zinc-50/40 dark:bg-zinc-900/10 hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-all flex flex-col justify-between"
                        >
                            <div>
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center gap-1 justify-end">
                                    <span>Next Article</span>
                                    <IconChevronRight className="h-3.5 w-3.5" />
                                </p>
                                <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2 text-right">
                                    {nextArticle.title}
                                </h4>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-xs text-zinc-455 group-hover:translate-x-[2px] transition-transform font-semibold flex items-center gap-0.5">
                                    Read
                                </span>
                                <Badge
                                    variant="outline"
                                    className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 text-[9px] px-2 py-0.5 rounded-md font-semibold"
                                >
                                    {nextArticle.category}
                                </Badge>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
