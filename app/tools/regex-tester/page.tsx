"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
    IconRegex,
    IconCopy,
    IconCheck,
    IconAlertCircle,
} from "@tabler/icons-react";
import NavBarSticky from "@/components/global/NavBarSticky";
import BackNavigation from "../components/BackNavigation";

// ---------- Regex matching (pure utility, outside component) ----------

type Segment = { text: string; isMatch: boolean };

type MatchInfo = {
    index: number;
    fullMatch: string;
    groups: string[];
    namedGroups: Record<string, string> | null;
};

type RegexResult = {
    segments: Segment[];
    matches: MatchInfo[];
    error: string | null;
};

function runRegex(
    pattern: string,
    flags: string,
    testString: string,
): RegexResult {
    if (pattern === "") {
        return {
            segments: [{ text: testString, isMatch: false }],
            matches: [],
            error: null,
        };
    }

    let regex: RegExp;
    try {
        // "g" is always applied internally so every match is found for
        // highlighting/listing, regardless of the flags the user picked
        const effectiveFlags = flags.includes("g") ? flags : flags + "g";
        regex = new RegExp(pattern, effectiveFlags);
    } catch (err) {
        return {
            segments: [{ text: testString, isMatch: false }],
            matches: [],
            error:
                err instanceof Error
                    ? err.message
                    : "Invalid regular expression",
        };
    }

    const rawMatches = Array.from(testString.matchAll(regex));

    const matches: MatchInfo[] = rawMatches.map((m) => ({
        index: m.index ?? 0,
        fullMatch: m[0],
        groups: m.slice(1).map((g) => g ?? ""),
        namedGroups: m.groups ? { ...m.groups } : null,
    }));

    // build highlighted segments by walking the string between match boundaries
    const segments = matches.reduce<{ segs: Segment[]; cursor: number }>(
        (acc, m) => {
            const before = testString.slice(acc.cursor, m.index);
            const matchText = testString.slice(
                m.index,
                m.index + m.fullMatch.length,
            );
            const segs = [
                ...acc.segs,
                ...(before ? [{ text: before, isMatch: false }] : []),
                { text: matchText, isMatch: true },
            ];
            return { segs, cursor: m.index + m.fullMatch.length };
        },
        { segs: [], cursor: 0 },
    );

    const tail = testString.slice(segments.cursor);
    const finalSegments = [
        ...segments.segs,
        ...(tail ? [{ text: tail, isMatch: false }] : []),
    ];

    return {
        segments:
            finalSegments.length > 0
                ? finalSegments
                : [{ text: testString, isMatch: false }],
        matches,
        error: null,
    };
}

// ---------- Component ----------

const FLAG_OPTIONS: Array<{ key: string; label: string }> = [
    { key: "i", label: "ignoreCase" },
    { key: "m", label: "multiline" },
    { key: "s", label: "dotAll" },
    { key: "u", label: "unicode" },
];

const QUICK_PATTERNS: Array<{ label: string; pattern: string }> = [
    { label: "Email", pattern: "[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}" },
    { label: "URL", pattern: "https?:\\/\\/[^\\s]+" },
    { label: "BD Phone", pattern: "01[3-9]\\d{8}" },
    { label: "Hex Color", pattern: "#[0-9a-fA-F]{3,6}" },
    {
        label: "Date (named group)",
        pattern: "(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})",
    },
];

const DEFAULT_TEST_STRING = `Contact us at hello@cobaltstudio.dev or call 01712345678.
Visit https://cobaltstudio.dev for more info. Published on 2026-07-16.`;

