"use client";

import NavBarWithPageHeader from "@/components/global/NavBarWithPageHeader";
import {
    IconBraces,
    IconCode,
    IconDatabase,
    IconKey,
    IconLanguage,
    IconRegex,
} from "@tabler/icons-react";
import { useState } from "react";
import ToolCard, { Tool } from "./components/ToolCard";
import ToolSearchBar from "./components/ToolSearchBar";

const TOOLS: Tool[] = [
    {
        slug: "objectid-decoder",
        icon: IconDatabase,
        title: "MongoDB ObjectId Decoder",
        description: "ObjectId থেকে timestamp আর creation date বের করুন।",
    },
    {
        slug: "json-to-ts",
        icon: IconBraces,
        title: "TypeScript Type Generator",
        description: "JSON পেস্ট করুন, নিখুঁত TypeScript interface পান।",
    },
    {
        slug: "jwt-decoder",
        icon: IconKey,
        title: "JWT Decoder",
        description: "JWT token-এর header আর payload ডিকোড করুন।",
    },
    {
        slug: "number-code-snippets",
        icon: IconLanguage,
        title: "বাংলা সংখ্যা কনভার্টার",
        description: "ইংরেজি সংখ্যাকে এক ক্লিকে বাংলায় রূপান্তর করুন।",
    },
    {
        slug: "regex-tester",
        icon: IconRegex,
        title: "Regex Tester",
        description: "লাইভ ম্যাচ হাইলাইট সহ regex পরীক্ষা করুন।",
    },
    {
        slug: "env-example-generator",
        icon: IconCode,
        title: ".env.example Generator",
        description: "আপনার .env ফাইল দেখে .env.example তৈরি করুন।",
    },
];

export default function ToolsPage() {
    const [query, setQuery] = useState("");

    const filteredTools = TOOLS.filter(
        (tool) =>
            tool.title.toLowerCase().includes(query.toLowerCase()) ||
            tool.description.toLowerCase().includes(query.toLowerCase()),
    );

    return (
        <NavBarWithPageHeader
            sectionTag="DEV TOOLS"
            mainHeading="দরকারি টুলস,"
            subHeading="এক জায়গায়"
        >
            <section className="relative w-full py-16 md:py-24 bg-background min-h-screen text-foreground">
                {/* Ambient glow blobs */}
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="mx-auto max-w-6xl px-6 relative z-10">
                    {/* search */}
                    <ToolSearchBar query={query} onQueryChange={setQuery} />

                    {/* grid */}
                    {filteredTools.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredTools.map((tool, i) => (
                                <ToolCard
                                    key={tool.slug}
                                    tool={tool}
                                    index={i}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-sm text-muted-foreground">
                            NOT AVAILABLE
                        </p>
                    )}
                </div>
            </section>
        </NavBarWithPageHeader>
    );
}
