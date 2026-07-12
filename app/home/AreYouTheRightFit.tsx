"use client";

import GradientTopBorder from "@/components/global/GradientTopBorder";
import SectionHeader from "@/components/global/SectionHeader";
import SectionSeparator from "@/components/global/SectionSeparator";
import { Check, ShieldAlert, X, Zap } from "lucide-react";
import { motion, type Variants } from "motion/react";

const AreYouTheRightFit = () => {
    const FOR_YOU = [
        "আপনি একদম জিরো থেকে প্রফেশনাল এডিটিং ক্যারিয়ার গড়তে চান।",
        "ইন্ডাস্ট্রি স্ট্যান্ডার্ড অ্যাডভান্সড টেকনিক শিখতে আপনি কঠোর পরিশ্রমী।",
        "ইউটিউবার বা ফ্রিল্যান্সার হিসেবে নিজের কন্টেন্টকে ইন্টারন্যাশনাল লেভেলে নিতে চান।",
        "আপনার যথেষ্ট ধৈর্য্য আছে।",
    ];

    const NOT_FOR_YOU = [
        "আপনি মনে করেন এক ক্লিকে বা 'শর্টকাট' ম্যাজিকে প্রফেশনাল এডিটর হওয়া সম্ভব।",
        "আপনি শুধু একটি সার্টিফিকেট চান কিন্তু শিখতে বা প্রজেক্ট করতে আগ্রহী নন।",
        "আপনি এডিটিংকে শুধু একটি ক্যাজুয়াল 'হবি' হিসেবে দেখছেন, প্রফেশন হিসেবে নয়।",
    ];

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut", delay: i * 0.15 },
        }),
    };

    const listVariants = {
        hidden: {},
        show: {
            transition: { staggerChildren: 0.08, delayChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        show: { opacity: 1, x: 0, transition: { duration: 0.35 } },
    };
    return (
        <SectionSeparator className="bg-background relative mx-30">
            <GradientTopBorder />
            <SectionHeader
                title="Are you the"
                titlePrimary="right fit?"
                subtitle="eligibility check"
            />
            <div className="w-full">
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-2 md:gap-8">
                    {/* This is for you */}
                    <motion.div
                        custom={0}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                        className="relative overflow-hidden rounded-2xl border border-primary/30 hover:border-primary/90 transition-all duration-300 bg-card p-8 shadow-sm"
                    >
                        <Zap
                            className="pointer-events-none absolute right-3 top-3 size-16 text-primary/10"
                            strokeWidth={2}
                        />

                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                                <Check
                                    className="h-5 w-5 text-primary"
                                    strokeWidth={2.5}
                                />
                            </div>
                            <h3 className="font-bengali text-xl font-bold text-primary md:text-2xl">
                                এইটা আপনার জন্য, যদি...
                            </h3>
                        </div>

                        <motion.ul
                            variants={listVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="flex flex-col gap-4"
                        >
                            {FOR_YOU.map((text) => (
                                <motion.li
                                    key={text}
                                    variants={itemVariants}
                                    className="flex items-start gap-3"
                                >
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                        <Check
                                            className="h-3 w-3 text-primary"
                                            strokeWidth={3}
                                        />
                                    </span>
                                    <p className="font-bengali text-sm leading-relaxed text-foreground/90 md:text-base">
                                        {text}
                                    </p>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>

                    {/* Not for you */}
                    <motion.div
                        custom={1}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                        className="relative overflow-hidden rounded-2xl border border-destructive/25 hover:border-destructive/85 transition-all duration-300 bg-card p-8 shadow-sm"
                    >
                        <ShieldAlert
                            className="pointer-events-none absolute right-3 top-3 size-16 text-destructive/10"
                            strokeWidth={2}
                        />

                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-destructive/10">
                                <X
                                    className="h-5 w-5 text-destructive"
                                    strokeWidth={2.5}
                                />
                            </div>
                            <h3 className="font-bengali text-xl font-bold text-destructive md:text-2xl">
                                এইটা আপনার জন্য না, যদি...
                            </h3>
                        </div>

                        <motion.ul
                            variants={listVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="flex flex-col gap-4"
                        >
                            {NOT_FOR_YOU.map((text) => (
                                <motion.li
                                    key={text}
                                    variants={itemVariants}
                                    className="flex items-start gap-3"
                                >
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                                        <X
                                            className="h-3 w-3 text-destructive"
                                            strokeWidth={3}
                                        />
                                    </span>
                                    <p className="font-bengali text-sm leading-relaxed text-foreground/90 md:text-base">
                                        {text}
                                    </p>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                </div>
            </div>
        </SectionSeparator>
    );
};

export default AreYouTheRightFit;
