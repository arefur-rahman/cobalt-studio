"use client";

import {
    checkSlugAvailability,
    createArticleAction,
} from "@/app/server/articles";
import Footer from "@/components/global/Footer";
import { notify } from "@/components/global/Notify";
import TopNavBar from "@/components/global/TopNavBar";
import { auth, useAuth } from "@/providers/auth-provider";
import {
    IconAlertCircle,
    IconArrowLeft,
    IconCheck,
    IconChevronDown,
    IconChevronUp,
    IconEdit,
    IconEye,
    IconLink,
    IconLoader2,
    IconLock,
    IconPhoto,
    IconPlus,
    IconShieldX,
    IconSparkles,
    IconTag,
    IconWorld,
} from "@tabler/icons-react";
import { marked } from "marked";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

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

export default function CreateArticleClient() {
    const { user, loading } = useAuth();
    const router = useRouter();

    // Form states
    const [titleEn, setTitleEn] = useState("");
    const [titleBn, setTitleBn] = useState("");
    const [slug, setSlug] = useState("");
    const [slugStatus, setSlugStatus] = useState<
        "idle" | "checking" | "available" | "taken" | "invalid"
    >("idle");
    const [slugMessage, setSlugMessage] = useState("");

    const [category, setCategory] = useState("System Design");
    const [customCategory, setCustomCategory] = useState("");
    const [useCustomCategory, setUseCustomCategory] = useState(false);

    const [readTime, setReadTime] = useState<string>("");
    const [excerptEn, setExcerptEn] = useState("");
    const [excerptBn, setExcerptBn] = useState("");
    const [contentEn, setContentEn] = useState("");
    const [contentBn, setContentBn] = useState("");

    // SEO & Social sharing states
    const [metaTitleEn, setMetaTitleEn] = useState("");
    const [metaTitleBn, setMetaTitleBn] = useState("");
    const [metaDescriptionEn, setMetaDescriptionEn] = useState("");
    const [metaDescriptionBn, setMetaDescriptionBn] = useState("");
    const [keywordsEn, setKeywordsEn] = useState("");
    const [keywordsBn, setKeywordsBn] = useState("");
    const [ogImage, setOgImage] = useState("");
    const [canonicalUrl, setCanonicalUrl] = useState("");
    const [noIndex, setNoIndex] = useState(false);
    const [isSeoOpen, setIsSeoOpen] = useState(false);

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
                const res = await checkSlugAvailability(formattedSlug);
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
    }, [slug]);

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
            // Get current Firebase Auth ID Token for server verification
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

            const res = await createArticleAction(
                {
                    titleEn: titleEn.trim(),
                    titleBn: titleBn.trim() || titleEn.trim(),
                    slug: finalSlug,
                    category: finalCategory,
                    excerptEn: excerptEn.trim(),
                    excerptBn: excerptBn.trim() || excerptEn.trim(),
                    contentEn: contentEn.trim(),
                    contentBn: contentBn.trim() || contentEn.trim(),
                    readTime: finalReadTime,
                    metaTitleEn: metaTitleEn.trim(),
                    metaTitleBn: metaTitleBn.trim(),
                    metaDescriptionEn: metaDescriptionEn.trim(),
                    metaDescriptionBn: metaDescriptionBn.trim(),
                    keywordsEn: keywordsEn.trim(),
                    keywordsBn: keywordsBn.trim(),
                    ogImage: ogImage.trim(),
                    canonicalUrl: canonicalUrl.trim(),
                    noIndex,
                },
                idToken,
            );

            if (res.success && res.article) {
                notify.success("Article published successfully!");
                router.push(`/resources/${res.article.slug}`);
            } else {
                notify.error(res.error || "Failed to create article.");
            }
        } catch (err: unknown) {
            console.error("Article submission error:", err);
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

    // 2. Access Denied State (Not logged in or email mismatch)
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
                        The article publishing route is strictly reserved for
                        user email{" "}
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
                        {!user && (
                            <Link
                                href="/signin"
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:opacity-90 text-white font-medium text-sm transition-opacity"
                            >
                                <IconLock className="h-4 w-4" />
                                Sign In
                            </Link>
                        )}
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // 3. Authorized Creator Studio View
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
            <TopNavBar />

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1">
                {/* Header navigation bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                    <div>
                        <Link
                            href="/resources"
                            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-foreground transition-colors mb-2"
                        >
                            <IconArrowLeft className="h-4 w-4" />
                            Back to Resources Vault
                        </Link>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
                            <IconSparkles className="h-6 w-6 text-primary" />
                            Post New Article
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() =>
                                setActiveTab(
                                    activeTab === "write" ? "preview" : "write",
                                )
                            }
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                        >
                            {activeTab === "write" ? (
                                <>
                                    <IconEye className="h-4 w-4" /> Live Preview
                                </>
                            ) : (
                                <>
                                    <IconEdit className="h-4 w-4" /> Back to
                                    Editor
                                </>
                            )}
                        </button>

                        <button
                            onClick={handleSubmit}
                            disabled={
                                isSubmitting ||
                                slugStatus === "taken" ||
                                slugStatus === "invalid"
                            }
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold bg-primary hover:opacity-90 disabled:opacity-50 text-white transition-all shadow-md cursor-pointer"
                        >
                            {isSubmitting ? (
                                <>
                                    <IconLoader2 className="h-4 w-4 animate-spin" />{" "}
                                    Publishing...
                                </>
                            ) : (
                                <>
                                    <IconPlus className="h-4 w-4" /> Publish
                                    Article
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Main Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title Row (English & Bangla) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title (English) */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                                Article Title (English){" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={titleEn}
                                onChange={(e) => setTitleEn(e.target.value)}
                                placeholder="e.g. Master-Detail Pattern in Distributed Databases"
                                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                        </div>

                        {/* Title (Bangla) */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                                Article Title (Bangla / বাংলা)
                            </label>
                            <input
                                type="text"
                                value={titleBn}
                                onChange={(e) => setTitleBn(e.target.value)}
                                placeholder="যেমন: ডিস্ট্রিবিউটেড ডাটাবেসে মাস্টার-ডিটেইল প্যাটার্ন"
                                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                            <p className="mt-1 text-[11px] text-zinc-500">
                                Optional. Defaults to English title if left
                                empty.
                            </p>
                        </div>
                    </div>

                    {/* Slug & Category & Read Time row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Manual Slug with Client-Side Uniqueness Check */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                                Manual Article Slug{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    required
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    placeholder="e.g. master-detail-pattern-db"
                                    className={`w-full pl-4 pr-10 py-2.5 bg-zinc-50 dark:bg-zinc-900 border rounded-xl text-sm focus:outline-none transition-all ${
                                        slugStatus === "available"
                                            ? "border-emerald-500/80 focus:ring-emerald-500"
                                            : slugStatus === "taken" ||
                                                slugStatus === "invalid"
                                              ? "border-red-500/80 focus:ring-red-500"
                                              : "border-zinc-200 dark:border-zinc-800 focus:border-primary focus:ring-primary"
                                    }`}
                                />

                                {/* Icon indicator */}
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    {slugStatus === "checking" && (
                                        <IconLoader2 className="h-4 w-4 text-zinc-400 animate-spin" />
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

                            {/* Live Slug Status Message */}
                            {slugMessage && (
                                <p
                                    className={`mt-1.5 text-xs flex items-center gap-1 font-medium ${
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

                        {/* Category Selector */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                    Category{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setUseCustomCategory(!useCustomCategory)
                                    }
                                    className="text-xs text-primary hover:underline"
                                >
                                    {useCustomCategory
                                        ? "Select Existing"
                                        : "+ Custom"}
                                </button>
                            </div>

                            {useCustomCategory ? (
                                <input
                                    type="text"
                                    required
                                    value={customCategory}
                                    onChange={(e) =>
                                        setCustomCategory(e.target.value)
                                    }
                                    placeholder="Enter custom category"
                                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                            ) : (
                                <select
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer transition-all"
                                >
                                    {DEFAULT_CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        {/* Read Time (Optional Override) */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                                Read Time (Minutes)
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={readTime}
                                onChange={(e) => setReadTime(e.target.value)}
                                placeholder={`Auto: ${estimatedReadTime} min`}
                                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-zinc-500"
                            />
                            <p className="mt-1 text-[11px] text-zinc-400">
                                Leave blank to auto-calculate ({wordCount}{" "}
                                words).
                            </p>
                        </div>
                    </div>

                    {/* Excerpt Row (English & Bangla) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Excerpt (English) */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                                Excerpt / Summary (English){" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                required
                                rows={3}
                                value={excerptEn}
                                onChange={(e) => setExcerptEn(e.target.value)}
                                placeholder="Provide a concise 2-3 sentence overview of the article in English..."
                                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-y"
                            />
                        </div>

                        {/* Excerpt (Bangla) */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                                Excerpt / Summary (Bangla / বাংলা)
                            </label>
                            <textarea
                                rows={3}
                                value={excerptBn}
                                onChange={(e) => setExcerptBn(e.target.value)}
                                placeholder="আর্টিকেলের সংক্ষেপ বা মূল বিবরণ বাংলায় লিখুন..."
                                className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-y"
                            />
                            <p className="mt-1 text-[11px] text-zinc-500">
                                Optional. Defaults to English excerpt if left
                                empty.
                            </p>
                        </div>
                    </div>

                    {/* Collapsible SEO & Social Sharing Settings */}
                    <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/40 overflow-hidden transition-all">
                        <button
                            type="button"
                            onClick={() => setIsSeoOpen(!isSeoOpen)}
                            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40 transition-colors cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                    <IconWorld className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-foreground">
                                        SEO & Social Sharing Metadata
                                    </h3>
                                    <p className="text-xs text-zinc-400">
                                        Configure meta titles, descriptions, keywords, OpenGraph card images, and indexing.
                                    </p>
                                </div>
                            </div>
                            <div className="text-zinc-400">
                                {isSeoOpen ? (
                                    <IconChevronUp className="h-5 w-5" />
                                ) : (
                                    <IconChevronDown className="h-5 w-5" />
                                )}
                            </div>
                        </button>

                        {isSeoOpen && (
                            <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 space-y-6 bg-white dark:bg-zinc-950/40">
                                {/* Meta Title (EN & BN) */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                                Meta Title (English)
                                            </label>
                                            <span className={`text-[11px] font-mono ${metaTitleEn.length > 60 ? "text-amber-500 font-bold" : "text-zinc-400"}`}>
                                                {metaTitleEn.length}/60 chars {metaTitleEn.length > 60 && "(warn: >60)"}
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            value={metaTitleEn}
                                            onChange={(e) => setMetaTitleEn(e.target.value)}
                                            placeholder="Leave empty to use Article Title"
                                            className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-primary transition-all"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                                Meta Title (Bangla)
                                            </label>
                                            <span className={`text-[11px] font-mono ${metaTitleBn.length > 60 ? "text-amber-500 font-bold" : "text-zinc-400"}`}>
                                                {metaTitleBn.length}/60 chars {metaTitleBn.length > 60 && "(warn: >60)"}
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            value={metaTitleBn}
                                            onChange={(e) => setMetaTitleBn(e.target.value)}
                                            placeholder="Leave empty to use Bangla Title"
                                            className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Meta Description (EN & BN) */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                                Meta Description (English)
                                            </label>
                                            <span className={`text-[11px] font-mono ${metaDescriptionEn.length > 160 ? "text-amber-500 font-bold" : "text-zinc-400"}`}>
                                                {metaDescriptionEn.length}/160 chars {metaDescriptionEn.length > 160 && "(warn: >160)"}
                                            </span>
                                        </div>
                                        <textarea
                                            rows={3}
                                            value={metaDescriptionEn}
                                            onChange={(e) => setMetaDescriptionEn(e.target.value)}
                                            placeholder="Leave empty to use English Excerpt"
                                            className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-primary transition-all resize-y"
                                        />
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                                Meta Description (Bangla)
                                            </label>
                                            <span className={`text-[11px] font-mono ${metaDescriptionBn.length > 160 ? "text-amber-500 font-bold" : "text-zinc-400"}`}>
                                                {metaDescriptionBn.length}/160 chars {metaDescriptionBn.length > 160 && "(warn: >160)"}
                                            </span>
                                        </div>
                                        <textarea
                                            rows={3}
                                            value={metaDescriptionBn}
                                            onChange={(e) => setMetaDescriptionBn(e.target.value)}
                                            placeholder="Leave empty to use Bangla Excerpt"
                                            className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-primary transition-all resize-y"
                                        />
                                    </div>
                                </div>

                                {/* Keywords / Tags (EN & BN) */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                                            <IconTag className="h-3.5 w-3.5 text-primary" /> Keywords / Meta Tags (English)
                                        </label>
                                        <input
                                            type="text"
                                            value={keywordsEn}
                                            onChange={(e) => setKeywordsEn(e.target.value)}
                                            placeholder="system design, database, caching, performance"
                                            className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-primary transition-all"
                                        />
                                        <p className="mt-1 text-[11px] text-zinc-400">Comma-separated tags.</p>
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                                            <IconTag className="h-3.5 w-3.5 text-primary" /> Keywords / Meta Tags (Bangla)
                                        </label>
                                        <input
                                            type="text"
                                            value={keywordsBn}
                                            onChange={(e) => setKeywordsBn(e.target.value)}
                                            placeholder="সিস্টেম ডিজাইন, ডাটাবেস, ক্যাশিং"
                                            className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-primary transition-all"
                                        />
                                        <p className="mt-1 text-[11px] text-zinc-400">কমা দ্বারা বিভক্ত ট্যাগ।</p>
                                    </div>
                                </div>

                                {/* OG Image & Canonical URL */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                                            <IconPhoto className="h-3.5 w-3.5 text-primary" /> OpenGraph / Social Preview Image URL
                                        </label>
                                        <input
                                            type="url"
                                            value={ogImage}
                                            onChange={(e) => setOgImage(e.target.value)}
                                            placeholder="https://example.com/images/og-banner.png"
                                            className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-primary transition-all font-mono"
                                        />
                                        {ogImage && !ogImage.startsWith("http") && (
                                            <p className="mt-1 text-[11px] text-amber-500">Must be a valid absolute URL starting with http:// or https://</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                                            <IconLink className="h-3.5 w-3.5 text-primary" /> Canonical URL Override
                                        </label>
                                        <input
                                            type="url"
                                            value={canonicalUrl}
                                            onChange={(e) => setCanonicalUrl(e.target.value)}
                                            placeholder="https://cobalt.studio/resources/original-article"
                                            className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-primary transition-all font-mono"
                                        />
                                        <p className="mt-1 text-[11px] text-zinc-400">Optional. Use if republished from another domain.</p>
                                    </div>
                                </div>

                                {/* Indexing options (noIndex) */}
                                <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
                                    <div>
                                        <p className="text-xs font-bold text-foreground">Block Search Engines (noIndex)</p>
                                        <p className="text-[11px] text-zinc-400">If enabled, search engines will be instructed not to index this article or show it in search results.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={noIndex}
                                            onChange={(e) => setNoIndex(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-zinc-300 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:after:border-zinc-600 peer-checked:bg-red-500"></div>
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Content Editor & Preview Tabs */}
                    <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/40">
                        {/* Tab header */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                            {/* Language Selector Tabs */}
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setEditorLang("en")}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                                        editorLang === "en"
                                            ? "bg-primary text-white shadow-xs"
                                            : "bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-foreground"
                                    }`}
                                >
                                    🇬🇧 English Content{" "}
                                    <span className="text-red-300">*</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditorLang("bn")}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                                        editorLang === "bn"
                                            ? "bg-primary text-white shadow-xs"
                                            : "bg-zinc-200/60 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-foreground"
                                    }`}
                                >
                                    🇧🇩 বাংলা Content
                                </button>
                            </div>

                            {/* Write / Preview Tab & Word count */}
                            <div className="flex items-center justify-between sm:justify-end gap-3">
                                <div className="flex items-center gap-1 bg-zinc-200/60 dark:bg-zinc-950 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab("write")}
                                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                            activeTab === "write"
                                                ? "bg-white dark:bg-zinc-800 text-foreground shadow-xs"
                                                : "text-zinc-400 hover:text-foreground"
                                        }`}
                                    >
                                        Write Markdown
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab("preview")}
                                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                            activeTab === "preview"
                                                ? "bg-white dark:bg-zinc-800 text-foreground shadow-xs"
                                                : "text-zinc-400 hover:text-foreground"
                                        }`}
                                    >
                                        Preview Article
                                    </button>
                                </div>

                                <span className="text-xs text-zinc-400 font-mono">
                                    {wordCount} words
                                </span>
                            </div>
                        </div>

                        {/* Editor body */}
                        {activeTab === "write" ? (
                            <div>
                                {editorLang === "en" ? (
                                    <textarea
                                        required
                                        rows={18}
                                        value={contentEn}
                                        onChange={(e) =>
                                            setContentEn(e.target.value)
                                        }
                                        placeholder="## Introduction (English)&#10;&#10;Write your article content using standard Markdown syntax..."
                                        className="w-full p-4 bg-transparent text-sm font-mono focus:outline-none leading-relaxed resize-y border-none"
                                    />
                                ) : (
                                    <textarea
                                        rows={18}
                                        value={contentBn}
                                        onChange={(e) =>
                                            setContentBn(e.target.value)
                                        }
                                        placeholder="## পরিচিতি (বাংলা)&#10;&#10;মার্কডাউন ব্যবহার করে আপনার আর্টিকেলের বাংলা ভার্সন লিখুন..."
                                        className="w-full p-4 bg-transparent text-sm font-mono focus:outline-none leading-relaxed resize-y border-none"
                                    />
                                )}
                            </div>
                        ) : (
                            <div className="p-6 max-w-none prose dark:prose-invert prose-headings:font-bold prose-a:text-primary min-h-100">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: previewHtml,
                                    }}
                                    className="leading-relaxed"
                                />
                            </div>
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

                    {/* Submit Bar */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={
                                isSubmitting ||
                                slugStatus === "taken" ||
                                slugStatus === "invalid"
                            }
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-primary hover:opacity-90 disabled:opacity-50 text-white transition-all shadow-lg cursor-pointer"
                        >
                            {isSubmitting ? (
                                <>
                                    <IconLoader2 className="h-5 w-5 animate-spin" />{" "}
                                    Publishing Article...
                                </>
                            ) : (
                                <>
                                    <IconPlus className="h-5 w-5" /> Publish
                                    Article
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </main>

            <Footer />
        </div>
    );
}
