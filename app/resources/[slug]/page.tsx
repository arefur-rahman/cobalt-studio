import { Marked } from "marked";
import { notFound } from "next/navigation";
import {
    getAdjacentArticles,
    getAllArticleSlugs,
    getArticleBySlug,
} from "../articles";
import ArticleClient from "./ArticleClient";

interface Props {
    params: Promise<{ slug: string }>;
}

// Generate static routes for the articles at build time (SSG)
export async function generateStaticParams() {
    const slugs = await getAllArticleSlugs();
    return slugs.map((slug) => ({
        slug,
    }));
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        return {
            title: "Article Not Found | Cobalt Studio",
        };
    }

    return {
        title: `${article.title} | Cobalt Studio`,
        description: article.excerpt,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            type: "article",
            publishedTime: article.publishDate,
            authors: ["Arefur Rahman Khan"],
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.excerpt,
        },
    };
}

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    // Configure marked to inject ids for table of contents navigation
    const renderer = {
        heading({ text, depth }: { text: string; depth: number }) {
            const id = text
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            return `<h${depth} id="${id}">${text}</h${depth}>`;
        },
    };

    const localMarked = new Marked();
    localMarked.use({ renderer });

    // Parse markdown to HTML on the server to keep client bundles lightweight
    const htmlContent = await localMarked.parse(article.content);

    // Fetch next and previous articles for engagement navigation
    const { prev, next } = await getAdjacentArticles(slug);

    return (
        <ArticleClient
            article={article}
            htmlContent={htmlContent}
            prevArticle={prev}
            nextArticle={next}
        />
    );
}
