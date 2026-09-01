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
    metaTitle?: string;
    metaTitleEn?: string;
    metaTitleBn?: string;
    metaDescription?: string;
    metaDescriptionEn?: string;
    metaDescriptionBn?: string;
    keywords?: string[];
    keywordsEn?: string[] | string;
    keywordsBn?: string[] | string;
    ogImage?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
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

    const title = isBn ? titleBn || titleEn : titleEn || titleBn;
    const excerpt = isBn ? excerptBn || excerptEn : excerptEn || excerptBn;
    const content = isBn ? contentBn || contentEn : contentEn || contentBn;

    // Localized SEO fields with fallbacks
    const metaTitleEn = doc.metaTitleEn || "";
    const metaTitleBn = doc.metaTitleBn || metaTitleEn;
    const metaTitleRaw = isBn
        ? metaTitleBn || metaTitleEn
        : metaTitleEn || metaTitleBn;
    const metaTitle =
        metaTitleRaw && metaTitleRaw.trim() ? metaTitleRaw.trim() : title;

    const metaDescriptionEn = doc.metaDescriptionEn || "";
    const metaDescriptionBn = doc.metaDescriptionBn || metaDescriptionEn;
    const metaDescriptionRaw = isBn
        ? metaDescriptionBn || metaDescriptionEn
        : metaDescriptionEn || metaDescriptionBn;
    const metaDescription =
        metaDescriptionRaw && metaDescriptionRaw.trim()
            ? metaDescriptionRaw.trim()
            : excerpt;

    const keywordsEnList: string[] = Array.isArray(doc.keywordsEn)
        ? doc.keywordsEn
        : typeof doc.keywordsEn === "string" && doc.keywordsEn.trim()
          ? doc.keywordsEn
                .split(",")
                .map((k: string) => k.trim())
                .filter(Boolean)
          : [];

    const keywordsBnList: string[] = Array.isArray(doc.keywordsBn)
        ? doc.keywordsBn
        : typeof doc.keywordsBn === "string" && doc.keywordsBn.trim()
          ? doc.keywordsBn
                .split(",")
                .map((k: string) => k.trim())
                .filter(Boolean)
          : keywordsEnList;

    const keywords = isBn
        ? keywordsBnList.length > 0
            ? keywordsBnList
            : keywordsEnList
        : keywordsEnList.length > 0
          ? keywordsEnList
          : keywordsBnList;

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
        metaTitle,
        metaTitleEn: doc.metaTitleEn || "",
        metaTitleBn: doc.metaTitleBn || "",
        metaDescription,
        metaDescriptionEn: doc.metaDescriptionEn || "",
        metaDescriptionBn: doc.metaDescriptionBn || "",
        keywords,
        keywordsEn: keywordsEnList,
        keywordsBn: keywordsBnList,
        ogImage: doc.ogImage || "",
        canonicalUrl: doc.canonicalUrl || "",
        noIndex: Boolean(doc.noIndex),
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
export async function getAllArticles(
    locale: string = "en",
): Promise<Article[]> {
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
