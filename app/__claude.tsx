"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

type FaqItem = {
    question: string;
    answer: string;
};

const FAQS: FaqItem[] = [
    {
        question: "আমি একদম beginner — এই কোর্স কি আমার জন্য?",
        answer: "হ্যাঁ, একদম বেসিক থেকে শুরু করানো হয় এই কোর্সে। কোনো আগের এডিটিং অভিজ্ঞতা লাগবে না, শুধু ধৈর্য আর শেখার আগ্রহ থাকলেই হবে।",
    },
    {
        question: "লাইভ ক্লাস মিস হলে কি পাব?",
        answer: "সব লাইভ ক্লাসের রেকর্ডিং পাবেন। যেকোনো সময় দেখতে পারবেন।",
    },
    {
        question: "কোন software লাগবে? দাম কত?",
        answer: "Adobe Premiere Pro আর After Effects লাগবে। Adobe-এর স্টুডেন্ট প্ল্যান বা ট্রায়াল ভার্সন দিয়েও কোর্স শুরু করতে পারবেন, বিস্তারিত ক্লাসের শুরুতেই বলে দেওয়া হবে।",
    },
    {
        question: "পেমেন্ট কীভাবে করব?",
        answer: "bKash, Nagad, Rocket, এবং ব্যাংক ট্রান্সফার — সব কয়টা মাধ্যমেই পেমেন্ট করতে পারবেন। এনরোল বাটনে ক্লিক করলে সব অপশন দেখতে পাবেন।",
    },
    {
        question: "ফ্রিল্যান্সিং শুরু করতে কতদিন লাগবে?",
        answer: "কোর্স শেষে হাতে থাকবে ৬টি পোর্টফোলিও প্রজেক্ট, যা দিয়ে সাধারণত ১-২ মাসের মধ্যেই প্রথম ক্লায়েন্ট ধরা সম্ভব — তবে এটা নির্ভর করে আপনার প্র্যাকটিস আর কনসিস্টেন্সির উপর।",
    },
    {
        question: "মানি-ব্যাক গ্যারান্টি কীভাবে কাজ করে?",
        answer: "প্রথম ৭ দিনের মধ্যে কোর্স আপনার ভালো না লাগলে, কোনো প্রশ্ন ছাড়াই পুরো টাকা ফেরত দেওয়া হবে।",
    },
];

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(1);

    return (
        <div className="w-full py-16 md:py-24">
            <div className="mx-auto max-w-3xl px-6">
                <div className="overflow-hidden rounded-3xl border border-border/60 bg-card">
                    {FAQS.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={faq.question}
                                className={
                                    i !== 0 ? "border-t border-border/60" : ""
                                }
                            >
                                <button
                                    onClick={() =>
                                        setOpenIndex(isOpen ? null : i)
                                    }
                                    className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left sm:px-8"
                                    aria-expanded={isOpen}
                                >
                                    <span className="font-bengali text-base font-bold text-foreground sm:text-lg">
                                        {faq.question}
                                    </span>

                                    <span
                                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                                            isOpen ? "bg-primary" : "bg-muted"
                                        }`}
                                    >
                                        <motion.span
                                            animate={{
                                                rotate: isOpen ? 45 : 0,
                                            }}
                                            transition={{ duration: 0.25 }}
                                            className="flex"
                                        >
                                            <Plus
                                                className={`h-4 w-4 ${
                                                    isOpen
                                                        ? "text-primary-foreground"
                                                        : "text-foreground"
                                                }`}
                                                strokeWidth={2.5}
                                            />
                                        </motion.span>
                                    </span>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{
                                                height: 0,
                                                opacity: 0,
                                            }}
                                            animate={{
                                                height: "auto",
                                                opacity: 1,
                                            }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                ease: "easeInOut",
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <p className="font-bengali px-6 pb-6 text-sm leading-relaxed text-muted-foreground sm:px-8 sm:text-base">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
