"use client";

import GradientTopBorder from "@/components/global/GradientTopBorder";
import NavBarWithPageHeader from "@/components/global/NavBarWithPageHeader";
import { H2, P, Span } from "@/components/global/Texts";
import {
    IconCalendarTime,
    IconCashBanknote,
    IconCheck,
    IconClock,
    IconHelpCircle,
    IconMail,
    IconMapPin,
    IconReceiptRefund,
    IconShieldCheck,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const RefundPage = () => {
    const t = useTranslations("Refund");

    const ELIGIBILITY_ITEMS = [
        t("sections.eligibility.items.0"),
        t("sections.eligibility.items.1"),
        t("sections.eligibility.items.2"),
    ];

    const PROCESS_ITEMS = [
        t("sections.process.items.0"),
        t("sections.process.items.1"),
        t("sections.process.items.2"),
    ];

    const PAYOUT_ITEMS = [
        t("sections.payout.items.0"),
        t("sections.payout.items.1"),
        t("sections.payout.items.2"),
    ];

    return (
        <NavBarWithPageHeader
            sectionTag={t("sectionTag")}
            mainHeading={t("mainHeading")}
            subHeading={t("subHeading")}
        >
            <main className="relative w-full bg-background text-foreground overflow-hidden py-16 md:py-24">
                {/* Background Ambient Glows */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-150 h-75 bg-primary/10 dark:bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute top-[40%] right-10 w-112.5 h-112.5 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

                <div className="container mx-auto px-6 md:px-8 max-w-4xl relative z-10 space-y-10">
                    {/* Header Banner & Guarantee Callout */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative rounded-3xl border border-primary/40 bg-linear-to-b from-primary/10 via-card to-card backdrop-blur-xl p-8 md:p-12 shadow-2xl overflow-hidden"
                    >
                        <GradientTopBorder />
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                                <IconShieldCheck size={16} />
                                <span>{t("badge")}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border/40">
                                <IconCalendarTime size={15} />
                                <span>{t("lastUpdated")}</span>
                            </div>
                        </div>

                        <H2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">
                            {t("guaranteeTitle")}
                        </H2>

                        <P className="text-base md:text-lg text-foreground/90 leading-relaxed mb-6">
                            {t("guaranteeDescription")}
                        </P>

                        <P className="text-sm text-muted-foreground border-t border-border/60 pt-4">
                            {t("intro")}
                        </P>
                    </motion.div>

                    {/* Section 1: Eligibility & Guarantee Period */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md p-6 md:p-8 shadow-md"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <IconClock size={22} />
                            </div>
                            <H2 className="text-xl md:text-2xl font-bold text-foreground">
                                {t("sections.eligibility.title")}
                            </H2>
                        </div>
                        <P className="text-sm md:text-base text-muted-foreground mb-4">
                            {t("sections.eligibility.description")}
                        </P>
                        <ul className="space-y-3">
                            {ELIGIBILITY_ITEMS.map((item, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-start gap-3 text-sm md:text-base text-foreground/90"
                                >
                                    <IconCheck
                                        size={18}
                                        className="text-primary shrink-0 mt-1"
                                    />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.section>

                    {/* Section 2: How to Request a Refund */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md p-6 md:p-8 shadow-md"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <IconReceiptRefund size={22} />
                            </div>
                            <H2 className="text-xl md:text-2xl font-bold text-foreground">
                                {t("sections.process.title")}
                            </H2>
                        </div>
                        <P className="text-sm md:text-base text-muted-foreground mb-4">
                            {t("sections.process.description")}
                        </P>
                        <ul className="space-y-3">
                            {PROCESS_ITEMS.map((item, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-start gap-3 text-sm md:text-base text-foreground/90"
                                >
                                    <IconCheck
                                        size={18}
                                        className="text-primary shrink-0 mt-1"
                                    />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.section>

                    {/* Section 3: Payout Method & Timeline */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md p-6 md:p-8 shadow-md"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <IconCashBanknote size={22} />
                            </div>
                            <H2 className="text-xl md:text-2xl font-bold text-foreground">
                                {t("sections.payout.title")}
                            </H2>
                        </div>
                        <P className="text-sm md:text-base text-muted-foreground mb-4">
                            {t("sections.payout.description")}
                        </P>
                        <ul className="space-y-3">
                            {PAYOUT_ITEMS.map((item, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-start gap-3 text-sm md:text-base text-foreground/90"
                                >
                                    <IconCheck
                                        size={18}
                                        className="text-primary shrink-0 mt-1"
                                    />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.section>

                    {/* Section 4: Course Access Revocation */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md p-6 md:p-8 shadow-md"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <IconHelpCircle size={22} />
                            </div>
                            <H2 className="text-xl md:text-2xl font-bold text-foreground">
                                {t("sections.access.title")}
                            </H2>
                        </div>
                        <P className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {t("sections.access.description")}
                        </P>
                    </motion.section>

                    {/* Section 5: Refund Support & Enquiries */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative rounded-3xl border border-primary/30 bg-linear-to-r from-primary/10 via-card to-primary/10 p-8 md:p-10 shadow-xl overflow-hidden"
                    >
                        <GradientTopBorder />
                        <H2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                            {t("sections.contact.title")}
                        </H2>
                        <P className="text-sm md:text-base text-muted-foreground mb-6">
                            {t("sections.contact.description")}
                        </P>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <a
                                href={`mailto:${t("sections.contact.email")}`}
                                className="flex items-center gap-3 p-4 rounded-xl bg-background/80 border border-border/60 hover:border-primary/50 text-foreground transition-colors group"
                            >
                                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                                    <IconMail size={20} />
                                </div>
                                <div className="overflow-hidden">
                                    <Span className="text-xs text-muted-foreground block">
                                        Email Support
                                    </Span>
                                    <Span className="text-sm font-semibold truncate block">
                                        {t("sections.contact.email")}
                                    </Span>
                                </div>
                            </a>

                            <div className="flex items-center gap-3 p-4 rounded-xl bg-background/80 border border-border/60 hover:border-primary/50 text-foreground transition-colors group">
                                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                                    <IconMapPin size={20} />
                                </div>
                                <div>
                                    <Span className="text-xs text-muted-foreground block">
                                        Studio Address
                                    </Span>
                                    <Span className="text-sm font-semibold block">
                                        {t("sections.contact.address")}
                                    </Span>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                </div>
            </main>
        </NavBarWithPageHeader>
    );
};

export default RefundPage;

