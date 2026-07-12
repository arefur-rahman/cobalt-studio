"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { IconMoodPuzzled } from "@tabler/icons-react";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
    return (
        <section className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden px-6">
            {/* ambient glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center text-center"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10"
                >
                    <IconMoodPuzzled
                        className="h-10 w-10 text-primary"
                        stroke={1.6}
                    />
                </motion.div>

                <h1 className="text-7xl font-extrabold tracking-tight text-foreground sm:text-8xl">
                    404
                </h1>

                <p className="mt-3 text-lg font-semibold text-foreground md:text-xl">
                    Page not found
                </p>

                <p className="mt-2 max-w-md text-sm text-muted-foreground md:text-base">
                    The page you&apos;re looking for might have been moved,
                    renamed, or never existed in the first place.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90"
                    >
                        <Home className="h-4 w-4" strokeWidth={2.2} />
                        Back to home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-transparent px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
                    >
                        <ArrowLeft className="h-4 w-4" strokeWidth={2.2} />
                        Go back
                    </button>
                </div>
            </motion.div>
        </section>
    );
}
