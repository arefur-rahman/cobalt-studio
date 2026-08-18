import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

const getDatasourceUrl = () => {
    const url = process.env.DATABASE_URL || process.env.DB_URL;
    if (url && url.startsWith("mongo")) return url;
    return undefined;
};

const datasourceUrl = getDatasourceUrl();

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient(
        datasourceUrl
            ? {
                  datasourceUrl,
              }
            : undefined,
    );

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