export default function RegexTester() {
    const [pattern, setPattern] = useState("[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}");
    const [activeFlags, setActiveFlags] = useState<string[]>(["i"]);
    const [testString, setTestString] = useState(DEFAULT_TEST_STRING);
    const [copied, setCopied] = useState(false);

    const flagsString = activeFlags.join("");
    const result = useMemo(
        () => runRegex(pattern, flagsString, testString),
        [pattern, flagsString, testString],
    );

    const toggleFlag = (key: string) => {
        setActiveFlags((prev) =>
            prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key],
        );
    };

    const handleCopyPattern = () => {
        navigator.clipboard.writeText(`/${pattern}/${flagsString}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <NavBarSticky>
            <section className="w-full py-16 md:py-24">
                <div className="mx-auto max-w-3xl px-6">
                    {/* back navigation */}
                    <BackNavigation />

                    {/* header */}
                    <div className="mb-10 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                            <IconRegex
                                className="h-7 w-7 text-primary"
                                stroke={1.8}
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                            Regex Tester
                        </h1>
                        <p className="font-bengali mx-auto mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
                            Pattern লিখুন, লাইভ match হাইলাইট আর group breakdown
                            দেখুন।
                        </p>
                    </div>

                    {/* quick patterns */}
                    <div className="mb-5 flex flex-wrap gap-2">
                        {QUICK_PATTERNS.map((qp) => (
                            <button
                                key={qp.label}
                                onClick={() => setPattern(qp.pattern)}
                                className="rounded-full bg-muted px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/70"
                            >
                                {qp.label}
                            </button>
                        ))}
                    </div>

                    {/* pattern input */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm sm:p-6"
                    >
                        <label
                            htmlFor="pattern-input"
                            className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                        >
                            Pattern
                        </label>
                        <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-background px-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30">
                            <span className="font-mono text-muted-foreground">
                                /
                            </span>
                            <input
                                id="pattern-input"
                                value={pattern}
                                onChange={(e) => setPattern(e.target.value)}
                                spellCheck={false}
                                placeholder="pattern"
                                className="h-11 flex-1 bg-transparent font-mono text-sm text-foreground outline-none"
                            />
                            <span className="font-mono text-muted-foreground">
                                /{flagsString}
                            </span>
                        </div>

                        {result.error && (
                            <div className="mt-3 flex items-center gap-2 text-sm text-destructive">
                                <IconAlertCircle
                                    className="h-4 w-4 shrink-0"
                                    stroke={2}
                                />
                                <span className="font-mono text-xs">
                                    {result.error}
                                </span>
                            </div>
                        )}

                        {/* flags */}
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            {FLAG_OPTIONS.map((f) => (
                                <button
                                    key={f.key}
                                    onClick={() => toggleFlag(f.key)}
                                    className={`rounded-full px-3 py-1 font-mono text-xs font-semibold transition-colors ${
                                        activeFlags.includes(f.key)
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted text-muted-foreground hover:bg-muted/70"
                                    }`}
                                    title={f.label}
                                >
                                    {f.key}
                                </button>
                            ))}
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={handleCopyPattern}
                                className="ml-auto gap-1.5 rounded-lg"
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
                        </div>
                    </motion.div>

                    {/* test string + highlighted preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            ease: "easeOut",
                            delay: 0.06,
                        }}
                        className="mt-6 rounded-2xl border border-border/60 bg-card p-4 shadow-sm sm:p-6"
                    >
                        <label
                            htmlFor="test-string"
                            className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                        >
                            Test String
                        </label>
                        <textarea
                            id="test-string"
                            value={testString}
                            onChange={(e) => setTestString(e.target.value)}
                            spellCheck={false}
                            className="h-28 w-full resize-none rounded-xl border border-border/60 bg-background p-4 font-mono text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
                        />

                        <p className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Preview ({result.matches.length} match
                            {result.matches.length === 1 ? "" : "es"})
                        </p>
                        <div className="whitespace-pre-wrap wrap-break-word rounded-xl border border-border/40 bg-background p-4 font-mono text-sm leading-relaxed text-foreground">
                            {result.segments.map((seg, i) =>
                                seg.isMatch ? (
                                    <mark
                                        key={i}
                                        className="rounded bg-primary/25 px-0.5 text-foreground"
                                    >
                                        {seg.text}
                                    </mark>
                                ) : (
                                    <span key={i}>{seg.text}</span>
                                ),
                            )}
                        </div>
                    </motion.div>

                    {/* match list */}
                    {result.matches.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                ease: "easeOut",
                                delay: 0.1,
                            }}
                            className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-6"
                        >
                            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Matches
                            </p>
                            <div className="flex flex-col gap-2">
                                {result.matches.map((m, i) => (
                                    <div
                                        key={i}
                                        className="rounded-lg border border-border/40 bg-background px-3 py-2 font-mono text-xs sm:text-sm"
                                    >
                                        <span className="text-muted-foreground">
                                            [{i}]{" "}
                                        </span>
                                        <span className="font-semibold text-primary">
                                            {m.fullMatch}
                                        </span>
                                        {m.groups.length > 0 && (
                                            <span className="text-muted-foreground">
                                                {"  →  "}
                                                {m.groups.map((g, gi) => (
                                                    <span key={gi}>
                                                        group {gi + 1}:{" "}
                                                        <span className="text-foreground">
                                                            {g || "—"}
                                                        </span>
                                                        {gi <
                                                        m.groups.length - 1
                                                            ? ", "
                                                            : ""}
                                                    </span>
                                                ))}
                                            </span>
                                        )}
                                        {m.namedGroups && (
                                            <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 border-t border-border/30 pt-1.5">
                                                {Object.entries(
                                                    m.namedGroups,
                                                ).map(([name, value]) => (
                                                    <span
                                                        key={name}
                                                        className="text-muted-foreground"
                                                    >
                                                        <span className="text-violet-500">
                                                            {name}
                                                        </span>
                                                        :{" "}
                                                        <span className="text-foreground">
                                                            {value || "—"}
                                                        </span>
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>
        </NavBarSticky>
    );
}
