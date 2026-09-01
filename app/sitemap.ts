import { prisma } from "@/lib/prisma";
import { MetadataRoute } from "next";

const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://cobalt-studio-xi.vercel.app"
).replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch articles from DB, excluding noIndex articles
    let articles: { slug: string; updatedAt: Date; createdAt: Date; noIndex: boolean }[] = [];
    try {
        articles = await prisma.article.findMany({
            where: {
                noIndex: false,
            },
            select: {
                slug: true,
                updatedAt: true,
                createdAt: true,
                noIndex: true,
            },
        });
    } catch (error) {
        console.error("Failed to fetch articles for sitemap:", error);
    }

    const staticRoutes = ["", "/resources", "/about", "/courses", "/privacy", "/terms"];
    const locales = ["en", "bn"];

    const staticEntries: MetadataRoute.Sitemap = [];

    locales.forEach((locale) => {
        staticRoutes.forEach((route) => {
            staticEntries.push({
                url: `${SITE_URL}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: route === "" ? "daily" : "weekly",
                priority: route === "" ? 1.0 : 0.8,
            });
        });
    });

    const articleEntries: MetadataRoute.Sitemap = articles.flatMap((article) => {
        const lastMod = article.updatedAt || article.createdAt || new Date();
        return locales.map((locale) => ({
            url: `${SITE_URL}/${locale}/resources/${article.slug}`,
            lastModified: lastMod,
            changeFrequency: "weekly" as const,
            priority: 0.7,
        }));
    });

    return [...staticEntries, ...articleEntries];
}
