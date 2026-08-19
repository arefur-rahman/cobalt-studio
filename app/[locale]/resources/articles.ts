import { prisma } from "@/lib/prisma";

// Define TypeScript structures for articles
export interface Article {
    id?: string;
    slug: string;
    title: string;
    titleEn?: string;
    titleBn?: string;
    category: string;
    publishDate: string; // ISO string for consistent serialization between server and client
    readTime: number; // in minutes
    excerpt: string;
    excerptEn?: string;
    excerptBn?: string;
    content: string; // Markdown format
    contentEn?: string;
    contentBn?: string;
}

// Helper to format Prisma article to client Article object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatArticle(doc: any, locale: string = "en"): Article {
    const titleEn = doc.titleEn || doc.title || "";
    const titleBn = doc.titleBn || doc.title || titleEn;
    const excerptEn = doc.excerptEn || doc.excerpt || "";
    const excerptBn = doc.excerptBn || doc.excerpt || excerptEn;
    const contentEn = doc.contentEn || doc.content || "";
    const contentBn = doc.contentBn || doc.content || contentEn;

    const isBn = locale === "bn";

    const publishDateStr = doc.publishDate
        ? new Date(doc.publishDate).toISOString()
        : doc.createdAt
          ? new Date(doc.createdAt).toISOString()
          : new Date().toISOString();

    const title = isBn ? (titleBn || titleEn) : (titleEn || titleBn);
    const excerpt = isBn ? (excerptBn || excerptEn) : (excerptEn || excerptBn);
    const content = isBn ? (contentBn || contentEn) : (contentEn || contentBn);

    return {
        id: doc.id,
        slug: doc.slug,
        title: title || "Untitled Article",
        titleEn,
        titleBn,
        category: doc.category || "General",
        publishDate: publishDateStr,
        readTime: doc.readTime || 1,
        excerpt: excerpt || "",
        excerptEn,
        excerptBn,
        content: content || "",
        contentEn,
        contentBn,
    };
}

// Fetch a single article by slug from MongoDB
export async function getArticleBySlug(
    slug: string,
    locale: string = "en",
): Promise<Article | null> {
    try {
        const article = await prisma.article.findUnique({
            where: { slug },
        });

        if (!article) return null;

        return formatArticle(article, locale);
    } catch (error) {
        console.error(`Error fetching article by slug (${slug}):`, error);
        return null;
    }
}

// Fetch all articles from MongoDB
export async function getAllArticles(locale: string = "en"): Promise<Article[]> {
    try {
        const articles = await prisma.article.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return articles.map((article) => formatArticle(article, locale));
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
    locale: string = "en",
): Promise<{ prev: Article | null; next: Article | null }> {
    try {
        const allArticles = await getAllArticles(locale);
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
