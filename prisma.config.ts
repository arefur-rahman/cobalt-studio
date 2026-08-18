import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { defineConfig } from "prisma/config";

// Read environment files (.env.local first, then .env)
const envFiles = [".env.local", ".env"];
for (const envFile of envFiles) {
    const envPath = resolve(process.cwd(), envFile);
    if (existsSync(envPath)) {
        const content = readFileSync(envPath, "utf8");
        for (const line of content.split("\n")) {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith("#")) {
                const eqIdx = trimmed.indexOf("=");
                if (eqIdx !== -1) {
                    const key = trimmed.slice(0, eqIdx).trim();
                    let val = trimmed.slice(eqIdx + 1).trim();
                    if (
                        (val.startsWith('"') && val.endsWith('"')) ||
                        (val.startsWith("'") && val.endsWith("'"))
                    ) {
                        val = val.slice(1, -1);
                    }
                    if (key && val && !process.env[key]) {
                        process.env[key] = val;
                    }
                }
            }
        }
    }
}

const dbUrl = process.env["DATABASE_URL"]?.startsWith("mongo")
    ? process.env["DATABASE_URL"]
    : process.env["DB_URL"]?.startsWith("mongo")
      ? process.env["DB_URL"]
      : process.env["DATABASE_URL"] || process.env["DB_URL"] || "";

if (dbUrl) {
    process.env["DATABASE_URL"] = dbUrl;
}

export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    datasource: {
        url: dbUrl,
    },
});
