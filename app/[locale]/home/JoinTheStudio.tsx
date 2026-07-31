"use client";

import GradientTopBorder from "@/components/global/GradientTopBorder";
import SectionSeparator from "@/components/global/SectionSeparator";
import { Span } from "@/components/global/Texts";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

const JoinTheStudio = () => {
    return (
        <SectionSeparator className="bg-background relative">
            <GradientTopBorder />
            <div className="w-full md:py-8">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl"
                >
                    {/* background photo */}
                    <div className="relative aspect-21/9 w-full min-h-[420px] md:min-h-[460px]">
                        <Image
                            src={"/newsletter-bg.webp"}
                            alt="Editing workspace"
                            fill
                            className="object-cover"
                            sizes="(min-width: 1280px) 1152px, 100vw"
                        />

                        {/* gradient overlay */}
                        <div className="absolute inset-0 bg-linear-to-r from-primary/70 via-neutral-950/70 to-neutral-950/90" />
                        <div className="absolute inset-0 bg-linear-to-t from-neutral-950/60 via-transparent to-transparent" />

                        {/* content */}
                        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-16 text-center">
                            <motion.h2
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="max-w-3xl text-3xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
                            >
                                Stop Watching. Start Creating.
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="mt-5 max-w-xl text-sm text-neutral-300 sm:text-base md:text-lg"
                            >
                                Join{" "}
                                <Span className="font-semibold">
                                    Cobalt Studio
                                </Span>{" "}
                                and transform your passion for video editing
                                into a professional skill. Learn from real
                                projects, get mentorship, and grow with our
                                creative community.
                            </motion.p>

                            <motion.a
                                href="#"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.98 }}
                                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90 sm:text-base"
                            >
                                Join the Lab
                                <ArrowUpRight
                                    className="h-4 w-4"
                                    strokeWidth={2.5}
                                />
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </SectionSeparator>
    );
};

export default JoinTheStudio;
