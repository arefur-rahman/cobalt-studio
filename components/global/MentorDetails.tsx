"use client";

import { H2, P, Span } from "@/components/global/Texts";
import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconWorld,
} from "@tabler/icons-react";
import { Award, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const MentorDetails = () => {
    const t = useTranslations("Home.mentorDetails");
    const SOCIALS = [
        {
            icon: IconBrandLinkedin,
            href: "https://www.linkedin.com/in/md-arefur-rahman-khan-74188232b",
            label: "Linkedin",
        },
        {
            icon: IconBrandGithub,
            href: "https://github.com/arefur-rahman",
            label: "Github",
        },
        {
            icon: IconWorld,
            href: "https://arefolio.vercel.app",
            label: "Website",
        },
    ];

    const STATS = [
        {
            icon: Award,
            title: t("badges.experience.title"),
            subtitle: t("badges.experience.subtitle"),
        },
        {
            icon: ShieldCheck,
            title: t("badges.certified.title"),
            subtitle: t("badges.certified.subtitle"),
        },
    ];

    return (
        <div className="w-full">
            <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-center">
                {/* Photo card */}
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="lg:col-span-5 relative aspect-4/5 md:aspect-5/6 w-full overflow-hidden rounded-2xl bg-neutral-900 shadow-xl"
                >
                    {/* ambient glo */}
                    <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-primary/40 blur-[90px]" />
                    <div className="pointer-events-none absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-chart-3/25 blur-[100px]" />

                    {/* subtle diagonal panel like reference */}
                    <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_38%,rgba(255,255,255,0.03)_38%,rgba(255,255,255,0.03)_54%,transparent_54%)]" />

                    <Image
                        src={"/ceo.webp"}
                        alt="Founder portrait"
                        fill
                        loading="lazy"
                        className="object-cover object-top opacity-95"
                        sizes="(min-width: 768px) 480px, 100vw"
                    />

                    {/* social row */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        {SOCIALS.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-primary"
                            >
                                <Icon size={16} stroke={1.8} />
                            </a>
                        ))}
                    </div>
                </motion.div>

                {/* Text content */}
                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        delay: 0.1,
                    }}
                    className="lg:col-span-7 space-y-8 md:space-y-14 sm:ml-10"
                >
                    <div>
                        <H2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                            {t("name")}
                        </H2>
                        <P className="mt-2 text-lg font-medium text-primary">
                            {t("position")}
                        </P>
                    </div>

                    <P className="font-bengali text-base leading-relaxed text-muted-foreground dark:text-foreground/90 md:text-lg pr-16 md:pr-30">
                        {t("bio.text1")}
                        <Span className="font-semibold text-foreground">
                            {t("bio.highlight")}
                        </Span>
                        {t("bio.text2")}
                    </P>

                    <div className="mt-2 grid grid-cols-2 gap-4">
                        {STATS.map(({ icon: Icon, title, subtitle }) => (
                            <div
                                key={subtitle}
                                className="flex items-start gap-3 group"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-white text-primary transition-all duration-300">
                                    <Icon className="size-5" strokeWidth={2} />
                                </div>
                                <div>
                                    <P className="font-bengali text-sm font-bold text-foreground md:text-base">
                                        {title}
                                    </P>
                                    <P className="text-xs text-muted-foreground md:text-sm">
                                        {subtitle}
                                    </P>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default MentorDetails;
