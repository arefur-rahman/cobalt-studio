"use client";

import SectionSeparator from "@/components/global/SectionSeparator";
import { P, Span } from "@/components/global/Texts";
import { motion } from "motion/react";
import Image from "next/image";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

const Batch1 = () => {
    return (
        <SectionSeparator className="bg-secondary grid lg:grid-cols-2 gap-16 items-center justify-center">
            <motion.div
                className="order-0"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <Image
                    src="/batch-1.webp"
                    alt="batch 1"
                    className="object-cover rounded-2xl shadow-2xl"
                    width={600}
                    height={400}
                    priority
                />
            </motion.div>
            <motion.div
                className="space-y-8"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.75, ease: "easeOut", delay: 0.15 }}
            >
                <P className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-white leading-tight">
                    Rhythm - <Span className="text-primary">Impact</Span> -
                    Pacing
                </P>
                <P className="max-w-[650px] text-base pr-8 md:text-xl text-zinc-600 dark:text-gray-200 leading-relaxed">
                    একজন দক্ষ এডিটর শুধু ক্লিপ একটার পর একটা সাজায় না। সে তৈরি
                    করে উত্তেজনা, স্বস্তি, ছন্দ আর অনুভূতি। কারণ এডিটিং শুধু
                    টেকনিক্যাল কাজ নয় — এটি এক ধরনের ভিজ্যুয়াল গল্প বলার শিল্প।
                </P>
                <div className="space-y-4 border-l-4 border-primary pl-8 pt-2">
                    <p className="text-base text-muted-foreground dark:text-zinc-300/70 italic leading-snug">
                        “Editing is not just tools;
                        <br /> it’s about strategic storytelling and human
                        judgment.”
                    </p>
                    <p className="text-sm font-semibold text-primary uppercase tracking-widest">
                        — Arefur Rahman (Founder)
                    </p>
                </div>
            </motion.div>
        </SectionSeparator>
    );
};

export default Batch1;
