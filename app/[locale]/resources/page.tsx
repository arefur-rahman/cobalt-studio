"use client";

import NavBarWithPageHeader from "@/components/global/NavBarWithPageHeader";
import { IconSearch } from "@tabler/icons-react";
import { AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import { DUMMY_ARTICLES } from "./articles";
import ArticleCard from "./components/ArticleCard";
import FilterBar from "./components/FilterBar";

const ResourcesPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("newest");
    const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

    const handleCopySlug = (e: React.MouseEvent, slug: string) => {
        e.stopPropagation();
        const url = `${window.location.origin}/resources#${slug}`;
        navigator.clipboard.writeText(url).then(() => {
            setCopiedSlug(slug);
            setTimeout(() => setCopiedSlug(null), 2000);
        });
    };

    const handleReset = () => {
        setSearchQuery("");
        setSelectedCategory("All");
    };

    // Filtered + sorted articles
    const filteredArticles = useMemo(() => {
        let results = [...DUMMY_ARTICLES];

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

        results.sort((a, b) => {
            switch (sortBy) {
                case "newest":
                    return (
                        new Date(b.publishDate).getTime() -
                        new Date(a.publishDate).getTime()
                    );
                case "oldest":
                    return (
                        new Date(a.publishDate).getTime() -
                        new Date(b.publishDate).getTime()
                    );
                case "shortest":
                    return a.readTime - b.readTime;
                case "longest":
                    return b.readTime - a.readTime;
                default:
                    return 0;
            }
        });

        return results;
    }, [searchQuery, selectedCategory, sortBy]);

    return (
        <NavBarWithPageHeader
            sectionTag="resources"
            mainHeading="Curated"
            subHeading="Articles"
        >
            <section className="relative w-full py-16 md:py-24 bg-background min-h-screen text-foreground">
                {/* Ambient glow blobs */}
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <FilterBar
                        searchQuery={searchQuery}
                        selectedCategory={selectedCategory}
                        sortBy={sortBy}
                        totalCount={DUMMY_ARTICLES.length}
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
                                        copiedSlug={copiedSlug}
                                        onCopySlug={handleCopySlug}
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
        </NavBarWithPageHeader>
    );
};

export default ResourcesPage;
