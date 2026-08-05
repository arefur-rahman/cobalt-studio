"use client";

import { H3, P, Span } from "@/components/global/Texts";
import {
    IconBrain,
    IconPlayerPlay,
    IconRocket,
    IconUserStar,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const WhyUsGrid = () => {
    const t = useTranslations("Batch1");
    const FEATURES = [
        {
            number: "01",
            icon: IconUserStar,
            color: "text-amber-500",
            title: t("features.01.title"),
            description: t("features.01.description"),
        },
        {
            number: "02",
            icon: IconPlayerPlay,
            color: "text-rose-500",
            title: t("features.02.title"),
            description: t("features.02.description"),
        },
        {
            number: "03",
            icon: IconRocket,
            color: "text-emerald-500",
            title: t("features.03.title"),
            description: t("features.03.description"),
        },
        {
            number: "04",
            icon: IconBrain,
            color: "text-violet-500",
            title: t("features.04.title"),
            description: t("features.04.description"),
        },
    ];

    return (
        <div className="w-full pt-16 md:pt-18">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-3 md:px-6 sm:grid-cols-2">
                {FEATURES.map(
                    ({ number, icon: Icon, color, title, description }, i) => (
                        <motion.div
                            key={number}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{
                                duration: 0.5,
                                ease: "easeOut",
                                delay: i * 0.1,
                            }}
                            className="relative overflow-hidden rounded-2xl border border-border/40 bg-card p-8 dark:border-border/50 dark:bg-card"
                        >
                            {/* faint background number */}
                            <Span
                                aria-hidden
                                className="pointer-events-none absolute -right-2 bottom-2 select-none text-8xl font-black leading-none text-foreground/5"
                            >
                                {number}
                            </Span>

                            <div className="relative z-10">
                                <Icon
                                    className={`h-7 w-7 ${color}`}
                                    stroke={1.8}
                                />

                                <H3 className="mt-6 text-xl font-bold text-foreground md:text-2xl">
                                    {title}
                                </H3>

                                <P className="font-bengali mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                                    {description}
                                </P>
                            </div>
                        </motion.div>
                    ),
                )}
            </div>
        </div>
    );
};

export default WhyUsGrid;
