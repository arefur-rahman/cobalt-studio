import { prisma } from "@/lib/prisma";

// Define TypeScript structures for articles
export interface Article {
    id?: string;
    slug: string;
    title: string;
    category: string;
    publishDate: string; // ISO string for consistent serialization between server and client
    readTime: number; // in minutes
    excerpt: string;
    content: string; // Markdown format
}

// Fetch a single article by slug from MongoDB
export async function getArticleBySlug(slug: string): Promise<Article | null> {
    try {
        const article = await prisma.article.findUnique({
            where: { slug },
        });

        if (!article) return null;

        return {
            id: article.id,
            slug: article.slug,
            title: article.title,
            category: article.category,
            publishDate: article.publishDate.toISOString(),
            readTime: article.readTime,
            excerpt: article.excerpt,
            content: article.content,
        };
    } catch (error) {
        console.error(`Error fetching article by slug (${slug}):`, error);
        return null;
    }
}

// Fetch all articles from MongoDB
export async function getAllArticles(): Promise<Article[]> {
    try {
        const articles = await prisma.article.findMany({
            orderBy: {
                publishDate: "desc",
            },
        });

        return articles.map((article) => ({
            id: article.id,
            slug: article.slug,
            title: article.title,
            category: article.category,
            publishDate: article.publishDate.toISOString(),
            readTime: article.readTime,
            excerpt: article.excerpt,
            content: article.content,
        }));
    } catch (error) {
        console.error("Error fetching all articles:", error);
        return [];
    }
}

// Fetch distinct categories dynamically from MongoDB
export async function getCategories(): Promise<string[]> {
    try {
        const articles = await prisma.article.findMany({
            select: {
                category: true,
            },
            distinct: ["category"],
        });

        const categories = articles.map((a) => a.category).filter(Boolean);

        return ["All", ...Array.from(new Set(categories))];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return ["All"];
    }
}

// Fetch adjacent (previous and next) articles dynamically
export async function getAdjacentArticles(
    slug: string,
): Promise<{ prev: Article | null; next: Article | null }> {
    try {
        const allArticles = await getAllArticles();
        const index = allArticles.findIndex((a) => a.slug === slug);

        if (index === -1) return { prev: null, next: null };

        const prev = index > 0 ? allArticles[index - 1] : null;
        const next =
            index < allArticles.length - 1 ? allArticles[index + 1] : null;

        return { prev, next };
    } catch (error) {
        console.error(`Error fetching adjacent articles for (${slug}):`, error);
        return { prev: null, next: null };
    }
}

// Fetch all article slugs for static params and sitemaps
export async function getAllArticleSlugs(): Promise<string[]> {
    try {
        const articles = await prisma.article.findMany({
            select: { slug: true },
        });
        return articles.map((a) => a.slug);
    } catch (error) {
        console.error("Error fetching article slugs:", error);
        return [];
    }
}
