"use client";

import NavBarSticky from "@/components/global/NavBarSticky";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    IconAlertCircle,
    IconCheck,
    IconCopy,
    IconDatabase,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { useState } from "react";
import BackNavigation from "../components/BackNavigation";

type DecodedObjectId = {
    timestampHex: string;
    machinePidHex: string;
    counterHex: string;
    timestamp: number;
    date: Date;
};

function decodeObjectId(id: string): DecodedObjectId | null {
    const clean = id.trim();
    if (!/^[0-9a-fA-F]{24}$/.test(clean)) return null;

    const timestampHex = clean.substring(0, 8);
    const machinePidHex = clean.substring(8, 18);
    const counterHex = clean.substring(18, 24);

    const timestamp = parseInt(timestampHex, 16);
    const date = new Date(timestamp * 1000);

    return { timestampHex, machinePidHex, counterHex, timestamp, date };
}

type SegmentDef = { key: string; label: string; chars: number; color: string };
type CharSegment = { key: string; label: string; chars: string; color: string };

const SEGMENTS: SegmentDef[] = [
    {
        key: "timestamp",
        label: "Timestamp",
        chars: 8,
        color: "bg-primary/15 text-primary",
    },
    {
        key: "machinePid",
        label: "Machine + Process ID",
        chars: 10,
        color: "bg-violet-500/15 text-violet-500",
    },
    {
        key: "counter",
        label: "Counter",
        chars: 6,
        color: "bg-emerald-500/15 text-emerald-500",
    },
];

const ObjectIdDecoder = () => {
    const [input, setInput] = useState("");
    const [copiedIso, setCopiedIso] = useState(false);
    const [copiedMongo, setCopiedMongo] = useState(false);

    const trimmed = input.trim();
    const isValid = /^[0-9a-fA-F]{24}$/.test(trimmed);
    const decoded = decodeObjectId(input);

    const handleCopyMongo = () => {
        if (!decoded) return;
        navigator.clipboard.writeText(
            `ISODate("${decoded.date.toISOString()}")`,
        );
        setCopiedMongo(true);
        setTimeout(() => setCopiedMongo(false), 1500);
    };

    const handleCopyIso = () => {
        if (!decoded) return;
        navigator.clipboard.writeText(decoded.date.toISOString());
        setCopiedIso(true);
        setTimeout(() => setCopiedIso(false), 1500);
    };

    // build per-character highlight map (immutable accumulator for React Compiler)
    const { segments: charSegments } = SEGMENTS.reduce<{
        segments: CharSegment[];
        offset: number;
    }>(
        (acc, seg) => ({
            segments: [
                ...acc.segments,
                {
                    key: seg.key,
                    label: seg.label,
                    color: seg.color,
                    chars: trimmed.slice(acc.offset, acc.offset + seg.chars),
                },
            ],
            offset: acc.offset + seg.chars,
        }),
        { segments: [], offset: 0 },
    );

    return (
        <NavBarSticky>
            <section className="w-full pb-16 pt-24 md:py-24">
                <div className="mx-auto max-w-2xl px-6">
                    {/* back navigation */}
                    <BackNavigation />
                    {/* header */}
                    <div className="mb-10 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                            <IconDatabase
                                className="h-7 w-7 text-primary"
                                stroke={1.8}
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                            MongoDB ObjectId Decoder
                        </h1>
                        <p className="font-bengali mx-auto mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
                            ObjectId পেস্ট করুন, এর ভিতরের timestamp আর তৈরির
                            তারিখ সাথে সাথে দেখুন।
                        </p>
                    </div>

                    {/* input card */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8"
                    >
                        <label
                            htmlFor="objectid-input"
                            className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                        >
                            ObjectId
                        </label>
                        <Input
                            id="objectid-input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="507f1f77bcf86cd799439011"
                            spellCheck={false}
                            className={`h-12 font-mono text-sm ${
                                trimmed.length > 0 && !isValid
                                    ? "border-destructive focus-visible:ring-destructive/40"
                                    : ""
                            }`}
                        />

                        {/* char-segment breakdown */}
                        {isValid && (
                            <div className="mt-4 flex flex-wrap gap-0.5 rounded-lg border border-border/50 bg-muted/40 p-3 font-mono text-sm">
                                {charSegments.map((seg) =>
                                    seg.chars.split("").map((ch, i) => (
                                        <span
                                            key={`${seg.key}-${i}`}
                                            className={`rounded px-0.5 ${seg.color}`}
                                        >
                                            {ch}
                                        </span>
                                    )),
                                )}
                            </div>
                        )}

                        {trimmed.length > 0 && !isValid && (
                            <div className="mt-3 flex items-center gap-2 text-sm text-destructive">
                                <IconAlertCircle
                                    className="h-4 w-4 shrink-0"
                                    stroke={2}
                                />
                                <span className="font-bengali">
                                    Invalid ObjectId — must be 24 hex chars
                                    (0-9, a-f).
                                </span>
                            </div>
                        )}

                        {/* legend */}
                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                            {SEGMENTS.map((seg) => (
                                <div
                                    key={seg.key}
                                    className="flex items-center gap-1.5"
                                >
                                    <span
                                        className={`h-2.5 w-2.5 rounded-full ${seg.color}`}
                                    />
                                    <span className="text-xs text-muted-foreground">
                                        {seg.label} ({seg.chars} chars)
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* result card */}
                    {decoded && (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                ease: "easeOut",
                                delay: 0.1,
                            }}
                            className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8"
                        >
                            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                        Created At
                                    </p>
                                    <p className="mt-1 text-xl font-bold text-foreground sm:text-2xl">
                                        {decoded.date.toUTCString()}
                                    </p>
                                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                                        Unix timestamp: {decoded.timestamp}
                                    </p>
                                </div>

                                <div className="flex shrink-0 flex-row md:flex-col gap-2">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={handleCopyIso}
                                        className="gap-1.5 rounded-lg"
                                    >
                                        {copiedIso ? (
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
                                                Copy ISO
                                            </>
                                        )}
                                    </Button>

                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={handleCopyMongo}
                                        className="gap-1.5 rounded-lg"
                                    >
                                        {copiedMongo ? (
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
                                                Copy ISODate()
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>
        </NavBarSticky>
    );
};

export default ObjectIdDecoder;
