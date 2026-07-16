"use client";

import enToBnNumber from "@/lib/numberEn2Bn";
import { CircleCheck } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import CourseSectionHeader from "./CourseSectionHeader";

type Feature = {
    label: string;
    price?: number;
};

function FeatureRow({ label, price }: Feature) {
    return (
        <li className="flex items-start gap-3">
            <CircleCheck
                className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500"
                strokeWidth={2}
            />
            <span className="font-bengali text-sm leading-relaxed text-foreground/90 md:text-base">
                {label}
                {price !== undefined && (
                    <span className="font-bengali text-muted-foreground">
                        {" "}
                        (৳{enToBnNumber(Number(price).toLocaleString())})
                    </span>
                )}
            </span>
        </li>
    );
}

const NightOwlOffer = () => {
    const LEFT_FEATURES: Feature[] = [
        { label: "২৬টি লাইভ ক্লাস — Premiere Pro + After Effects" },
        { label: "Voice of Dhaka-স্টাইল Effect Pack", price: 2000 },
        { label: "Weekly Mentor Session", price: 3000 },
        { label: "Premium Resource Pack", price: 3000 },
    ];

    const RIGHT_FEATURES: Feature[] = [
        { label: "৬টি portfolio project" },
        { label: "Career Roadmap PDF", price: 1500 },
        { label: "Private VIP Community", price: 2000 },
        { label: "Lifetime class recording access" },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-muted px-24 py-28 space-y-16"
        >
            <CourseSectionHeader
                badgeText="লিমিটেড নাইট আউল অফার"
                sectionTitle="ভিডিও এডিটিং ক্যারিয়ার শুরু"
                sectionSubtitle="আজই"
                sectionDescription="২৬টি লাইভ ক্লাস, ৬টি প্রজেক্ট, প্রিমিয়াম বোনাস ও মেন্টরশিপে ফ্রিল্যান্সিং-রেডি ভিডিও এডিটর হয়ে উঠুন দ্রুত।"
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
                                <span className="font-bengali text-sm font-bold text-primary">
                                    ({enToBnNumber(29)}% ডিসকাউন্ট)
                                </span>
                                <h3 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                                    Video Editing Mastery
                                </h3>
                            </div>

                            <div className="text-right">
                                <span className="font-bengali block text-sm text-muted-foreground line-through">
                                    ৳{enToBnNumber((12000).toLocaleString())}
                                </span>
                                <span className="font-bengali block text-4xl font-extrabold text-primary sm:text-5xl">
                                    ৳{enToBnNumber((8500).toLocaleString())}
                                </span>
                                <span className="font-bengali mt-1 block text-xs font-semibold text-emerald-500 sm:text-sm">
                                    ৳{enToBnNumber((3500).toLocaleString())}{" "}
                                    সাশ্রয় করুন
                                </span>
                            </div>
                        </div>

                        <hr className="my-6 border-border/60" />

                        {/* feature checklist */}
                        <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                            {LEFT_FEATURES.map((f) => (
                                <FeatureRow key={f.label} {...f} />
                            ))}
                            {RIGHT_FEATURES.map((f) => (
                                <FeatureRow key={f.label} {...f} />
                            ))}
                        </div>

                        {/* CTA */}
                        <Button
                            asChild
                            size="lg"
                            className="font-bengali mt-8 w-full rounded-2xl py-3.5 text-center text-base font-bold shadow-lg shadow-primary/25 transition-colors sm:text-lg h-auto"
                        >
                            <motion.a
                                href="#enroll"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                এখনই এনরোল করুন — ৳
                                {enToBnNumber((8500).toLocaleString())}
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
                        className="font-bengali mt-10 text-center text-sm text-muted-foreground sm:text-base"
                    >
                        <p className="font-semibold text-foreground/70">
                            এনরোলের পর পাচ্ছেন
                        </p>
                        <p className="mt-2">
                            কোর্স ভ্যালু{" "}
                            <span className="text-muted-foreground/60 line-through">
                                ৳ {enToBnNumber((12000).toLocaleString())}
                            </span>{" "}
                            + বোনাস{" "}
                            <span className="text-muted-foreground/60 line-through">
                                ৳ {enToBnNumber((11500).toLocaleString())}
                            </span>{" "}
                            ={" "}
                            <span className="font-bold text-primary line-through">
                                ৳ {enToBnNumber((23500).toLocaleString())}
                            </span>{" "}
                            এর সবকিছুই পাচ্ছেন মাত্র{" "}
                            <span className="font-extrabold text-foreground underline decoration-primary decoration-2 underline-offset-4">
                                ৳ {enToBnNumber((8500).toLocaleString())}
                            </span>
                            -এ।
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default NightOwlOffer;
