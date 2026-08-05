"use client";

import {
    Code2,
    Compass,
    Layers,
    Mic,
    Users,
    type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import CourseSectionHeader from "./CourseSectionHeader";

type BonusItem = {
    icon: LucideIcon;
    title: string;
    description: string;
    price: string;
    iconColor?: string;
    iconBg?: string;
};

const Bonus = () => {
    const t = useTranslations("Batch1");

    const BONUSES: BonusItem[] = [
        {
            icon: Code2,
            title: t("bonuses.0.title"),
            description: t("bonuses.0.description"),
            price: t("bonuses.0.price"),
            iconColor: "text-purple-500",
            iconBg: "bg-purple-500/10",
        },
        {
            icon: Compass,
            title: t("bonuses.1.title"),
            description: t("bonuses.1.description"),
            price: t("bonuses.1.price"),
            iconColor: "text-blue-500",
            iconBg: "bg-blue-500/10",
        },
        {
            icon: Mic,
            title: t("bonuses.2.title"),
            description: t("bonuses.2.description"),
            price: t("bonuses.2.price"),
            iconColor: "text-rose-500",
            iconBg: "bg-rose-500/10",
        },
        {
            icon: Users,
            title: t("bonuses.3.title"),
            description: t("bonuses.3.description"),
            price: t("bonuses.3.price"),
            iconColor: "text-amber-500",
            iconBg: "bg-amber-500/10",
        },
        {
            icon: Layers,
            title: t("bonuses.4.title"),
            description: t("bonuses.4.description"),
            price: t("bonuses.4.price"),
            iconColor: "text-emerald-500",
            iconBg: "bg-emerald-500/10",
        },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:p-24 p-5"
        >
            <CourseSectionHeader
                singleLineHeader
                badgeText={t("bonusBadgeText")}
                sectionTitle={t("title3")}
                sectionSubtitle={t("titlePrimary3")}
                sectionDescription={t("description3")}
            />
            <div className="w-full py-7 md:py-16">
                <div className="mx-auto max-w-5xl md:px-6">
                    <div className="flex flex-col gap-4">
                        {BONUSES.map(
                            (
                                {
                                    icon: Icon,
                                    title,
                                    description,
                                    price,
                                    iconColor,
                                    iconBg,
                                },
                                i,
                            ) => (
                                <motion.div
                                    key={title}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{
                                        duration: 0.45,
                                        ease: "easeOut",
                                        delay: i * 0.08,
                                    }}
                                    className="flex items-center justify-between gap-4 rounded-2xl border border-border/50 bg-card px-6 py-5 shadow-sm sm:px-8 sm:py-6 group"
                                >
                                    <div className="flex items-center gap-4 sm:gap-5">
                                        <div
                                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconBg || "bg-muted"}`}
                                        >
                                            <Icon
                                                className={`h-5 w-5 ${iconColor || "text-primary"}`}
                                                strokeWidth={2}
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bengali text-base font-bold text-foreground sm:text-lg">
                                                {title}
                                            </h4>
                                            <p className="font-bengali mt-0.5 text-xs text-muted-foreground sm:text-sm">
                                                {description}
                                            </p>
                                        </div>
                                    </div>

                                    <span className="font-bengali shrink-0 text-lg font-extrabold text-primary sm:text-xl group-hover:underline">
                                        ৳{price}
                                    </span>
                                </motion.div>
                            ),
                        )}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{
                            duration: 0.5,
                            ease: "easeOut",
                            delay: 0.4,
                        }}
                        className="mt-6 flex items-center justify-between border-t border-border/60 px-6 pt-6 sm:px-8"
                    >
                        <span className="font-bengali text-sm font-semibold text-muted-foreground sm:text-base">
                            {t("totalValueText")}
                        </span>
                        <span className="font-bengali text-2xl font-extrabold text-primary sm:text-3xl underline">
                            ৳{t("totalValue")}
                        </span>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default Bonus;
