"use client";

import TopNavBar from "@/components/global/Header";
import { H1, P } from "@/components/global/Texts";
import { Button } from "@/components/ui/button";
import { IconMoodPuzzled } from "@tabler/icons-react";
import { ArrowLeft, Home } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const NotFound = () => {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <TopNavBar />
            <section className="relative flex w-full flex-1 items-center justify-center overflow-hidden px-6 py-16">
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

                    <H1 className="text-7xl font-extrabold tracking-tight text-foreground sm:text-8xl">
                        404
                    </H1>

                    <P className="mt-3 text-lg font-semibold text-foreground md:text-xl">
                        Page not found
                    </P>

                    <P className="mt-2 max-w-md text-sm text-muted-foreground md:text-base">
                        The page you&apos;re looking for might have been moved,
                        renamed, or never existed in the first place.
                    </P>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90"
                        >
                            <Home className="h-4 w-4" strokeWidth={2.2} />
                            Back to home
                        </Link>

                        <Button
                            variant="outline"
                            onClick={() => window.history.back()}
                            className="rounded-full gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" strokeWidth={2.2} />
                            Go back
                        </Button>
                    </div>
                </motion.div>
            </section>
            <footer className="border-t border-border/50 bg-accent/50">
                <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
                    <P className="text-xs text-muted-foreground/70">
                        © 2026 Cobalt Studio | All rights reserved.
                    </P>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/refund"
                            className="text-xs text-muted-foreground/70 hover:text-primary transition-colors"
                        >
                            Refund Policy
                        </Link>
                        <span className="text-muted-foreground/40 text-xs">
                            |
                        </span>
                        <Link
                            href="/privacy"
                            className="text-xs text-muted-foreground/70 hover:text-primary transition-colors"
                        >
                            Privacy
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default NotFound;
