import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";
import CourseSectionHeader from "./CourseSectionHeader";
import { useTranslations } from "next-intl";

const Faq = () => {
    const t = useTranslations("Batch1");

    type FaqItem = {
        question: string;
        answer: string;
    };

    const FAQS: FaqItem[] = [
        {
            question: t("FAQ.1.question"),
            answer: t("FAQ.1.answer"),
        },
        {
            question: t("FAQ.2.question"),
            answer: t("FAQ.2.answer"),
        },
        {
            question: t("FAQ.3.question"),
            answer: t("FAQ.3.answer"),
        },
        {
            question: t("FAQ.4.question"),
            answer: t("FAQ.4.answer"),
        },
        {
            question: t("FAQ.5.question"),
            answer: t("FAQ.5.answer"),
        },
        {
            question: t("FAQ.6.question"),
            answer: t("FAQ.6.answer"),
        },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:px-24 px-3 py-7 md:py-28 space-y-6 md:space-y-16"
        >
            <CourseSectionHeader
                badgeText={t("FAQ.0.badgeText")}
                sectionTitle={t("FAQ.0.sectionTitle")}
                sectionSubtitle={t("FAQ.0.sectionSubtitle")}
                sectionDescription={t("FAQ.0.sectionDescription")}
            />
            <div className="w-full">
                <div className="mx-auto max-w-3xl md:px-6">
                    <div className="overflow-hidden rounded-3xl border border-border/60 bg-card">
                        <Accordion
                            type="single"
                            collapsible
                            defaultValue="item-1"
                            className="w-full"
                        >
                            {FAQS.map((faq, i) => (
                                <AccordionItem
                                    key={i}
                                    value={`item-${i}`}
                                    className="border-border/60 px-2"
                                >
                                    <AccordionTrigger className="px-4 py-6 hover:no-underline sm:px-6">
                                        <span className="font-bengali text-base font-bold text-foreground hover:text-primary transition-all duration-200 sm:text-lg">
                                            {faq.question}
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="font-bengali px-4 pb-6 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:text-base">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default Faq;
