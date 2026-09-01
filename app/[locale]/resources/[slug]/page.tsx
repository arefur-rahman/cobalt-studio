import { Marked } from "marked";
import { notFound } from "next/navigation";
import {
    getAdjacentArticles,
    getAllArticleSlugs,
    getArticleBySlug,
} from "../articles";
import ArticleClient from "./ArticleClient";

interface Props {
    params: Promise<{ slug: string; locale?: string }>;
}

export const revalidate = 60; // Revalidate dynamic articles every 60s
export const dynamicParams = true; // Allow on-demand rendering of newly added articles

// Generate static routes for the articles at build time (SSG)
export async function generateStaticParams() {
    const slugs = await getAllArticleSlugs();
    return slugs.map((slug) => ({
        slug,
    }));
}

const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://cobalt-studio-xi.vercel.app"
).replace(/\/$/, "");
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: Props) {
    const { locale = "en", slug } = await params;
    const article = await getArticleBySlug(slug, locale);

    if (!article) {
        return {
            title: "Article Not Found | Cobalt Studio",
            robots: { index: false, follow: false },
        };
    }

    const title = article.metaTitle || article.title;
    const description = article.metaDescription || article.excerpt;
    const pageTitle = `${title} | Cobalt Studio`;
    const canonicalUrl =
        article.canonicalUrl || `${SITE_URL}/${locale}/resources/${slug}`;

    const ogImages = article.ogImage
        ? [
              {
                  url: article.ogImage,
                  width: 1200,
                  height: 630,
                  alt: title,
              },
          ]
        : [
              {
                  url: DEFAULT_OG_IMAGE,
                  width: 1200,
                  height: 630,
                  alt: "Cobalt Studio",
              },
          ];

    return {
        title: pageTitle,
        description,
        keywords:
            article.keywords && article.keywords.length > 0
                ? article.keywords
                : [article.category, "Cobalt Studio"],
        robots: {
            index: !article.noIndex,
            follow: !article.noIndex,
        },
        alternates: {
            canonical: canonicalUrl,
            languages: {
                en: `${SITE_URL}/en/resources/${slug}`,
                bn: `${SITE_URL}/bn/resources/${slug}`,
            },
        },
        openGraph: {
            title,
            description,
            type: "article",
            publishedTime: article.publishDate,
            authors: ["Cobalt Studio", "Arefur Rahman Khan"],
            images: ogImages,
            locale: locale === "bn" ? "bn_BD" : "en_US",
            siteName: "Cobalt Studio",
            url: `${SITE_URL}/${locale}/resources/${slug}`,
        },
        twitter: {
            card: article.ogImage ? "summary_large_image" : "summary",
            title,
            description,
            images: ogImages,
        },
    };
}

export default async function ArticlePage({ params }: Props) {
    const { locale, slug } = await params;
    const article = await getArticleBySlug(slug, locale);

    if (!article) {
        notFound();
    }

    // Configure marked to inject ids for headings and custom code block wrappers
    const renderer = {
        heading({ text, depth }: { text: string; depth: number }) {
            const id = text
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            return `<h${depth} id="${id}">${text}</h${depth}>`;
        },
        code({ text, lang }: { text: string; lang?: string }) {
            const language = (lang || "").trim();
            const displayLang =
                !language || language === "code"
                    ? "TEXT"
                    : language.toUpperCase();
            const escapedText = text
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");

            const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" /><path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" /></svg>`;

            return `<div class="code-block-wrapper relative group my-6 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/30 shadow-2xs">
<div class="code-header flex items-center justify-between px-4 py-2.5 border-b border-zinc-200/70 dark:border-zinc-800/80 bg-zinc-100/80 dark:bg-zinc-900/80 text-xs font-mono text-zinc-500 font-medium select-none">
<span class="uppercase tracking-wider text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
<span class="w-1.5 h-1.5 rounded-full bg-primary/70 inline-block"></span>${displayLang}
</span>
<button type="button" class="copy-code-btn px-2.5 py-1 rounded-md bg-white hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-all text-xs flex items-center gap-1.5 border border-zinc-200 dark:border-zinc-700 shadow-2xs cursor-pointer">
${copyIcon}<span>Copy</span>
</button>
</div>
<pre class="p-4 overflow-x-auto m-0! bg-transparent! border-0! rounded-none! shadow-none!"><code class="language-${language || "text"} font-mono text-xs text-zinc-800 dark:text-zinc-100 block w-full">${escapedText}</code></pre>
</div>`;
        },
    };

    const localMarked = new Marked({
        gfm: true,
        breaks: true,
    });
    localMarked.use({ renderer });

    // Parse markdown to HTML on the server to keep client bundles lightweight
    const htmlContent = await localMarked.parse(article.content || "");

    // Fetch next and previous articles for engagement navigation
    const { prev, next } = await getAdjacentArticles(slug, locale);

    return (
        <ArticleClient
            article={article}
            htmlContent={htmlContent}
            prevArticle={prev}
            nextArticle={next}
        />
    );
}
