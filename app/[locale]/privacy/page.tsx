"use client";

import GradientTopBorder from "@/components/global/GradientTopBorder";
import NavBarWithPageHeader from "@/components/global/NavBarWithPageHeader";
import { H2, P, Span } from "@/components/global/Texts";
import {
    IconCalendarTime,
    IconCheck,
    IconCookie,
    IconDatabase,
    IconLock,
    IconMail,
    IconMapPin,
    IconShare,
    IconShieldCheck,
    IconUserCheck,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const PrivacyPage = () => {
    const t = useTranslations("Privacy");

    const COLLECTION_ITEMS = [
        t("sections.collection.items.0"),
        t("sections.collection.items.1"),
        t("sections.collection.items.2"),
    ];

    const USAGE_ITEMS = [
        t("sections.usage.items.0"),
        t("sections.usage.items.1"),
        t("sections.usage.items.2"),
        t("sections.usage.items.3"),
    ];

    const SHARING_ITEMS = [
        t("sections.sharing.items.0"),
        t("sections.sharing.items.1"),
        t("sections.sharing.items.2"),
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
                <div className="absolute top-[40%] right-10 w-112.5 h-112.5 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />

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
                                <IconShieldCheck size={16} />
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

                    {/* Section 1: Information We Collect */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md p-6 md:p-8 shadow-md"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <IconDatabase size={22} />
                            </div>
                            <H2 className="text-xl md:text-2xl font-bold text-foreground">
                                {t("sections.collection.title")}
                            </H2>
                        </div>
                        <P className="text-sm md:text-base text-muted-foreground mb-4">
                            {t("sections.collection.description")}
                        </P>
                        <ul className="space-y-3">
                            {COLLECTION_ITEMS.map((item, idx) => (
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

                    {/* Section 2: How We Use Your Information */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md p-6 md:p-8 shadow-md"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <IconUserCheck size={22} />
                            </div>
                            <H2 className="text-xl md:text-2xl font-bold text-foreground">
                                {t("sections.usage.title")}
                            </H2>
                        </div>
                        <P className="text-sm md:text-base text-muted-foreground mb-4">
                            {t("sections.usage.description")}
                        </P>
                        <ul className="space-y-3">
                            {USAGE_ITEMS.map((item, idx) => (
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

                    {/* Section 3: Data Sharing & Third-Party Services */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md p-6 md:p-8 shadow-md"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <IconShare size={22} />
                            </div>
                            <H2 className="text-xl md:text-2xl font-bold text-foreground">
                                {t("sections.sharing.title")}
                            </H2>
                        </div>
                        <P className="text-sm md:text-base text-muted-foreground mb-4">
                            {t("sections.sharing.description")}
                        </P>
                        <ul className="space-y-3">
                            {SHARING_ITEMS.map((item, idx) => (
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

                    {/* Section 4: Data Security & Storage */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md p-6 md:p-8 shadow-md"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <IconLock size={22} />
                            </div>
                            <H2 className="text-xl md:text-2xl font-bold text-foreground">
                                {t("sections.security.title")}
                            </H2>
                        </div>
                        <P className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {t("sections.security.description")}
                        </P>
                    </motion.section>

                    {/* Section 5: Your Data Rights & Choices */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md p-6 md:p-8 shadow-md"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <IconCheck size={22} />
                            </div>
                            <H2 className="text-xl md:text-2xl font-bold text-foreground">
                                {t("sections.rights.title")}
                            </H2>
                        </div>
                        <P className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {t("sections.rights.description")}
                        </P>
                    </motion.section>

                    {/* Section 6: Cookies & Local Storage */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md p-6 md:p-8 shadow-md"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <IconCookie size={22} />
                            </div>
                            <H2 className="text-xl md:text-2xl font-bold text-foreground">
                                {t("sections.cookies.title")}
                            </H2>
                        </div>
                        <P className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {t("sections.cookies.description")}
                        </P>
                    </motion.section>

                    {/* Section 7: Contact Support */}
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
                                        Email Us
                                    </Span>
                                    <Span className="text-sm font-semibold truncate block">
                                        {t("sections.contact.email")}
                                    </Span>
                                </div>
                            </a>

                            <div className="flex items-center gap-3 p-4 rounded-xl bg-background/80 border border-border/60 text-foreground">
                                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                    <IconMapPin size={20} />
                                </div>
                                <div>
                                    <Span className="text-xs text-muted-foreground block">
                                        Office Location
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

export default PrivacyPage;
