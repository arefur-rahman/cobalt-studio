"use client";

import { IconChevronDown, IconSearch, IconX } from "@tabler/icons-react";
import { CATEGORIES } from "../articles";
interface FilterBarProps {
    searchQuery: string;
    selectedCategory: string;
    sortBy: string;
    totalCount: number;
    filteredCount: number;
    onSearchChange: (value: string) => void;
    onCategoryChange: (category: string) => void;
    onSortChange: (sort: string) => void;
    onReset: () => void;
}

const FilterBar = ({
    searchQuery,
    selectedCategory,
    sortBy,
    totalCount,
    filteredCount,
    onSearchChange,
    onCategoryChange,
    onSortChange,
    onReset,
}: FilterBarProps) => {
    const isFiltered = searchQuery !== "" || selectedCategory !== "All";

    return (
        <>
            {/* Search & Sort & Filter controls */}
            <div className="flex flex-col gap-6 md:gap-8 mb-12 bg-white/5 dark:bg-zinc-900/40 p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/60 backdrop-blur-md shadow-2xs">
                {/* Search and Sort row */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
                    {/* Search bar */}
                    <div className="relative flex-1 max-w-md">
                        <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search resources, tags, or excerpts..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-foreground placeholder-zinc-400 focus:outline-hidden focus:border-primary/60 focus:ring-1 focus:ring-primary/60 transition-all shadow-inner"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => onSearchChange("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                            >
                                <IconX className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    {/* Sort Selector */}
                    <div className="relative min-w-[160px]">
                        <select
                            value={sortBy}
                            onChange={(e) => onSortChange(e.target.value)}
                            className="w-full pl-3 pr-8 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-foreground focus:outline-hidden focus:border-primary/60 focus:ring-1 focus:ring-primary/60 cursor-pointer appearance-none shadow-inner"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="shortest">Shortest Read</option>
                            <option value="longest">Longest Read</option>
                        </select>
                        <IconChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none h-4 w-4" />
                    </div>
                </div>

                {/* Category Pills Row */}
                <div className="flex flex-wrap items-center gap-2 border-t border-zinc-200/50 dark:border-zinc-800/40 pt-4">
                    <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mr-2">
                        Categories:
                    </span>
                    {CATEGORIES.map((category) => {
                        const isActive = selectedCategory === category;
                        return (
                            <button
                                key={category}
                                onClick={() => onCategoryChange(category)}
                                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                                    isActive
                                        ? "bg-primary text-white border-primary shadow-xs"
                                        : "bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                                }`}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Results Info */}
            <div className="mb-6 flex justify-between items-center text-xs text-zinc-500 font-medium">
                <span>
                    Showing {filteredCount} of {totalCount} resources
                </span>
                {isFiltered && (
                    <button
                        onClick={onReset}
                        className="text-primary hover:underline"
                    >
                        Reset Filters
                    </button>
                )}
            </div>
        </>
    );
};

export default FilterBar;
