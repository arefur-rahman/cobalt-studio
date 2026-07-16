"use client";

import Footer from "@/components/global/Footer";
import TopNavBar from "@/components/global/TopNavBar";
import { IconList } from "@tabler/icons-react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Article } from "../articles";
import ArticleHeader from "./components/ArticleHeader";
import KeepReading from "./components/KeepReading";
import ShareSidebar from "./components/ShareSidebar";
import TableOfContents from "./components/TableOfContents";

interface HeadingItem {
    level: number;
    text: string;
    id: string;
}

interface ArticleClientProps {
    article: Article;
    htmlContent: string;
    prevArticle: Article | null;
    nextArticle: Article | null;
}

export default function ArticleClient({
    article,
    htmlContent,
    prevArticle,
    nextArticle,
}: ArticleClientProps) {
    const [copiedLink, setCopiedLink] = useState(false);
    const [activeId, setActiveId] = useState<string>("");
    const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
    const articleContainerRef = useRef<HTMLDivElement>(null);

    // 1. Framer motion native page scroll progress tracker
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 150,
        damping: 25,
        restDelta: 0.001,
    });

    // 2. Extract Headings dynamically for the Table of Contents
    const headings = useMemo<HeadingItem[]>(() => {
        const matches = [...article.content.matchAll(/^(##|###) +(.*)$/gm)];
        return matches.map((m) => {
            const level = m[1].length; // 2 for H2, 3 for H3
            const text = m[2].trim();
            const id = text
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            return { level, text, id };
        });
    }, [article.content]);

    // 3. Highlight TOC item based on viewport scroll position
    useEffect(() => {
        if (headings.length === 0) return;

        const headingElements = headings
            .map((h) => document.getElementById(h.id))
            .filter((el): el is HTMLElement => el !== null);

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries.filter(
                    (entry) => entry.isIntersecting,
                );
                if (visibleEntries.length > 0) {
                    const topVisible = visibleEntries.reduce((prev, curr) => {
                        return prev.boundingClientRect.top <
                            curr.boundingClientRect.top
                            ? prev
                            : curr;
                    });
                    setActiveId(topVisible.target.id);
                }
            },
            {
                rootMargin: "-100px 0px -70% 0px",
                threshold: 0.1,
            },
        );

        headingElements.forEach((el) => observer.observe(el));
        return () => {
            headingElements.forEach((el) => observer.unobserve(el));
        };
    }, [headings]);

    // 4. Smooth scrolling handler for TOC links
    const handleTocClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        id: string,
    ) => {
        e.preventDefault();
        setIsMobileTocOpen(false);
        const el = document.getElementById(id);
        if (el) {
            const offset = 90;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });

            window.history.pushState(null, "", `#${id}`);
            setActiveId(id);
        }
    };

    // 5. Injects copy button inside code blocks dynamically
    useEffect(() => {
        if (!articleContainerRef.current) return;

        const preElements = articleContainerRef.current.querySelectorAll("pre");
        preElements.forEach((pre) => {
            if (pre.querySelector(".copy-code-btn")) return;

            pre.style.position = "relative";
            pre.classList.add("group");

            const btn = document.createElement("button");
            btn.className =
                "copy-code-btn absolute top-3 right-3 p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-850 text-zinc-400 hover:text-foreground transition-all text-xs flex items-center gap-1 border border-zinc-250 dark:border-zinc-800 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200 z-10 backdrop-blur-xs shadow-xs cursor-pointer";

            const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" /><path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" /></svg>`;
            const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-emerald-450 dark:text-emerald-400" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>`;

            btn.innerHTML = `${copyIcon}<span>Copy</span>`;

            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const codeText = pre.querySelector("code")?.innerText || "";
                navigator.clipboard.writeText(codeText).then(() => {
                    btn.innerHTML = `${checkIcon}<span class="text-emerald-500 font-semibold">Copied!</span>`;
                    setTimeout(() => {
                        btn.innerHTML = `${copyIcon}<span>Copy</span>`;
                    }, 2000);
                });
            });

            pre.appendChild(btn);
        });
    }, [htmlContent]);

    // 6. Sharing & URL utilities
    const getArticleUrl = () => {
        if (typeof window !== "undefined") {
            return window.location.href;
        }
        return "";
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(getArticleUrl()).then(() => {
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2000);
        });
    };

    const handleShareTwitter = () => {
        const url = encodeURIComponent(getArticleUrl());
        const text = encodeURIComponent(
            `Check out "${article.title}" by @CobaltStudio:`,
        );
        window.open(
            `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
            "_blank",
            "noopener,noreferrer",
        );
    };

    const handleShareLinkedin = () => {
        const url = encodeURIComponent(getArticleUrl());
        window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            "_blank",
            "noopener,noreferrer",
        );
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <TopNavBar />

            {/* Reading progress bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] bg-primary origin-[0%] z-50 shadow-[0_0_8px_var(--primary)]"
                style={{ scaleX }}
            />

            {/* Title Hero Banner */}
            <ArticleHeader article={article} />

            {/* Content & Sidebars */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left TOC */}
                    <TableOfContents
                        headings={headings}
                        activeId={activeId}
                        onHeadingClick={handleTocClick}
                    />

                    {/* Central markdown content */}
                    <article className="lg:col-span-6 w-full max-w-2xl mx-auto lg:max-w-none">
                        <div
                            ref={articleContainerRef}
                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                            className="markdown-content text-zinc-850 dark:text-zinc-200 leading-relaxed text-base md:text-[17px] space-y-6 select-text
                                [&_h1]:hidden
                                [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-zinc-950 [&_h2]:dark:text-white [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:tracking-tight [&_h2]:text-wrap:balance [&_h2]:scroll-mt-28
                                [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-zinc-950 [&_h3]:dark:text-white [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:tracking-tight [&_h3]:scroll-mt-28
                                [&_p]:my-4 [&_p]:text-zinc-650 [&_p]:dark:text-zinc-300 [&_p]:text-wrap:pretty [&_p]:leading-relaxed
                                [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary/80 [&_a]:font-medium
                                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-4
                                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_ol]:my-4
                                [&_li]:text-zinc-650 [&_li]:dark:text-zinc-300
                                [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:text-zinc-600 [&_blockquote]:dark:text-zinc-400 [&_blockquote]:bg-primary/5 [&_blockquote]:py-3 [&_blockquote]:pr-4 [&_blockquote]:rounded-r-xl
                                [&_pre]:bg-zinc-50/50 [&_pre]:dark:bg-zinc-900/30 [&_pre]:border [&_pre]:border-zinc-200/80 [&_pre]:dark:border-zinc-800 [&_pre]:p-4 [&_pre]:rounded-2xl [&_pre]:overflow-x-auto [&_pre]:my-6 [&_pre]:shadow-xs
                                [&_code]:font-mono [&_code]:text-xs [&_code]:bg-zinc-100 [&_code]:dark:bg-zinc-800/60 [&_code]:text-primary [&_code]:dark:text-primary-foreground/90 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md
                                [&_pre_code]:bg-transparent [&_pre_code]:dark:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-zinc-800 [&_pre_code]:dark:text-zinc-100 [&_pre_code]:block [&_pre_code]:w-full [&_pre_code]:text-xs"
                        />

                        {/* TOC button trigger on mobile */}
                        {headings.length > 0 && (
                            <button
                                onClick={() => setIsMobileTocOpen(true)}
                                className="lg:hidden mt-8 flex items-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 text-xs font-semibold hover:border-primary/20 transition-all text-zinc-600 dark:text-zinc-300 w-full justify-center"
                            >
                                <IconList className="h-4 w-4 text-primary" />
                                <span>Table of Contents</span>
                            </button>
                        )}

                        {/* Pagination links */}
                        <KeepReading
                            prevArticle={prevArticle}
                            nextArticle={nextArticle}
                        />
                    </article>

                    {/* Right Toolbar */}
                    <ShareSidebar
                        handleShareTwitter={handleShareTwitter}
                        handleShareLinkedin={handleShareLinkedin}
                        handleCopyLink={handleCopyLink}
                        copiedLink={copiedLink}
                    />
                </div>
            </main>

            {/* Mobile TOC Drawer */}
            <AnimatePresence>
                {isMobileTocOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileTocOpen(false)}
                            className="fixed inset-0 bg-black z-40 lg:hidden"
                        />
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 250,
                            }}
                            className="fixed bottom-0 left-0 w-full bg-background rounded-t-3xl border-t border-zinc-200 dark:border-zinc-800/80 p-6 z-50 max-h-[80vh] overflow-y-auto lg:hidden shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-6 pb-2 border-b border-zinc-100 dark:border-zinc-900">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
                                    <IconList className="h-4 w-4 text-primary" />
                                    <span>Table of Contents</span>
                                </h3>
                                <button
                                    onClick={() => setIsMobileTocOpen(false)}
                                    className="text-xs font-bold text-zinc-450 hover:text-zinc-600"
                                >
                                    Close
                                </button>
                            </div>
                            <nav className="space-y-4">
                                {headings.map((h, i) => (
                                    <a
                                        key={i}
                                        href={`#${h.id}`}
                                        onClick={(e) => handleTocClick(e, h.id)}
                                        className={`block text-base transition-colors duration-150 leading-relaxed ${
                                            activeId === h.id
                                                ? "text-primary font-semibold border-l-2 border-primary pl-3"
                                                : "text-zinc-650 dark:text-zinc-400 border-l-2 border-transparent pl-3"
                                        } ${h.level === 3 ? "ml-4" : ""}`}
                                    >
                                        {h.text}
                                    </a>
                                ))}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
}
