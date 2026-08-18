"use client";

import GradientTopBorder from "@/components/global/GradientTopBorder";
import NavBarWithPageHeader from "@/components/global/NavBarWithPageHeader";
import { H2, P, Span } from "@/components/global/Texts";
import {
    IconBook,
    IconCalendarTime,
    IconCheck,
    IconCreditCard,
    IconFileText,
    IconGavel,
    IconLicense,
    IconLockAccess,
    IconMail,
    IconMapPin,
    IconShield,
    IconUserShield,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const TermsPage = () => {
    const t = useTranslations("Terms");

    const ACCOUNT_ITEMS = [
        t("sections.account.items.0"),
        t("sections.account.items.1"),
        t("sections.account.items.2"),
    ];

    const ENROLLMENT_ITEMS = [
        t("sections.enrollment.items.0"),
        t("sections.enrollment.items.1"),
        t("sections.enrollment.items.2"),
    ];

    const IP_ITEMS = [
        t("sections.ip.items.0"),
        t("sections.ip.items.1"),
        t("sections.ip.items.2"),
    ];

    const CONDUCT_ITEMS = [
        t("sections.conduct.items.0"),
        t("sections.conduct.items.1"),
        t("sections.conduct.items.2"),
    ];

    const PAYMENT_ITEMS = [
        t("sections.payments.items.0"),
        t("sections.payments.items.1"),
        t("sections.payments.items.2"),
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
                <div className="absolute top-[40%] right-10 w-112.5 h-112.5 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

                <div className="container mx-auto px-6 md:px-8 max-w-4xl relative z-10 space-y-10">
                    {/* Header Banner & Intro */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative rounded-3xl border border-border/80 bg-linear-to-b from-card/90 to-card/40 backdrop-blur-xl p-8 md:p-12 shadow-xl overflow-hidden"
                    >
                        <GradientTopBorder />
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                                <IconFileText size={16} />
                                <span>{t("sectionTag")}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border/40">
                                <IconCalendarTime size={15} />
                                <span>{t("lastUpdated")}</span>
                            </div>
                        </div>

                        <P className="text-base md:text-lg text-foreground/90 leading-relaxed">
                            {t("intro")}
                        </P>
                    </motion.div>

                    {/* Section 1: Account Registration & Security */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md p-6 md:p-8 shadow-md"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <IconUserShield size={22} />
                            </div>
                            <H2 className="text-xl md:text-2xl font-bold text-foreground">
                                {t("sections.account.title")}
                            </H2>
                        </div>
                        <P className="text-sm md:text-base text-muted-foreground mb-4">
                            {t("sections.account.description")}
                        </P>
                        <ul className="space-y-3">
                            {ACCOUNT_ITEMS.map((item, idx) => (
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

                    {/* Section 2: Course Access & Bootcamp Enrollment */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md p-6 md:p-8 shadow-md"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <IconBook size={22} />
                            </div>
                            <H2 className="text-xl md:text-2xl font-bold text-foreground">
                                {t("sections.enrollment.title")}
                            </H2>
                        </div>
                        <P className="text-sm md:text-base text-muted-foreground mb-4">
                            {t("sections.enrollment.description")}
                        </P>
                        <ul className="space-y-3">
                            {ENROLLMENT_ITEMS.map((item, idx) => (
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

                    {/* Section 3: Intellectual Property & Code Sharing */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md p-6 md:p-8 shadow-md"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <IconLicense size={22} />
                            </div>
                            <H2 className="text-xl md:text-2xl font-bold text-foreground">
                                {t("sections.ip.title")}
                            </H2>
                        </div>
                        <P className="text-sm md:text-base text-muted-foreground mb-4">
                            {t("sections.ip.description")}
                        </P>
                        <ul className="space-y-3">
                            {IP_ITEMS.map((item, idx) => (
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

                    {/* Section 4: Community Conduct & Guidelines */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md p-6 md:p-8 shadow-md"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <IconLockAccess size={22} />
                            </div>
                            <H2 className="text-xl md:text-2xl font-bold text-foreground">
                                {t("sections.conduct.title")}
                            </H2>
                        </div>
                        <P className="text-sm md:text-base text-muted-foreground mb-4">
                            {t("sections.conduct.description")}
                        </P>
                        <ul className="space-y-3">
                            {CONDUCT_ITEMS.map((item, idx) => (
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

                    {/* Section 5: Payments, Pricing & Refunds */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md p-6 md:p-8 shadow-md"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <IconCreditCard size={22} />
                            </div>
                            <H2 className="text-xl md:text-2xl font-bold text-foreground">
                                {t("sections.payments.title")}
                            </H2>
                        </div>
                        <P className="text-sm md:text-base text-muted-foreground mb-4">
                            {t("sections.payments.description")}
                        </P>
                        <ul className="space-y-3">
                            {PAYMENT_ITEMS.map((item, idx) => (
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

                    {/* Section 6: Limitation of Liability */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md p-6 md:p-8 shadow-md"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <IconShield size={22} />
                            </div>
                            <H2 className="text-xl md:text-2xl font-bold text-foreground">
                                {t("sections.limitation.title")}
                            </H2>
                        </div>
                        <P className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {t("sections.limitation.description")}
                        </P>
                    </motion.section>

                    {/* Section 7: Modifications & Governing Law */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md p-6 md:p-8 shadow-md"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <IconGavel size={22} />
                            </div>
                            <H2 className="text-xl md:text-2xl font-bold text-foreground">
                                {t("sections.law.title")}
                            </H2>
                        </div>
                        <P className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {t("sections.law.description")}
                        </P>
                    </motion.section>

                    {/* Section 8: Support Card */}
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

export default TermsPage;
