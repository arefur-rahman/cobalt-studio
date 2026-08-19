"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "";

export async function checkSlugAvailability(
    slug: string,
    currentSlugOrId?: string,
): Promise<{
    isAvailable: boolean;
    error?: string;
}> {
    const formattedSlug = slug.trim().toLowerCase();
    if (!formattedSlug) {
        return { isAvailable: false, error: "Slug cannot be empty." };
    }

    // Check slug format (alphanumeric, hyphens, underscores)
    if (!/^[a-z0-9-_]+$/.test(formattedSlug)) {
        return {
            isAvailable: false,
            error: "Slug must contain only lowercase letters, numbers, hyphens, or underscores.",
        };
    }

    try {
        const existingArticle = await prisma.article.findUnique({
            where: { slug: formattedSlug },
        });

        if (
            existingArticle &&
            existingArticle.slug !== currentSlugOrId &&
            existingArticle.id !== currentSlugOrId
        ) {
            return {
                isAvailable: false,
                error: "This slug is already taken. Please choose another slug.",
            };
        }

        return { isAvailable: true };
    } catch (error) {
        console.error("Error checking slug availability:", error);
        return {
            isAvailable: false,
            error: "Failed to check slug availability.",
        };
    }
}

interface CreateArticleInput {
    title?: string;
    titleEn?: string;
    titleBn?: string;
    slug: string;
    category: string;
    excerpt?: string;
    excerptEn?: string;
    excerptBn?: string;
    content?: string;
    contentEn?: string;
    contentBn?: string;
    readTime?: number;
}

export async function createArticleAction(
    input: CreateArticleInput,
    idToken: string,
) {
    if (!idToken) {
        return {
            success: false,
            error: "Authentication token missing. Please sign in.",
        };
    }

    // 1. Server-side Token Verification via Firebase Identity Toolkit API
    let userEmail: string | undefined;
    let userUid: string | undefined;

    try {
        const apiKey = process.env.NEXT_PUBLIC_APIKEY;
        if (!apiKey) {
            return {
                success: false,
                error: "Firebase API Key is missing on server.",
            };
        }

        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idToken }),
            },
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Firebase token verification failed:", errorData);
            return {
                success: false,
                error: "Invalid or expired authentication session. Please sign in again.",
            };
        }

        const data = await response.json();
        const firebaseUser = data.users?.[0];

        userEmail = firebaseUser?.email;
        userUid = firebaseUser?.localId;
    } catch (error) {
        console.error("Failed to verify authentication token:", error);
        return {
            success: false,
            error: "Server authentication check failed.",
        };
    }

    // 2. Strict Email Verification
    if (!userEmail || userEmail.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        return {
            success: false,
            error: `Unauthorized: Article publishing is reserved exclusively for ${ADMIN_EMAIL}.`,
        };
    }

    // 3. Database Check against Prisma User table
    if (userUid) {
        const dbUser = await prisma.user.findUnique({
            where: { firebaseUid: userUid },
        });

        if (
            !dbUser ||
            dbUser.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()
        ) {
            return {
                success: false,
                error: "Unauthorized: User record mismatch in database.",
            };
        }
    }

    // 4. Validate Article Input
    const titleEn = (input.titleEn || input.title || "").trim();
    const titleBn = (input.titleBn || input.title || titleEn).trim();
    const excerptEn = (input.excerptEn || input.excerpt || "").trim();
    const excerptBn = (input.excerptBn || input.excerpt || excerptEn).trim();
    const contentEn = (input.contentEn || input.content || "").trim();
    const contentBn = (input.contentBn || input.content || contentEn).trim();
    const category = input.category.trim();
    const slug = input.slug.trim().toLowerCase();

    if (!titleEn || !slug || !category || !excerptEn || !contentEn) {
        return {
            success: false,
            error: "All required fields (Title, Slug, Category, Excerpt, Content) must be filled.",
        };
    }

    if (!/^[a-z0-9-_]+$/.test(slug)) {
        return {
            success: false,
            error: "Slug must contain only lowercase letters, numbers, hyphens, or underscores.",
        };
    }

    // 5. Verify Slug Uniqueness in Database
    const existingArticle = await prisma.article.findUnique({
        where: { slug },
    });

    if (existingArticle) {
        return {
            success: false,
            error: `An article with slug "${slug}" already exists in database.`,
        };
    }

    // Auto-calculate read time if not provided (approx. 200 words per minute)
    const wordCount = contentEn.trim().split(/\s+/).length;
    const readTime =
        input.readTime && input.readTime > 0
            ? Number(input.readTime)
            : Math.max(1, Math.ceil(wordCount / 200));

    try {
        const newArticle = await prisma.article.create({
            data: {
                titleEn,
                titleBn,
                slug,
                category,
                excerptEn,
                excerptBn,
                contentEn,
                contentBn,
                readTime,
                publishDate: new Date(),
            },
        });

        // Revalidate cache for resources list and new article route
        revalidatePath("/resources");
        revalidatePath(`/resources/${slug}`);

        const pubDateStr = newArticle.publishDate
            ? newArticle.publishDate.toISOString()
            : new Date().toISOString();

        return {
            success: true,
            article: {
                ...newArticle,
                publishDate: pubDateStr,
            },
        };
    } catch (error: unknown) {
        console.error("Error creating article in database:", error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to save article to database.",
        };
    }
}

