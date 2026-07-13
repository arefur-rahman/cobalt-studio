"use client";

import { H3, P, Span } from "@/components/global/Texts";
import {
    IconBriefcase2,
    IconSparkles,
    IconUsers,
    IconVideo,
} from "@tabler/icons-react";
import { motion } from "motion/react";

const WhyUsGrid = () => {
    const FEATURES = [
        {
            number: "01",
            icon: IconUsers,
            color: "text-rose-500",
            title: "Cobaltএর নিজস্ব ইন্ট্রাক্টর",
            description:
                "০.০৩৬k সাবস্ক্রাইবার চ্যানেলের মূল ইন্ট্রাক্টর থেকে সরাসরি শেখার সুযোগ, যার কাজ দেখে আপনি অনুপ্রাণিত হয়েছেন।",
        },
        {
            number: "02",
            icon: IconVideo,
            color: "text-blue-500",
            title: "২৬টি লাইভ ক্লাস",
            description:
                "রেকর্ডেড ভিডিওর ভিড়ে হারিয়ে যাওয়া নয়, সরাসরি প্রশ্ন করুন এবং রিয়েল-টাইম ফিডব্যাক নিয়ে স্কিল ঝালাই করুন।",
        },
        {
            number: "03",
            icon: IconBriefcase2,
            color: "text-emerald-500",
            title: "৬টি পোর্টফোলিও প্রজেক্ট",
            description:
                "কোর্স শেষে আপনার হাতে থাকবে ৬টি প্রফেশনাল প্রজেক্ট, যা দিয়ে ইন্টারন্যাশনালি ক্লায়েন্ট ধরা অনেক সহজ হবে।",
        },
        {
            number: "04",
            icon: IconSparkles,
            color: "text-violet-500",
            title: "AI Workflow + YouTube Growth",
            description:
                "শুধু এডিটিং নয়, AI টুলস ব্যবহার এবং ইউটিউব এসইও সহ ভবিষ্যতের এডিটর হওয়ার কমপ্লিট রোডম্যাপ।",
        },
    ];

    return (
        <div className="w-full pt-16 md:pt-24">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2">
                {FEATURES.map(
                    ({ number, icon: Icon, color, title, description }, i) => (
                        <motion.div
                            key={number}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{
                                duration: 0.5,
                                ease: "easeOut",
                                delay: i * 0.1,
                            }}
                            className="relative overflow-hidden rounded-2xl border border-border/40 bg-muted/40 p-8 dark:border-border/50 dark:bg-card"
                        >
                            {/* faint background number */}
                            <Span
                                aria-hidden
                                className="pointer-events-none absolute -right-2 bottom-2 select-none text-8xl font-black leading-none text-foreground/5"
                            >
                                {number}
                            </Span>

                            <div className="relative z-10">
                                <Icon
                                    className={`h-7 w-7 ${color}`}
                                    stroke={1.8}
                                />

                                <H3 className="font-bengali mt-6 text-xl font-bold text-foreground md:text-2xl">
                                    {title}
                                </H3>

                                <P className="font-bengali mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                                    {description}
                                </P>
                            </div>
                        </motion.div>
                    ),
                )}
            </div>
        </div>
    );
};

export default WhyUsGrid;
