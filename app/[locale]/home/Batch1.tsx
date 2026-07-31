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
        <SectionSeparator className="bg-secondary grid gap-10 md:gap-14 lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div
                className="order-1 md:order-0"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <Image
                    src="/batch-1.webp"
                    alt="Batch 1"
                    width={600}
                    height={400}
                    priority
                    className="w-full aspect-16/10 md:aspect-3/2 object-cover rounded-2xl shadow-2xl"
                />
            </motion.div>
            <motion.div
                className="space-y-8"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                    duration: 0.55,
                    delay: 0.1,
                    ease: "easeOut",
                }}
            >
                <P className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-zinc-900 dark:text-white">
                    Rhythm <Span className="text-primary">- Impact -</Span>{" "}
                    Pacing
                </P>
                <P className="max-w-xl pr-0 lg:pr-8 text-lg md:text-xl leading-8 text-muted-foreground dark:text-zinc-300">
                    একজন দক্ষ এডিটর শুধু ক্লিপ একটার পর একটা সাজায় না। সে তৈরি
                    করে উত্তেজনা, স্বস্তি, ছন্দ আর অনুভূতি। কারণ এডিটিং শুধু
                    টেকনিক্যাল কাজ নয় — এটি এক ধরনের ভিজ্যুয়াল গল্প বলার শিল্প।
                </P>
                <div className="space-y-4 border-l-4 border-primary pl-8 pt-2">
                    <p className="italic text-sm sm:text-base leading-7 text-muted-foreground">
                        “Editing is not just tools;
                        <br /> it’s about strategic storytelling and human
                        judgment.”
                    </p>
                    <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                        — Arefur Rahman (Founder)
                    </p>
                </div>
            </motion.div>
        </SectionSeparator>
    );
};

export default Batch1;