export async function deleteArticleAction(idOrSlug: string, idToken: string) {
    if (!idToken) {
        return {
            success: false,
            error: "Authentication token missing. Please sign in.",
        };
    }

    if (!idOrSlug?.trim()) {
        return {
            success: false,
            error: "Article identifier is required.",
        };
    }

    // 1. Server-side Token Verification via Firebase Identity Toolkit API
    let userEmail: string | undefined;
    let userUid: string | undefined;

    try {
        const apiKey = process.env.NEXT_PUBLIC_APIKEY;
        if (!apiKey) {
            return {
                success: false,
                error: "Firebase API Key is missing on server.",
            };
        }

        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idToken }),
            },
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Firebase token verification failed:", errorData);
            return {
                success: false,
                error: "Invalid or expired authentication session. Please sign in again.",
            };
        }

        const data = await response.json();
        const firebaseUser = data.users?.[0];

        userEmail = firebaseUser?.email;
        userUid = firebaseUser?.localId;
    } catch (error) {
        console.error("Failed to verify authentication token:", error);
        return {
            success: false,
            error: "Server authentication check failed.",
        };
    }

    // 2. Strict Email Verification
    if (!userEmail || userEmail.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        return {
            success: false,
            error: `Unauthorized: Article deletion is reserved exclusively for ${ADMIN_EMAIL}.`,
        };
    }

    // 3. Database Check against Prisma User table
    if (userUid) {
        const dbUser = await prisma.user.findUnique({
            where: { firebaseUid: userUid },
        });

        if (
            !dbUser ||
            dbUser.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()
        ) {
            return {
                success: false,
                error: "Unauthorized: User record mismatch in database.",
            };
        }
    }

    // 4. Find and Delete Article in Prisma Database
    try {
        const targetSlug = idOrSlug.trim().toLowerCase();
        let targetArticle = await prisma.article.findUnique({
            where: { slug: targetSlug },
        });

        if (!targetArticle && idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
            targetArticle = await prisma.article.findUnique({
                where: { id: idOrSlug },
            });
        }

        if (!targetArticle) {
            return {
                success: false,
                error: "Article not found in database.",
            };
        }

        await prisma.article.delete({
            where: { id: targetArticle.id },
        });

        // Revalidate cache for resources list and deleted article route
        revalidatePath("/resources");
        revalidatePath(`/resources/${targetArticle.slug}`);

        return {
            success: true,
        };
    } catch (error: unknown) {
        console.error("Error deleting article from database:", error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to delete article from database.",
        };
    }
}

interface UpdateArticleInput {
    id: string;
    title?: string;
    titleEn?: string;
    titleBn?: string;
    slug: string;
    category: string;
    excerpt?: string;
    excerptEn?: string;
    excerptBn?: string;
    content?: string;
    contentEn?: string;
    contentBn?: string;
    readTime?: number;
}

