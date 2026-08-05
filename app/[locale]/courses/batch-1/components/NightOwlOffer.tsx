"use client";

import { Button } from "@/components/ui/button";
import enToBnNumber from "@/lib/numberEn2Bn";
import { CircleCheck } from "lucide-react";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import CourseSectionHeader from "./CourseSectionHeader";

type Feature = {
    label: string;
    price?: number;
};

function FeatureRow({ label, price, locale }: Feature & { locale: string }) {
    const formattedPrice =
        price !== undefined
            ? typeof price === "number"
                ? price.toLocaleString()
                : price
            : undefined;
    const displayPrice =
        formattedPrice !== undefined
            ? locale === "bn"
                ? enToBnNumber(formattedPrice)
                : formattedPrice
            : undefined;

    return (
        <li className="flex items-start gap-3">
            <CircleCheck
                className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500"
                strokeWidth={2}
            />
            <span
                className={`${
                    locale === "bn" ? "font-bengali" : ""
                } text-sm leading-relaxed text-foreground/90 md:text-base`}
            >
                {label}
                {displayPrice !== undefined && (
                    <span className="text-muted-foreground">
                        {" "}
                        ({displayPrice})
                    </span>
                )}
            </span>
        </li>
    );
}

const NightOwlOffer = () => {
    const locale = useLocale();
    const t = useTranslations("Batch1.nightOwlOffer");

    const formatNumber = (num: number | string) => {
        const formatted = typeof num === "number" ? num.toLocaleString() : num;
        return locale === "bn" ? enToBnNumber(formatted) : formatted;
    };

    const leftFeatures = (t.raw("leftFeatures") as Feature[]) || [];
    const rightFeatures = (t.raw("rightFeatures") as Feature[]) || [];

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-muted md:px-24 px-3 py-7 md:py-28 space-y-6 md:space-y-16"
        >
            <CourseSectionHeader
                badgeText={t("badgeText")}
                sectionTitle={t("sectionTitle")}
                sectionSubtitle={t("sectionSubtitle")}
                sectionDescription={t("sectionDescription")}
            />
            <div className="w-full">
                <div className="mx-auto max-w-3xl px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="rounded-3xl border border-border/60 bg-card p-8 shadow-sm sm:p-10"
                    >
                        {/* header row */}
                        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
                            <div>
                                <span
                                    className={`${
                                        locale === "bn" ? "font-bengali" : ""
                                    } text-sm font-bold text-primary`}
                                >
                                    {t("discountBadge", {
                                        percent: formatNumber(50),
                                    })}
                                </span>
                                <h3 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                                    {t("courseTitle")}
                                </h3>
                            </div>

                            <div className="text-right">
                                <span
                                    className={`${
                                        locale === "bn" ? "font-bengali" : ""
                                    } block text-sm text-muted-foreground line-through`}
                                >
                                    ৳{formatNumber(15500)}
                                </span>
                                <span
                                    className={`${
                                        locale === "bn" ? "font-bengali" : ""
                                    } block text-4xl font-extrabold text-primary sm:text-5xl`}
                                >
                                    ৳{formatNumber(13570)}
                                </span>
                                <span
                                    className={`${
                                        locale === "bn" ? "font-bengali" : ""
                                    } mt-1 block text-xs font-semibold text-emerald-500 sm:text-sm`}
                                >
                                    {t("saveText", {
                                        amount: formatNumber(1930),
                                    })}
                                </span>
                            </div>
                        </div>

                        <hr className="my-6 border-border/60" />

                        {/* feature checklist */}
                        <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                            {leftFeatures.map((f) => (
                                <FeatureRow
                                    key={f.label}
                                    {...f}
                                    locale={locale}
                                />
                            ))}
                            {rightFeatures.map((f) => (
                                <FeatureRow
                                    key={f.label}
                                    {...f}
                                    locale={locale}
                                />
                            ))}
                        </div>

                        {/* CTA */}
                        <Button
                            asChild
                            size="lg"
                            className={`${
                                locale === "bn" ? "font-bengali" : ""
                            } mt-8 w-full rounded-2xl py-3.5 text-center text-base font-bold shadow-lg shadow-primary/25 transition-colors sm:text-lg h-auto`}
                        >
                            <motion.a
                                href="#enroll"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {t("enrollNowBtn", {
                                    price: formatNumber(13570),
                                })}
                            </motion.a>
                        </Button>
                    </motion.div>

                    {/* value-stack summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{
                            duration: 0.5,
                            delay: 0.15,
                            ease: "easeOut",
                        }}
                        className={`${
                            locale === "bn" ? "font-bengali" : ""
                        } mt-10 text-center text-sm text-muted-foreground sm:text-base`}
                    >
                        <p className="font-semibold text-foreground/70">
                            {t("summaryTitle")}
                        </p>
                        <p className="mt-2">
                            {t.rich("summaryDescription", {
                                courseValuePrice: formatNumber(15500),
                                bonusValuePrice: formatNumber(11500),
                                totalValuePrice: formatNumber(27000),
                                finalPriceAmount: formatNumber(13570),
                                courseValue: (chunks) => (
                                    <span className="text-muted-foreground/60 line-through">
                                        {chunks}
                                    </span>
                                ),
                                bonusValue: (chunks) => (
                                    <span className="text-muted-foreground/60 line-through">
                                        {chunks}
                                    </span>
                                ),
                                totalValue: (chunks) => (
                                    <span className="font-bold text-primary line-through">
                                        {chunks}
                                    </span>
                                ),
                                finalPrice: (chunks) => (
                                    <span className="font-extrabold text-foreground underline decoration-primary decoration-2 underline-offset-4">
                                        {chunks}
                                    </span>
                                ),
                            })}
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default NightOwlOffer;
