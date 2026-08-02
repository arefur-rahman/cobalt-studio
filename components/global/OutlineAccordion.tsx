"use client";

import { useEffect, useState } from "react";
import { H3, Span } from "@/components/global/Texts";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, type Variants } from "motion/react";
import { FileText, PlayCircle } from "lucide-react";
import getCourseBluePrint from "@/app/server/getCourseBluePrint";

export interface BluePrintItem {
    id: string;
    moduleNo: string;
    title: string;
    subtitle: string;
    contents: string[];
}

interface OutlineAccordionProps {
    outlines?: BluePrintItem[];
}

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

const OutlineAccordion = ({ outlines: initialOutlines }: OutlineAccordionProps) => {
    const [fetchedBluePrint, setFetchedBluePrint] = useState<BluePrintItem[]>([]);

    useEffect(() => {
        if (!initialOutlines || initialOutlines.length === 0) {
            getCourseBluePrint().then((data) => {
                if (data) {
                    setFetchedBluePrint(data);
                }
            });
        }
    }, [initialOutlines]);

    const courseBluePrint =
        initialOutlines && initialOutlines.length > 0
            ? initialOutlines
            : fetchedBluePrint;

    if (!courseBluePrint || courseBluePrint.length === 0) {
        return null;
    }

    return (
        <motion.div
            key={courseBluePrint.length}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <Accordion type="single" collapsible className="space-y-4">
                {courseBluePrint.map((outline) => (
                    <motion.div key={outline?.id} variants={itemVariants}>
                        <AccordionItem
                            value={outline?.moduleNo}
                            className="border-none"
                        >
                            <AccordionTrigger className="w-full border border-muted-foreground/30 hover:border-primary/80 rounded-xl px-5 md:px-8 py-5 transition-all duration-300 data-[state=open]:border-primary data-[state=open]:rounded-b-none">
                                <div className="flex items-center w-full gap-4">
                                    <Span className="text-2xl md:text-3xl font-semibold transition-colors duration-300 text-muted-foreground dark:text-muted-foreground group-hover/accordion-trigger:text-primary/80 group-aria-expanded/accordion-trigger:text-primary">
                                        {outline?.moduleNo}
                                    </Span>
                                    <H3 className="text-xl md:text-2xl font-semibold transition-colors duration-300 text-foreground dark:text-white">
                                        {outline?.title}
                                    </H3>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="border-x border-b border-muted-foreground/30  rounded-b-xl px-5 md:px-8 pt-6 pb-6 bg-background">
                                <p className="text-sm md:text-base text-muted-foreground mb-6">
                                    {outline?.subtitle}
                                </p>
                                <div className="space-y-3 mb-6">
                                    {outline?.contents.map((content, index) => (
                                        <div
                                            key={index}
                                            className="group flex items-center justify-between border border-muted-foreground/20 bg-slate-50/50 dark:bg-zinc-900/50 p-4 rounded-xl hover:border-primary/40 transition-all cursor-pointer"
                                        >
                                            <div className="flex items-center gap-3">
                                                <PlayCircle className="size-5 text-muted-foreground/60 group-hover:text-primary transition-colors duration-300" />
                                                <Span className="text-sm font-medium text-foreground">
                                                    Class {index + 1}: {content}
                                                </Span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground/80">
                                                <span>Live Session</span>
                                                <FileText className="size-4" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm font-semibold text-primary">
                                    • Total {outline?.contents.length} Lessons
                                    in this module
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </motion.div>
                ))}
            </Accordion>
        </motion.div>
    );
};

export default OutlineAccordion;
