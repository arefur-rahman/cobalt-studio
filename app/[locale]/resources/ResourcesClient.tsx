"use client";

import { deleteArticleAction } from "@/app/server/articles";
import { notify } from "@/components/global/Notify";
import { auth, useAuth } from "@/providers/auth-provider";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { AnimatePresence } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Article } from "./articles";
import ArticleCard from "./components/ArticleCard";
import FilterBar from "./components/FilterBar";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "";

interface ResourcesClientProps {
    articles: Article[];
    categories: string[];
}

export default function ResourcesClient({
    articles,
    categories,
}: ResourcesClientProps) {
    const { user } = useAuth();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("newest");
    const [deletedSlugs, setDeletedSlugs] = useState<string[]>([]);

    const isAdmin = Boolean(
        ADMIN_EMAIL && user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase(),
    );

    const itemList = useMemo(() => {
        if (deletedSlugs.length === 0) return articles;
        const deletedSet = new Set(deletedSlugs);
        return articles.filter((a) => !deletedSet.has(a.slug));
    }, [articles, deletedSlugs]);

    const handleDeleteArticle = async (article: Article) => {
        if (!isAdmin) {
            notify.error("Unauthorized operation.");
            return;
        }

        const confirmed = window.confirm(
            `Are you sure you want to delete "${article.title}"? This action cannot be undone.`,
        );
        if (!confirmed) return;

        try {
            const idToken = await auth.currentUser?.getIdToken();
            if (!idToken) {
                notify.error("Session expired. Please sign in again.");
                return;
            }

            const res = await deleteArticleAction(
                article.id || article.slug,
                idToken,
            );

            if (res.success) {
                notify.success("Article deleted successfully!");
                setDeletedSlugs((prev) => [...prev, article.slug]);
                router.refresh();
            } else {
                notify.error(res.error || "Failed to delete article.");
            }
        } catch (err) {
            console.error("Error deleting article:", err);
            notify.error(
                "An unexpected error occurred while deleting the article.",
            );
        }
    };

    const handleReset = () => {
        setSearchQuery("");
        setSelectedCategory("All");
    };

    // Filtered + sorted articles
    const filteredArticles = useMemo(() => {
        let results = itemList;

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            results = results.filter(
                (a) =>
                    a.title.toLowerCase().includes(q) ||
                    a.excerpt.toLowerCase().includes(q) ||
                    a.category.toLowerCase().includes(q),
            );
        }

        if (selectedCategory !== "All") {
            results = results.filter((a) => a.category === selectedCategory);
        }

        // Sort results
        if (sortBy) {
            results = [...results].sort((a, b) => {
                switch (sortBy) {
                    case "newest":
                        return (
                            Date.parse(b.publishDate) -
                            Date.parse(a.publishDate)
                        );
                    case "oldest":
                        return (
                            Date.parse(a.publishDate) -
                            Date.parse(b.publishDate)
                        );
                    case "shortest":
                        return a.readTime - b.readTime;
                    case "longest":
                        return b.readTime - a.readTime;
                    default:
                        return 0;
                }
            });
        }

        return results;
    }, [itemList, searchQuery, selectedCategory, sortBy]);

    return (
        <section className="relative w-full py-16 md:py-24 bg-background min-h-screen text-foreground">
            {/* Ambient glow blobs */}
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {isAdmin && (
                    <div className="mb-6 flex justify-end">
                        <Link
                            href="/resources/create"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:opacity-90 text-white text-xs font-semibold shadow-md transition-all"
                        >
                            <IconPlus className="h-4 w-4" />
                            Post New Article
                        </Link>
                    </div>
                )}

                <FilterBar
                    searchQuery={searchQuery}
                    selectedCategory={selectedCategory}
                    categories={categories}
                    sortBy={sortBy}
                    totalCount={itemList.length}
                    filteredCount={filteredArticles.length}
                    onSearchChange={setSearchQuery}
                    onCategoryChange={setSelectedCategory}
                    onSortChange={setSortBy}
                    onReset={handleReset}
                />

                {/* Articles grid */}
                {filteredArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredArticles.map((article, index) => (
                                <ArticleCard
                                    key={article.slug}
                                    article={article}
                                    index={index}
                                    isAdmin={isAdmin}
                                    onDelete={handleDeleteArticle}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="text-center py-16 bg-zinc-50/50 dark:bg-zinc-900/10 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800">
                        <IconSearch className="h-10 w-10 text-zinc-400 mx-auto mb-3" />
                        <p className="text-zinc-800 dark:text-zinc-300 font-semibold mb-1">
                            No articles matched your search
                        </p>
                        <p className="text-sm text-zinc-400">
                            Try refining your search query or choosing a
                            different category.
                        </p>
                        <button
                            onClick={handleReset}
                            className="mt-4 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity"
                        >
                            Reset Search Filters
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
