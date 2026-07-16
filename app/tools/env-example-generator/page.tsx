"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
    IconFileCode,
    IconCopy,
    IconCheck,
    IconDownload,
} from "@tabler/icons-react";
import NavBarSticky from "@/components/global/NavBarSticky";
import BackNavigation from "../components/BackNavigation";

// ---------- .env -> .env.example generation (pure utility, outside component) ----------

function generateEnvExample(envText: string): string {
    const lines = envText.split("\n");

    const outputLines = lines.map((line) => {
        const trimmed = line.trim();

        // preserve blank lines and comments as-is
        if (trimmed === "" || trimmed.startsWith("#")) {
            return line;
        }

        const eqIndex = line.indexOf("=");
        if (eqIndex === -1) {
            // not a KEY=VALUE line — leave untouched
            return line;
        }

        const key = line.slice(0, eqIndex);
        return `${key}=YOUR_${key}`;
    });

    return outputLines.join("\n");
}

// ---------- Component ----------

const SAMPLE_ENV = `# Database
DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/mydb
DB_NAME=cobalt_studio

# Auth
NEXTAUTH_SECRET=super-secret-value-here
NEXTAUTH_URL=http://localhost:3000

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD4RgHmK9xxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=cobalt-studio-prod

# Misc
NODE_ENV=development
PORT=3000`;

export default function EnvExampleGenerator() {
    const [input, setInput] = useState(SAMPLE_ENV);
    const [copied, setCopied] = useState(false);

    const output = useMemo(() => generateEnvExample(input), [input]);

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const handleDownload = () => {
        if (!output) return;
        const blob = new Blob([output], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = ".env.example";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <NavBarSticky>
            <section className="w-full py-16 md:py-24">
                <div className="mx-auto max-w-5xl px-6">
                    {/* back navigation */}
                    <BackNavigation />

                    {/* header */}
                    <div className="mb-10 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                            <IconFileCode
                                className="h-7 w-7 text-primary"
                                stroke={1.8}
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                            .env.example Generator
                        </h1>
                        <p className="font-bengali mx-auto mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
                            নিজের .env পেস্ট করুন — সব secret value-এর জায়গায়
                            YOUR_KEY_NAME বসিয়ে একটা shareable .env.example
                            বানিয়ে দেবে।
                        </p>
                        <p className="font-bengali mx-auto mt-2 max-w-md text-xs text-muted-foreground/70">
                            সবকিছু browser-এর ভিতরেই হয়, কোনো data কোথাও পাঠানো
                            হয় না।
                        </p>
                    </div>

                    {/* editor grid */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* input */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="flex flex-col rounded-2xl border border-border/60 bg-card p-4 shadow-sm sm:p-6"
                        >
                            <label
                                htmlFor="env-input"
                                className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                            >
                                .env
                            </label>
                            <textarea
                                id="env-input"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                spellCheck={false}
                                placeholder="KEY=value"
                                className="h-96 w-full resize-none rounded-xl border border-border/60 bg-background p-4 font-mono text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
                            />
                        </motion.div>

                        {/* output */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                ease: "easeOut",
                                delay: 0.08,
                            }}
                            className="flex flex-col rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-6"
                        >
                            <div className="mb-2 flex items-center justify-between gap-2">
                                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    .env.example
                                </span>
                                <div className="flex gap-2">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={handleCopy}
                                        disabled={!output}
                                        className="gap-1.5 rounded-lg"
                                    >
                                        {copied ? (
                                            <>
                                                <IconCheck
                                                    className="h-4 w-4 text-emerald-500"
                                                    stroke={2.2}
                                                />
                                                Copied
                                            </>
                                        ) : (
                                            <>
                                                <IconCopy
                                                    className="h-4 w-4"
                                                    stroke={2}
                                                />
                                                Copy
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={handleDownload}
                                        disabled={!output}
                                        className="gap-1.5 rounded-lg"
                                    >
                                        <IconDownload
                                            className="h-4 w-4"
                                            stroke={2}
                                        />
                                        Download
                                    </Button>
                                </div>
                            </div>
                            <pre className="h-96 w-full overflow-auto rounded-xl border border-border/40 bg-background p-4 font-mono text-sm text-foreground">
                                <code>{output}</code>
                            </pre>
                        </motion.div>
                    </div>
                </div>
            </section>
        </NavBarSticky>
    );
}
