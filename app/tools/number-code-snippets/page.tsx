"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { IconCode, IconCopy, IconCheck } from "@tabler/icons-react";
import NavBarSticky from "@/components/global/NavBarSticky";
import BackNavigation from "../components/BackNavigation";

type Snippet = {
    id: string;
    title: string;
    description: string;
    code: string;
};

const SNIPPETS: Snippet[] = [
    {
        id: "en-to-bn",
        title: "ইংরেজি → বাংলা সংখ্যা",
        description:
            "regex দিয়ে যেকোনো ইংরেজি digit (0-9) কে বাংলা digit-এ বদলায়।",
        code: `const EN_TO_BN: Record<string, string> = {
  "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
  "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯",
};

function toBengaliDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => EN_TO_BN[d]);
}

toBengaliDigits(2026); // "২০২৬"`,
    },
    {
        id: "bn-to-en",
        title: "বাংলা → ইংরেজি সংখ্যা",
        description: "regex দিয়ে বাংলা digit-কে আবার ইংরেজি digit-এ ফেরত আনে।",
        code: `const BN_TO_EN: Record<string, string> = {
  "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4",
  "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9",
};

function toEnglishDigits(input: string): string {
  return input.replace(/[০-৯]/g, (d) => BN_TO_EN[d]);
}

toEnglishDigits("২০২৬"); // "2026"`,
    },
    {
        id: "intl-locale",
        title: "Intl.NumberFormat দিয়ে (locale-based)",
        description:
            "নিজে map না বানিয়ে browser-এর built-in locale formatter ব্যবহার করে যেকোনো ভাষায় কনভার্ট করা।",
        code: `function formatInLocale(num: number, locale: string): string {
  return new Intl.NumberFormat(locale, { useGrouping: false }).format(num);
}

formatInLocale(2026, "bn-BD"); // "২০২৬"
formatInLocale(2026, "ar-EG"); // "٢٠٢٦" (আরবি-ইন্ডিক digit)
formatInLocale(2026, "en-US"); // "2026"`,
    },
    {
        id: "detect-and-normalize",
        title: "Mixed String Normalize করা",
        description:
            "কোনো string-এ ইংরেজি আর বাংলা digit মিশানো থাকলে, সব একটা নির্দিষ্ট script-এ normalize করে।",
        code: `function normalizeDigits(input: string, target: "bn" | "en" = "en"): string {
  const bnToEn = (s: string) => s.replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d).toString());
  const enToBn = (s: string) => s.replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[+d]);

  return target === "en" ? bnToEn(input) : enToBn(input);
}

normalizeDigits("মূল্য ৳২০০, ছাড় 50৳", "en"); // "মূল্য ৳200, ছাড় 50৳"`,
    },
];

const CodeSnippets = () => {
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = (id: string, code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 1500);
    };

    return (
        <NavBarSticky>
            <section className="w-full pb-16 pt-24 md:py-24">
                <div className="mx-auto max-w-7xl px-6">
                    {/* back navigation */}
                    <BackNavigation />

                    {/* header */}
                    <div className="mb-10 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                            <IconCode
                                className="h-7 w-7 text-primary"
                                stroke={1.8}
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                            Number Translation Snippets
                        </h1>
                        <p className="font-bengali mx-auto mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
                            ইংরেজি-বাংলা সংখ্যা কনভার্ট করার regex-based রেডি
                            snippet — এক ক্লিকে কপি করুন।
                        </p>
                    </div>

                    {/* snippet cards */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {SNIPPETS.map((snippet, i) => (
                            <motion.div
                                key={snippet.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.4,
                                    ease: "easeOut",
                                    delay: i * 0.05,
                                }}
                                className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm sm:p-6"
                            >
                                <div className="mb-1 flex items-center justify-between gap-2">
                                    <h3 className="font-bengali text-base font-bold text-foreground sm:text-lg">
                                        {snippet.title}
                                    </h3>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() =>
                                            handleCopy(snippet.id, snippet.code)
                                        }
                                        className="shrink-0 gap-1.5 rounded-lg"
                                    >
                                        {copiedId === snippet.id ? (
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
                                </div>
                                <p className="font-bengali mb-3 text-sm text-muted-foreground">
                                    {snippet.description}
                                </p>
                                <pre className="overflow-auto rounded-xl border border-border/40 bg-background p-4 font-mono text-xs text-foreground sm:text-sm">
                                    <code>{snippet.code}</code>
                                </pre>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </NavBarSticky>
    );
};

export default CodeSnippets;
