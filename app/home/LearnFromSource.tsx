"use client";

import GradientTopBorder from "@/components/global/GradientTopBorder";
import SectionHeader from "@/components/global/SectionHeader";
import SectionSeparator from "@/components/global/SectionSeparator";
import { H2, P, Span } from "@/components/global/Texts";
import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconLink,
    IconWorld,
} from "@tabler/icons-react";
import { Award, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

const LearnFromSource = () => {
    const SOCIALS = [
        { icon: IconBrandInstagram, href: "#", label: "Instagram" },
        { icon: IconBrandFacebook, href: "#", label: "Facebook" },
        { icon: IconWorld, href: "#", label: "Website" },
        { icon: IconLink, href: "#", label: "Portfolio" },
    ];

    const STATS = [
        {
            icon: Award,
            title: "৬+ বছর অভিজ্ঞতা",
            subtitle: "Industry Veteran",
        },
        {
            icon: ShieldCheck,
            title: "সার্টিফাইড প্রো",
            subtitle: "Adobe Workflow Expert",
        },
    ];
    return (
        <SectionSeparator className="bg-accent relative">
            <GradientTopBorder />
            <SectionHeader
                title="learn from the source"
                subtitle="arefur rahman"
            />
            <div className="w-full py-16 md:py-24">
                <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
                    {/* Photo card */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-neutral-900 shadow-xl md:aspect-[5/6]"
                    >
                        {/* ambient glow — blue instead of red */}
                        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-primary/40 blur-[90px]" />
                        <div className="pointer-events-none absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-chart-3/25 blur-[100px]" />

                        {/* subtle diagonal panel like reference */}
                        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_38%,rgba(255,255,255,0.03)_38%,rgba(255,255,255,0.03)_54%,transparent_54%)]" />

                        <Image
                            src={"/ceo.webp"}
                            alt="Founder portrait"
                            fill
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
                        className="flex flex-col gap-6"
                    >
                        <div>
                            <H2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                                Rowshan Taieen
                            </H2>
                            <P className="mt-2 text-lg font-medium text-primary">
                                Founder &amp; Lead Mentor
                            </P>
                        </div>

                        <P className="font-bengali text-base leading-relaxed text-muted-foreground md:text-lg">
                            বাংলাদেশের ইনফোগ্রাফিক কন্টেন্ট এর পুরো প্যাটার্ন
                            পালটে দিয়েছি আমি{" "}
                            <Span className="font-semibold text-foreground">
                                Voice of Dhaka
                            </Span>{" "}
                            এর হাত ধরে। সাথে বাংলাদেশের টপ সব চ্যানেলে নিয়মিত
                            এডিটিং করে যাচ্ছে আমার নিজ হাতে তৈরি করা বহু এডিটর।
                            ইন্টারন্যাশনাল মার্কেটপ্লেসেও নিজেদের আলাদা জায়গা
                            করে নিয়েছে তারা।
                        </P>

                        <div className="mt-2 grid grid-cols-2 gap-4">
                            {STATS.map(({ icon: Icon, title, subtitle }) => (
                                <div
                                    key={subtitle}
                                    className="flex items-start gap-3"
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                                        <Icon
                                            className="h-5 w-5 text-primary"
                                            strokeWidth={2}
                                        />
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
        </SectionSeparator>
    );
};

export default LearnFromSource;