export async function updateArticleAction(
    input: UpdateArticleInput,
    idToken: string,
) {
    if (!idToken) {
        return {
            success: false,
            error: "Authentication token missing. Please sign in.",
        };
    }

    // 1. Server-side Token Verification via Firebase Identity Toolkit API
    let userEmail: string | undefined;
    let userUid: string | undefined;

    try {
        const apiKey = process.env.NEXT_PUBLIC_APIKEY;
        if (!apiKey) {
            return {
                success: false,
                error: "Firebase API Key is missing on server.",
            };
        }

        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idToken }),
            },
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Firebase token verification failed:", errorData);
            return {
                success: false,
                error: "Invalid or expired authentication session. Please sign in again.",
            };
        }

        const data = await response.json();
        const firebaseUser = data.users?.[0];

        userEmail = firebaseUser?.email;
        userUid = firebaseUser?.localId;
    } catch (error) {
        console.error("Failed to verify authentication token:", error);
        return {
            success: false,
            error: "Server authentication check failed.",
        };
    }

    // 2. Strict Email Verification
    if (!userEmail || userEmail.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        return {
            success: false,
            error: `Unauthorized: Article updates are reserved exclusively for ${ADMIN_EMAIL}.`,
        };
    }

    // 3. Database Check against Prisma User table
    if (userUid) {
        const dbUser = await prisma.user.findUnique({
            where: { firebaseUid: userUid },
        });

        if (
            !dbUser ||
            dbUser.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()
        ) {
            return {
                success: false,
                error: "Unauthorized: User record mismatch in database.",
            };
        }
    }

    // 4. Validate Article Input
    const { id } = input;
    const titleEn = (input.titleEn || input.title || "").trim();
    const titleBn = (input.titleBn || input.title || titleEn).trim();
    const excerptEn = (input.excerptEn || input.excerpt || "").trim();
    const excerptBn = (input.excerptBn || input.excerpt || excerptEn).trim();
    const contentEn = (input.contentEn || input.content || "").trim();
    const contentBn = (input.contentBn || input.content || contentEn).trim();
    const category = input.category.trim();
    const newSlug = input.slug.trim().toLowerCase();

    if (!id || !titleEn || !newSlug || !category || !excerptEn || !contentEn) {
        return {
            success: false,
            error: "All required fields (ID, Title, Slug, Category, Excerpt, Content) must be filled.",
        };
    }

    if (!/^[a-z0-9-_]+$/.test(newSlug)) {
        return {
            success: false,
            error: "Slug must contain only lowercase letters, numbers, hyphens, or underscores.",
        };
    }

    try {
        let existingArticle = await prisma.article.findUnique({
            where: { id },
        });

        if (!existingArticle) {
            existingArticle = await prisma.article.findUnique({
                where: { slug: id },
            });
        }

        if (!existingArticle) {
            return {
                success: false,
                error: "Article not found in database.",
            };
        }

        // If slug is changing, verify new slug isn't taken by another article
        if (existingArticle.slug !== newSlug) {
            const slugCollision = await prisma.article.findUnique({
                where: { slug: newSlug },
            });

            if (slugCollision && slugCollision.id !== existingArticle.id) {
                return {
                    success: false,
                    error: `Slug "${newSlug}" is already taken by another article.`,
                };
            }
        }

        // Auto-calculate read time if not provided
        const wordCount = contentEn.trim().split(/\s+/).length;
        const readTime =
            input.readTime && input.readTime > 0
                ? Number(input.readTime)
                : Math.max(1, Math.ceil(wordCount / 200));

        const updatedArticle = await prisma.article.update({
            where: { id: existingArticle.id },
            data: {
                titleEn,
                titleBn,
                slug: newSlug,
                category,
                excerptEn,
                excerptBn,
                contentEn,
                contentBn,
                readTime,
                updatedAt: new Date(),
            },
        });

        // Revalidate cache for resources list and updated article routes
        revalidatePath("/resources");
        revalidatePath(`/resources/${existingArticle.slug}`);
        revalidatePath(`/resources/${newSlug}`);

        const pubDateStr = updatedArticle.publishDate
            ? updatedArticle.publishDate.toISOString()
            : new Date().toISOString();

        return {
            success: true,
            article: {
                ...updatedArticle,
                publishDate: pubDateStr,
            },
        };
    } catch (error: unknown) {
        console.error("Error updating article in database:", error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to update article in database.",
        };
    }
}
