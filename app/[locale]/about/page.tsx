"use client";

import GradientTopBorder from "@/components/global/GradientTopBorder";
import MentorDetails from "@/components/global/MentorDetails";
import NavBarWithPageHeader from "@/components/global/NavBarWithPageHeader";
import SectionHeader from "@/components/global/SectionHeader";
import { H2, H3, P, Span } from "@/components/global/Texts";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
    IconArrowRight,
    IconAward,
    IconBrain,
    IconCheck,
    IconCode,
    IconGitPullRequest,
    IconRocket,
    IconSparkles,
    IconTarget,
    IconUsers,
    IconX,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const AboutPage = () => {
    const t = useTranslations("About");

    const STATS = [
        {
            icon: IconUsers,
            value: t("stats.students.value"),
            label: t("stats.students.label"),
        },
        {
            icon: IconSparkles,
            value: t("stats.subscribers.value"),
            label: t("stats.subscribers.label"),
        },
        {
            icon: IconCode,
            value: t("stats.projects.value"),
            label: t("stats.projects.label"),
        },
        {
            icon: IconAward,
            value: t("stats.satisfaction.value"),
            label: t("stats.satisfaction.label"),
        },
    ];

    const PILLAR_ICONS = [IconCode, IconGitPullRequest, IconBrain, IconRocket];

    const COMPARISON_FEATURES = [
        {
            trad: t("comparison.features.0.trad"),
            cobalt: t("comparison.features.0.cobalt"),
        },
        {
            trad: t("comparison.features.1.trad"),
            cobalt: t("comparison.features.1.cobalt"),
        },
        {
            trad: t("comparison.features.2.trad"),
            cobalt: t("comparison.features.2.cobalt"),
        },
        {
            trad: t("comparison.features.3.trad"),
            cobalt: t("comparison.features.3.cobalt"),
        },
    ];

    const TIMELINE_STEPS = [
        {
            year: t("timeline.steps.0.year"),
            title: t("timeline.steps.0.title"),
            description: t("timeline.steps.0.description"),
        },
        {
            year: t("timeline.steps.1.year"),
            title: t("timeline.steps.1.title"),
            description: t("timeline.steps.1.description"),
        },
        {
            year: t("timeline.steps.2.year"),
            title: t("timeline.steps.2.title"),
            description: t("timeline.steps.2.description"),
        },
        {
            year: t("timeline.steps.3.year"),
            title: t("timeline.steps.3.title"),
            description: t("timeline.steps.3.description"),
        },
    ];

    return (
        <NavBarWithPageHeader
            sectionTag={t("sectionTag")}
            mainHeading={t("mainHeading")}
            subHeading={t("subHeading")}
        >
            <main className="relative w-full bg-background text-foreground overflow-hidden">
                {/* Background Glow Blobs */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-150 h-75 bg-primary/10 dark:bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute top-[35%] right-10 w-112.5 h-112.5 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

                {/* 1. HERO & MISSION */}
                <section className="relative py-16 md:py-24">
                    <div className="container mx-auto px-6 md:px-8 max-w-6xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative rounded-3xl border border-border/80 bg-linear-to-b from-card/90 to-card/40 backdrop-blur-xl p-8 md:p-14 shadow-2xl overflow-hidden"
                        >
                            <GradientTopBorder />
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                                <IconTarget size={15} />
                                {t("hero.badge")}
                            </div>

                            <H2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-snug max-w-3xl">
                                {t("hero.title")}
                            </H2>

                            <P className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl">
                                {t("hero.description")}
                            </P>

                            {/* Stats Bar */}
                            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-border/60">
                                {STATS.map((stat, idx) => {
                                    const Icon = stat.icon;
                                    return (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.4,
                                                delay: 0.1 * idx,
                                            }}
                                            className="flex flex-col items-start gap-1 p-3 rounded-2xl bg-muted/30 border border-border/40 hover:border-primary/40 transition-colors"
                                        >
                                            <div className="flex items-center gap-2 text-primary mb-1">
                                                <Icon size={20} />
                                            </div>
                                            <Span className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                                                {stat.value}
                                            </Span>
                                            <P className="text-xs md:text-sm text-muted-foreground font-medium">
                                                {stat.label}
                                            </P>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 2. CORE PILLARS / PHILOSOPHY */}
                <section className="relative py-16 bg-muted/40 border-y border-border/60">
                    <div className="container mx-auto px-6 md:px-8 max-w-6xl">
                        <SectionHeader
                            title={t("pillars.title")}
                            titlePrimary=""
                            subtitle={t("pillars.badge")}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-12">
                            {PILLAR_ICONS.map((Icon, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: idx * 0.1,
                                    }}
                                    className="group relative rounded-2xl border border-border/80 bg-background/80 hover:bg-background backdrop-blur-md p-8 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                            <Icon size={26} />
                                        </div>
                                        <span className="text-xs font-mono font-bold text-muted-foreground/60 tracking-widest">
                                            0{idx + 1}
                                        </span>
                                    </div>

                                    <H3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                                        {t(`pillars.items.${idx}.title`)}
                                    </H3>

                                    <P className="text-sm md:text-base text-muted-foreground leading-relaxed">
                                        {t(`pillars.items.${idx}.description`)}
                                    </P>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. MENTOR SECTION */}
                <section className="relative py-20">
                    <div className="container mx-auto px-6 md:px-8 max-w-6xl">
                        <SectionHeader
                            title={t("mentor.title")}
                            titlePrimary=""
                            subtitle={t("mentor.badge")}
                        />
                        <div className="mt-12">
                            <MentorDetails />
                        </div>
                    </div>
                </section>

                {/* 4. WHY COBALT STUDIO (COMPARISON) */}
                <section className="relative py-20 bg-muted/30 border-y border-border/60">
                    <div className="container mx-auto px-6 md:px-8 max-w-6xl">
                        <SectionHeader
                            title={t("comparison.title")}
                            titlePrimary=""
                            subtitle={t("comparison.badge")}
                        />

                        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Traditional Card */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="rounded-2xl border border-destructive/20 bg-background/50 p-8 shadow-sm"
                            >
                                <div className="flex items-center gap-3 pb-6 mb-6 border-b border-border/60">
                                    <div className="h-9 w-9 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center">
                                        <IconX size={20} />
                                    </div>
                                    <H3 className="text-lg font-bold text-foreground">
                                        {t("comparison.traditionalTitle")}
                                    </H3>
                                </div>
                                <ul className="space-y-5">
                                    {COMPARISON_FEATURES.map((item, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-3 text-sm text-muted-foreground"
                                        >
                                            <IconX
                                                size={18}
                                                className="text-destructive shrink-0 mt-0.5"
                                            />
                                            <span>{item.trad}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Cobalt Studio Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="relative rounded-2xl border border-primary/40 bg-linear-to-b from-primary/5 via-background to-background p-8 shadow-xl"
                            >
                                <GradientTopBorder />
                                <div className="flex items-center gap-3 pb-6 mb-6 border-b border-border/60">
                                    <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                                        <IconCheck size={20} />
                                    </div>
                                    <H3 className="text-lg font-bold text-foreground">
                                        {t("comparison.cobaltTitle")}
                                    </H3>
                                </div>
                                <ul className="space-y-5">
                                    {COMPARISON_FEATURES.map((item, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-3 text-sm font-medium text-foreground"
                                        >
                                            <IconCheck
                                                size={18}
                                                className="text-primary shrink-0 mt-0.5"
                                            />
                                            <span>{item.cobalt}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 5. TIMELINE / JOURNEY */}
                <section className="relative py-20">
                    <div className="container mx-auto px-6 md:px-8 max-w-5xl">
                        <SectionHeader
                            title={t("timeline.title")}
                            titlePrimary=""
                            subtitle={t("timeline.badge")}
                        />

                        <div className="mt-14 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-linear-to-b before:from-primary/80 before:via-primary/30 before:to-transparent">
                            {TIMELINE_STEPS.map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: idx * 0.1,
                                    }}
                                    className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-10 ${
                                        idx === TIMELINE_STEPS.length - 1
                                            ? "mb-0"
                                            : ""
                                    }`}
                                >
                                    {/* Timeline Dot */}
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-primary bg-background text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shrink-0 z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                        <div className="w-2 h-2 rounded-full bg-current" />
                                    </div>

                                    {/* Content Box */}
                                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md shadow-md group-hover:border-primary/40 transition-colors">
                                        <span className="inline-block px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-bold mb-2">
                                            {step.year}
                                        </span>
                                        <H3 className="text-lg font-bold text-foreground mb-1">
                                            {step.title}
                                        </H3>
                                        <P className="text-sm text-muted-foreground">
                                            {step.description}
                                        </P>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. CALL TO ACTION (CTA) */}
                <section className="relative py-20 bg-muted/50 border-t border-border/60">
                    <div className="container mx-auto px-6 md:px-8 max-w-5xl text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="relative rounded-3xl border border-primary/30 bg-linear-to-r from-primary/10 via-background to-primary/10 p-10 md:p-16 shadow-2xl overflow-hidden"
                        >
                            <GradientTopBorder />
                            <H2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight max-w-2xl mx-auto">
                                {t("cta.title")}
                            </H2>
                            <P className="mt-4 text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
                                {t("cta.subtitle")}
                            </P>
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                                <Button
                                    asChild
                                    size="lg"
                                    className="rounded-xl px-8 font-bold gap-2 shadow-lg shadow-primary/25 cursor-pointer"
                                >
                                    <Link href="/courses">
                                        {t("cta.exploreCourses")}
                                        <IconArrowRight size={18} />
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="rounded-xl px-8 font-bold border-border/80 hover:bg-muted cursor-pointer"
                                >
                                    <Link href="/tools">
                                        {t("cta.viewTools")}
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
        </NavBarWithPageHeader>
    );
};

export default AboutPage;
