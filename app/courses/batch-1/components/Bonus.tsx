"use client";

import { motion } from "motion/react";
import {
    Wand2,
    Compass,
    Mic,
    Users,
    Layers,
    type LucideIcon,
} from "lucide-react";
import CourseSectionHeader from "./CourseSectionHeader";
import enToBnNumber from "@/lib/numberEn2Bn";

type BonusItem = {
    icon: LucideIcon;
    title: string;
    description: string;
    price: string;
    iconColor?: string;
    iconBg?: string;
};

const Bonus = () => {
    const BONUSES: BonusItem[] = [
        {
            icon: Wand2,
            title: "Cobalt Studio এর নিজস্ব Effect Pack",
            description: "Ready-made templates — সরাসরি ব্যবহার করুন",
            price: "2000",
            iconColor: "text-purple-500",
            iconBg: "bg-purple-500/10",
        },
        {
            icon: Compass,
            title: "Career Roadmap PDF",
            description:
                "ফ্রিল্যান্সিং শুরু থেকে প্রথম ক্লায়েন্ট পর্যন্ত গাইড",
            price: "1500",
            iconColor: "text-blue-500",
            iconBg: "bg-blue-500/10",
        },
        {
            icon: Mic,
            title: "Weekly Mentor Live Session",
            description: "সাপ্তাহিক Q&A + portfolio review",
            price: "3000",
            iconColor: "text-rose-500",
            iconBg: "bg-rose-500/10",
        },
        {
            icon: Users,
            title: "Private VIP Community",
            description: "Client leads + networking + resources",
            price: "2000",
            iconColor: "text-amber-500",
            iconBg: "bg-amber-500/10",
        },
        {
            icon: Layers,
            title: "Premium Resource Pack",
            description: "LUT, Preset, Sound FX, Template library",
            price: "3000",
            iconColor: "text-emerald-500",
            iconBg: "bg-emerald-500/10",
        },
    ];

    return (
        <section className="p-24">
            <CourseSectionHeader
                badgeText="বোনাস"
                sectionTitle="নাইট আউলে"
                sectionSubtitle="বোনাস পাচ্ছেন"
                sectionDescription="কোর্সের সাথে ৳১১,৫০০+ টাকার বোনাস সম্পূর্ণ ফ্রি।"
            />
            <div className="w-full py-16">
                <div className="mx-auto max-w-5xl px-6">
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
                                        ৳
                                        {enToBnNumber(
                                            Number(price).toLocaleString(),
                                        )}
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
                            মোট ভ্যালু
                        </span>
                        <span className="font-bengali text-2xl font-extrabold text-primary sm:text-3xl underline">
                            ৳
                            {enToBnNumber(
                                BONUSES.reduce(
                                    (sum, bonus) => sum + Number(bonus.price),
                                    0,
                                ).toLocaleString("en-US"),
                            )}
                        </span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Bonus;
