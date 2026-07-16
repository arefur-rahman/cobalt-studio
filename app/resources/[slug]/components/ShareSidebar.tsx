import {
    IconBrandLinkedin,
    IconBrandTwitter,
    IconCheck,
    IconCopy,
} from "@tabler/icons-react";
import Link from "next/link";

interface ShareSidebarProps {
    handleShareTwitter: () => void;
    handleShareLinkedin: () => void;
    handleCopyLink: () => void;
    copiedLink: boolean;
}

export default function ShareSidebar({
    handleShareTwitter,
    handleShareLinkedin,
    handleCopyLink,
    copiedLink,
}: ShareSidebarProps) {
    return (
        <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 self-start space-y-8 pr-4">
                {/* Share Toolbar */}
                <div className="p-5 border border-zinc-200 dark:border-zinc-800/60 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/10 backdrop-blur-xs">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-450 dark:text-zinc-500 mb-4">
                        Share Resource
                    </h4>
                    <div className="space-y-2">
                        <button
                            onClick={handleShareTwitter}
                            className="flex items-center gap-3 w-full px-4 py-2 border border-zinc-200 dark:border-zinc-850 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl text-xs font-semibold text-zinc-650 dark:text-zinc-350 transition-colors cursor-pointer"
                        >
                            <IconBrandTwitter className="h-4 w-4 text-sky-400" />
                            <span>Share on X / Twitter</span>
                        </button>

                        <button
                            onClick={handleShareLinkedin}
                            className="flex items-center gap-3 w-full px-4 py-2 border border-zinc-200 dark:border-zinc-850 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl text-xs font-semibold text-zinc-650 dark:text-zinc-350 transition-colors cursor-pointer"
                        >
                            <IconBrandLinkedin className="h-4 w-4 text-blue-500" />
                            <span>Share on LinkedIn</span>
                        </button>

                        <button
                            onClick={handleCopyLink}
                            className="flex items-center gap-3 w-full px-4 py-2 border border-zinc-200 dark:border-zinc-850 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl text-xs font-semibold text-zinc-650 dark:text-zinc-350 transition-colors cursor-pointer"
                        >
                            {copiedLink ? (
                                <>
                                    <IconCheck className="h-4 w-4 text-emerald-500" />
                                    <span className="text-emerald-500">
                                        Copied Link!
                                    </span>
                                </>
                            ) : (
                                <>
                                    <IconCopy className="h-4 w-4" />
                                    <span>Copy Article URL</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Additional context card */}
                <div className="p-5 border border-zinc-200 dark:border-zinc-800/60 rounded-2xl bg-primary/5 dark:bg-primary/2 border-l-4 border-l-primary">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                        Cobalt Studio
                    </h4>
                    <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed">
                        Want to go deeper? Join our courses and cohorts to
                        pair-program and master professional engineering
                        workflows directly from source.
                    </p>
                    <Link
                        href="/courses"
                        className="inline-block mt-3 text-xs font-bold text-primary hover:underline"
                    >
                        Explore Courses &rarr;
                    </Link>
                </div>
            </div>
        </aside>
    );
}
