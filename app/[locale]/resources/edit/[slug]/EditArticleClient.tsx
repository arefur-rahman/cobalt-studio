"use client";

import {
    checkSlugAvailability,
    updateArticleAction,
} from "@/app/server/articles";
import Footer from "@/components/global/Footer";
import { notify } from "@/components/global/Notify";
import TopNavBar from "@/components/global/TopNavBar";
import { auth, useAuth } from "@/providers/auth-provider";
import {
    IconAlertCircle,
    IconArrowLeft,
    IconCheck,
    IconEdit,
    IconEye,
    IconLoader2,
    IconShieldX,
    IconSparkles,
} from "@tabler/icons-react";
import { marked } from "marked";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Article } from "../../articles";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "";
const DEFAULT_CATEGORIES = [
    "System Design",
    "Architecture",
    "Database",
    "Backend & APIs",
    "Frontend & React",
    "DevOps & Security",
    "Engineering Insights",
];

interface EditArticleClientProps {
    article: Article;
}

export default function EditArticleClient({ article }: EditArticleClientProps) {
    const { user, loading } = useAuth();
    const router = useRouter();

    // Determine category state
    const isCustomCat = !DEFAULT_CATEGORIES.includes(article.category);

    // Form states
    const [titleEn, setTitleEn] = useState(
        article.titleEn || article.title || "",
    );
    const [titleBn, setTitleBn] = useState(
        article.titleBn || article.title || "",
    );
    const [slug, setSlug] = useState(article.slug);
    const [slugStatus, setSlugStatus] = useState<
        "idle" | "checking" | "available" | "taken" | "invalid"
    >("available");
    const [slugMessage, setSlugMessage] = useState("Original article slug");

    const [category, setCategory] = useState(
        isCustomCat ? DEFAULT_CATEGORIES[0] : article.category,
    );
    const [customCategory, setCustomCategory] = useState(
        isCustomCat ? article.category : "",
    );
    const [useCustomCategory, setUseCustomCategory] = useState(isCustomCat);

    const [readTime, setReadTime] = useState<string>(
        article.readTime ? String(article.readTime) : "",
    );
    const [excerptEn, setExcerptEn] = useState(
        article.excerptEn || article.excerpt || "",
    );
    const [excerptBn, setExcerptBn] = useState(
        article.excerptBn || article.excerpt || "",
    );
    const [contentEn, setContentEn] = useState(
        article.contentEn || article.content || "",
    );
    const [contentBn, setContentBn] = useState(
        article.contentBn || article.content || "",
    );

    const [editorLang, setEditorLang] = useState<"en" | "bn">("en");
    const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Calculate word count & estimated read time automatically
    const wordCount = useMemo(() => {
        const text = (contentEn || contentBn).trim();
        if (!text) return 0;
        return text.split(/\s+/).length;
    }, [contentEn, contentBn]);

    const estimatedReadTime = useMemo(() => {
        return Math.max(1, Math.ceil(wordCount / 200));
    }, [wordCount]);

    // Real-time Slug Uniqueness Check (Debounced)
    useEffect(() => {
        const formattedSlug = slug.trim().toLowerCase();

        const timer = setTimeout(async () => {
            if (!formattedSlug) {
                setSlugStatus("idle");
                setSlugMessage("");
                return;
            }

            if (formattedSlug === article.slug) {
                setSlugStatus("available");
                setSlugMessage("Current article slug");
                return;
            }

            // Validate format locally first
            if (!/^[a-z0-9-_]+$/.test(formattedSlug)) {
                setSlugStatus("invalid");
                setSlugMessage(
                    "Slug can only contain lowercase letters, numbers, hyphens, and underscores.",
                );
                return;
            }

            setSlugStatus("checking");
            setSlugMessage("Checking slug availability...");

            try {
                const res = await checkSlugAvailability(
                    formattedSlug,
                    article.id || article.slug,
                );
                if (res.isAvailable) {
                    setSlugStatus("available");
                    setSlugMessage("Slug is unique & available!");
                } else {
                    setSlugStatus("taken");
                    setSlugMessage(
                        res.error ||
                            "This slug is already taken. Choose another.",
                    );
                }
            } catch {
                setSlugStatus("taken");
                setSlugMessage("Failed to verify slug availability.");
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [slug, article.slug, article.id]);

    // Rendered Markdown preview HTML
    const previewHtml = useMemo(() => {
        const activeContent = editorLang === "en" ? contentEn : contentBn;
        if (!activeContent.trim())
            return `<p class='text-zinc-400 italic'>Nothing to preview for ${editorLang === "en" ? "English" : "Bangla"} content yet...</p>`;
        try {
            return marked.parse(activeContent) as string;
        } catch {
            return "<p class='text-red-400'>Error parsing Markdown preview</p>";
        }
    }, [contentEn, contentBn, editorLang]);

    // Form Submit Handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
            notify.error("Unauthorized operation.");
            return;
        }

        const finalSlug = slug.trim().toLowerCase();
        if (!finalSlug) {
            notify.error("Please enter a valid slug.");
            return;
        }

        if (slugStatus === "taken" || slugStatus === "invalid") {
            notify.error(
                slugMessage || "Please fix the slug before submitting.",
            );
            return;
        }

        const finalCategory = useCustomCategory
            ? customCategory.trim()
            : category.trim();

        if (
            !titleEn.trim() ||
            !finalCategory ||
            !excerptEn.trim() ||
            !contentEn.trim()
        ) {
            notify.error(
                "Please fill in all required English fields (Title, Excerpt, Content).",
            );
            return;
        }

        setIsSubmitting(true);

        try {
            const currentUser = auth.currentUser;
            if (!currentUser) {
                notify.error("Session expired. Please sign in again.");
                setIsSubmitting(false);
                return;
            }

            const idToken = await currentUser.getIdToken();

            const finalReadTime = readTime
                ? parseInt(readTime, 10)
                : estimatedReadTime;

            const res = await updateArticleAction(
                {
                    id: article.id || article.slug,
                    titleEn: titleEn.trim(),
                    titleBn: titleBn.trim() || titleEn.trim(),
                    slug: finalSlug,
                    category: finalCategory,
                    excerptEn: excerptEn.trim(),
                    excerptBn: excerptBn.trim() || excerptEn.trim(),
                    contentEn: contentEn.trim(),
                    contentBn: contentBn.trim() || contentEn.trim(),
                    readTime: finalReadTime,
                },
                idToken,
            );

            if (res.success && res.article) {
                notify.success("Article updated successfully!");
                router.push(`/resources/${res.article.slug}`);
            } else {
                notify.error(res.error || "Failed to update article.");
            }
        } catch (err: unknown) {
            console.error("Article update error:", err);
            notify.error(
                err instanceof Error
                    ? err.message
                    : "An unexpected error occurred.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // 1. Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center">
                <IconLoader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                <p className="text-sm text-zinc-400">
                    Verifying administrator privileges...
                </p>
            </div>
        );
    }

    // 2. Access Denied State
    if (!user || user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        return (
            <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
                <TopNavBar />
                <main className="max-w-2xl mx-auto px-4 py-24 text-center my-auto">
                    <div className="inline-flex p-4 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 mb-6">
                        <IconShieldX className="h-12 w-12" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight mb-3">
                        Access Restricted
                    </h1>
                    <p className="text-zinc-400 mb-8 max-w-md mx-auto text-sm leading-relaxed">
                        Article editing is strictly reserved for user email{" "}
                        <span className="font-mono text-primary font-semibold">
                            {ADMIN_EMAIL}
                        </span>
                        .
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/resources"
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-sm transition-colors"
                        >
                            <IconArrowLeft className="h-4 w-4" />
                            Back to Resources
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <TopNavBar />

            <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Navigation */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <Link
                            href={`/resources/${article.slug}`}
                            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-primary transition-colors mb-2"
                        >
                            <IconArrowLeft className="h-3.5 w-3.5" />
                            Back to Article
                        </Link>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-3">
                            <IconEdit className="h-7 w-7 text-primary" />
                            Edit Article
                        </h1>
                    </div>

                    {/* Submit Button (Top Bar) */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:opacity-90 text-white font-semibold text-sm shadow-md transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <IconLoader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <IconCheck className="h-4 w-4" />
                            )}
                            {isSubmitting
                                ? "Saving Changes..."
                                : "Save Changes"}
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Main Content Card */}
                    <div className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
                        {/* Title Row (English & Bangla) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Title (English) */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                                    Article Title (English){" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={titleEn}
                                    onChange={(e) => setTitleEn(e.target.value)}
                                    placeholder="e.g. Distributed Caching Strategies for High-Scale Apps"
                                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/50 text-base font-semibold transition-all"
                                    required
                                />
                            </div>

                            {/* Title (Bangla) */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                                    Article Title (Bangla / বাংলা)
                                </label>
                                <input
                                    type="text"
                                    value={titleBn}
                                    onChange={(e) => setTitleBn(e.target.value)}
                                    placeholder="যেমন: হাই-স্কেল অ্যাপের জন্য ডিস্ট্রিবিউটেড ক্যাশিং স্ট্র্যাটেজি"
                                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/50 text-base font-semibold transition-all"
                                />
                                <p className="mt-1 text-[11px] text-zinc-400">
                                    Optional. Defaults to English title if left
                                    empty.
                                </p>
                            </div>
                        </div>

                        {/* Slug Input */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                                URL Slug <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-400 select-none hidden sm:inline">
                                    /resources/
                                </span>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    placeholder="distributed-caching-strategies"
                                    className="w-full pl-3 sm:pl-28 pr-10 py-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/50 font-mono text-sm transition-all"
                                    required
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                                    {slugStatus === "checking" && (
                                        <IconLoader2 className="h-4 w-4 text-primary animate-spin" />
                                    )}
                                    {slugStatus === "available" && (
                                        <IconCheck className="h-4 w-4 text-emerald-500" />
                                    )}
                                    {(slugStatus === "taken" ||
                                        slugStatus === "invalid") && (
                                        <IconAlertCircle className="h-4 w-4 text-red-500" />
                                    )}
                                </div>
                            </div>
                            {slugMessage && (
                                <p
                                    className={`text-xs mt-1.5 font-medium ${
                                        slugStatus === "available"
                                            ? "text-emerald-500"
                                            : slugStatus === "taken" ||
                                                slugStatus === "invalid"
                                              ? "text-red-500"
                                              : "text-zinc-400"
                                    }`}
                                >
                                    {slugMessage}
                                </p>
                            )}
                        </div>

                        {/* Category & Read Time Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                                    Category{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                {!useCustomCategory ? (
                                    <div className="space-y-2">
                                        <select
                                            value={category}
                                            onChange={(e) =>
                                                setCategory(e.target.value)
                                            }
                                            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/50 text-sm font-medium transition-all"
                                        >
                                            {DEFAULT_CATEGORIES.map((cat) => (
                                                <option key={cat} value={cat}>
                                                    {cat}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setUseCustomCategory(true)
                                            }
                                            className="text-xs text-primary hover:underline font-medium inline-flex items-center gap-1"
                                        >
                                            <IconSparkles className="h-3 w-3" />
                                            Use custom category
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            value={customCategory}
                                            onChange={(e) =>
                                                setCustomCategory(
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Enter custom category name"
                                            className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/50 text-sm font-medium transition-all"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setUseCustomCategory(false)
                                            }
                                            className="text-xs text-zinc-400 hover:text-foreground underline font-medium"
                                        >
                                            Select from default categories
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                                    Read Time (minutes)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={readTime}
                                    onChange={(e) =>
                                        setReadTime(e.target.value)
                                    }
                                    placeholder={`Auto-calculated (${estimatedReadTime} min)`}
                                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/50 text-sm font-medium transition-all"
                                />
                                <p className="text-[11px] text-zinc-400 mt-1">
                                    Leave blank to auto-calculate based on word
                                    count ({wordCount} words).
                                </p>
                            </div>
                        </div>

                        {/* Excerpt Row (English & Bangla) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Excerpt (English) */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                                    Excerpt / Short Summary (English){" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={excerptEn}
                                    onChange={(e) =>
                                        setExcerptEn(e.target.value)
                                    }
                                    rows={3}
                                    placeholder="Provide a concise 2-3 sentence overview for the article preview card in English..."
                                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/50 text-sm leading-relaxed transition-all resize-y"
                                    required
                                />
                            </div>

                            {/* Excerpt (Bangla) */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                                    Excerpt / Short Summary (Bangla / বাংলা)
                                </label>
                                <textarea
                                    value={excerptBn}
                                    onChange={(e) =>
                                        setExcerptBn(e.target.value)
                                    }
                                    rows={3}
                                    placeholder="আর্টিকেলের সংক্ষেপ বা বিবরণ বাংলায় লিখুন..."
                                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/50 text-sm leading-relaxed transition-all resize-y"
                                />
                                <p className="mt-1 text-[11px] text-zinc-400">
                                    Optional. Defaults to English excerpt if
                                    left empty.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Markdown Content Section */}
                    <div className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                            {/* Language Selector Tabs */}
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setEditorLang("en")}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                                        editorLang === "en"
                                            ? "bg-primary text-white shadow-xs"
                                            : "bg-zinc-200/60 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 hover:text-foreground"
                                    }`}
                                >
                                    🇬🇧 English Content{" "}
                                    <span className="text-red-300">*</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditorLang("bn")}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                                        editorLang === "bn"
                                            ? "bg-primary text-white shadow-xs"
                                            : "bg-zinc-200/60 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 hover:text-foreground"
                                    }`}
                                >
                                    🇧🇩 বাংলা Content
                                </button>
                            </div>

                            {/* Write / Preview Tab switcher */}
                            <div className="flex items-center p-1 bg-zinc-200/60 dark:bg-zinc-950 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("write")}
                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                        activeTab === "write"
                                            ? "bg-white dark:bg-zinc-800 text-foreground shadow-xs"
                                            : "text-zinc-500 hover:text-foreground"
                                    }`}
                                >
                                    <IconEdit className="h-3.5 w-3.5" />
                                    Write
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("preview")}
                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                        activeTab === "preview"
                                            ? "bg-white dark:bg-zinc-800 text-foreground shadow-xs"
                                            : "text-zinc-500 hover:text-foreground"
                                    }`}
                                >
                                    <IconEye className="h-3.5 w-3.5" />
                                    Preview
                                </button>
                            </div>
                        </div>

                        {activeTab === "write" ? (
                            <div>
                                {editorLang === "en" ? (
                                    <textarea
                                        value={contentEn}
                                        onChange={(e) =>
                                            setContentEn(e.target.value)
                                        }
                                        rows={18}
                                        placeholder="Write your article content using standard Markdown syntax (English)..."
                                        className="w-full px-4 py-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/50 font-mono text-sm leading-relaxed transition-all resize-y"
                                        required
                                    />
                                ) : (
                                    <textarea
                                        value={contentBn}
                                        onChange={(e) =>
                                            setContentBn(e.target.value)
                                        }
                                        rows={18}
                                        placeholder="আর্টিকেলের বাংলা কন্টেন্ট লিখুন (মার্কডাউন ফরম্যাটে)..."
                                        className="w-full px-4 py-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/50 font-mono text-sm leading-relaxed transition-all resize-y"
                                    />
                                )}
                            </div>
                        ) : (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: previewHtml,
                                }}
                                className="min-h-100 p-6 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-850 dark:text-zinc-200 leading-relaxed text-sm md:text-base space-y-4 select-text markdown-content overflow-y-auto"
                            />
                        )}
                    </div>

                    {/* Markdown Formatting Cheat Sheet */}
                    <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 text-xs text-zinc-600 dark:text-zinc-400 space-y-2">
                        <div className="font-semibold text-zinc-900 dark:text-zinc-200 flex items-center gap-1.5">
                            <IconSparkles className="w-4 h-4 text-primary" />
                            <span>
                                Markdown Syntax Guide for Parts & Paragraphs
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
                            <div className="bg-white dark:bg-zinc-950 p-2.5 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60">
                                <p className="font-medium text-zinc-800 dark:text-zinc-300 mb-1">
                                    Separate Paragraphs
                                </p>
                                <code className="block bg-zinc-100 dark:bg-zinc-900 px-1.5 py-1 rounded text-[11px]">
                                    Leave a blank line (press Enter twice)
                                </code>
                            </div>
                            <div className="bg-white dark:bg-zinc-950 p-2.5 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60">
                                <p className="font-medium text-zinc-800 dark:text-zinc-300 mb-1">
                                    Main Parts / Sections (TOC)
                                </p>
                                <code className="block bg-zinc-100 dark:bg-zinc-900 px-1.5 py-1 rounded text-[11px]">
                                    ## 1. Section Title
                                </code>
                            </div>
                            <div className="bg-white dark:bg-zinc-950 p-2.5 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60">
                                <p className="font-medium text-zinc-800 dark:text-zinc-300 mb-1">
                                    Sub-sections
                                </p>
                                <code className="block bg-zinc-100 dark:bg-zinc-900 px-1.5 py-1 rounded text-[11px]">
                                    ### Sub-heading Title
                                </code>
                            </div>
                            <div className="bg-white dark:bg-zinc-950 p-2.5 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60">
                                <p className="font-medium text-zinc-800 dark:text-zinc-300 mb-1">
                                    Lists
                                </p>
                                <code className="block bg-zinc-100 dark:bg-zinc-900 px-1.5 py-1 rounded text-[11px]">
                                    - Item 1&#10;- Item 2
                                </code>
                            </div>
                            <div className="bg-white dark:bg-zinc-950 p-2.5 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60">
                                <p className="font-medium text-zinc-800 dark:text-zinc-300 mb-1">
                                    Code Blocks
                                </p>
                                <code className="block bg-zinc-100 dark:bg-zinc-900 px-1.5 py-1 rounded text-[11px]">
                                    ```js&#10;const x = 10;&#10;```
                                </code>
                            </div>
                            <div className="bg-white dark:bg-zinc-950 p-2.5 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60">
                                <p className="font-medium text-zinc-800 dark:text-zinc-300 mb-1">
                                    Quotes & Callouts
                                </p>
                                <code className="block bg-zinc-100 dark:bg-zinc-900 px-1.5 py-1 rounded text-[11px]">
                                    &gt; Important note here
                                </code>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Submit Action Bar */}
                    <div className="flex items-center justify-end gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                        <Link
                            href={`/resources/${article.slug}`}
                            className="px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 hover:text-foreground font-semibold text-sm transition-all"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:opacity-90 text-white font-semibold text-sm shadow-md transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <IconLoader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <IconCheck className="h-4 w-4" />
                            )}
                            {isSubmitting
                                ? "Saving Changes..."
                                : "Save Changes"}
                        </button>
                    </div>
                </form>
            </main>

            <Footer />
        </div>
    );
}
