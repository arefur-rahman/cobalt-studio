"use client";

import { H1, P } from "@/components/global/Texts";
import TopNavBar from "@/components/global/TopNavBar";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { IconMoodPuzzled } from "@tabler/icons-react";
import { ArrowLeft, Home } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const NotFound = () => {
    const t = useTranslations("NotFound");

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
                        {t("404")}
                    </H1>

                    <P className="mt-3 text-lg font-semibold text-foreground md:text-xl">
                        {t("title")}
                    </P>

                    <P className="mt-2 max-w-md text-sm text-muted-foreground md:text-base">
                        {t("description")}
                    </P>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 hover:scale-95 transition-all duration-150 cursor-pointer"
                        >
                            <Home className="h-4 w-4" strokeWidth={2.2} />
                            {t("backToHome")}
                        </Link>

                        <Button
                            variant="outline"
                            onClick={() => window.history.back()}
                            className="rounded-full gap-2 px-8 py-5 text-sm hover:scale-105 transition-all duration-150 cursor-pointer"
                        >
                            <ArrowLeft className="h-4 w-4" strokeWidth={2.2} />
                            {t("goBack")}
                        </Button>
                    </div>
                </motion.div>
            </section>
            <footer className="border-t border-border/50 bg-accent/50">
                <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
                    <P className="text-xs text-muted-foreground/70">
                        {t("rights")}
                    </P>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/refund"
                            className="text-xs text-muted-foreground/70 hover:text-primary transition-colors"
                        >
                            {t("refundPolicy")}
                        </Link>
                        <span className="text-muted-foreground/40 text-xs">
                            |
                        </span>
                        <Link
                            href="/privacy"
                            className="text-xs text-muted-foreground/70 hover:text-primary transition-colors"
                        >
                            {t("privacy")}
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default NotFound;
