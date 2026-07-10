import GradientTopBorder from "@/components/global/GradientTopBorder";
import SectionHeader from "@/components/global/SectionHeader";
import SectionSeparator from "@/components/global/SectionSeparator";
import { H3, P, Span } from "@/components/global/Texts";
import { MessageSquare, MousePointerClick, Target, Zap } from "lucide-react";

const TeachingApproach = () => {
    const methods = [
        {
            title: "Project-Based Learning",
            description:
                "ইউটিউবে শুধু টুলস পাওয়া যায়, আমরা আপনাকে দেবো রিয়েল ইন্ডাস্ট্রি প্রজেক্ট ফাইলস।",
            icon: Target,
        },
        {
            title: "Deep-Learning Module",
            description:
                "প্রিমিয়ার প্রো এবং আফটার ইফেক্টস-এর প্রতিটি টেকনিক হাতে-কলমে শেখানো হবে।",
            icon: MousePointerClick,
        },
        {
            title: "Direct Feedback",
            description:
                "আপনার করা এডিটিং-এ মেন্টর সরাসরি ভুল ধরিয়ে দেবেন এবং কারেকশন করাবেন।",
            icon: MessageSquare,
        },
        {
            title: "AI Optimization",
            description:
                "কিভাবে AI টুলস ব্যবহার করে আপনার এডিটিং স্পিড ৫ গুণ বাড়িয়ে দেবেন।",
            icon: Zap,
        },
    ];

    return (
        <SectionSeparator className="relative overflow-hidden bg-muted py-20 md:py-28">
            {/* Gradient Top Border */}
            <GradientTopBorder />
            {/* Background Glow */}
            <div className="absolute left-[-10%] top-1/2 w-[700px] h-[500px] bg-primary/25 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute right-[-10%] bottom-1/2 w-[778px] h-[500px] bg-primary/18 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left Column - Header & Timeline */}
                    <div className="lg:col-span-6 space-y-10">
                        <SectionHeader
                            title="our teaching approach"
                            subtitle="methods"
                        />

                        {/* Timeline */}
                        <div className="relative pl-2 space-y-12">
                            {methods.map((method, index) => {
                                const IconComponent = method.icon;
                                return (
                                    <div
                                        key={index}
                                        className="relative flex items-start gap-6 group"
                                    >
                                        {/* Vertical Line */}
                                        {index < methods.length - 1 && (
                                            <div className="absolute left-[23px] top-12 bottom-[-72px] w-[2px] bg-primary/20" />
                                        )}

                                        {/* Icon Container */}
                                        <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-xl border border-muted-foreground/20 bg-background shadow-sm text-primary transition-all duration-300 group-hover:border-primary/80 group-hover:bg-blue-50 shrink-0">
                                            <IconComponent className="size-5" />
                                        </div>

                                        {/* Content */}
                                        <div className="space-y-1.5 pt-1.5">
                                            <H3 className="text-lg font-bold text-foreground tracking-tight transition-colors duration-300 group-hover:text-primary">
                                                {method.title}
                                            </H3>
                                            <P className="text-sm md:text-base text-muted-foreground/80 font-normal leading-relaxed">
                                                {method.description}
                                            </P>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column - Quote Card */}
                    <div className="lg:col-span-6 flex items-center justify-center lg:pt-24 w-full">
                        <div className="relative w-full max-w-xl bg-slate-50/50 dark:bg-zinc-900/50 border-l-4 border-primary rounded-tr-2xl rounded-bl-2xl p-8 md:p-10 shadow-xl">
                            {/* Quotes Icon decoration */}
                            <div className="absolute -top-6 left-6 text-primary/15 text-[120px] font-serif leading-none select-none pointer-events-none">
                                “
                            </div>

                            <div className="space-y-6 text-foreground/90 font-medium text-lg md:text-xl leading-relaxed">
                                <P>
                                    একটা সফটওয়্যারের টুলস শেখা আর একটা{" "}
                                    <Span className="text-primary font-bold">
                                        গল্পকে কিভাবে দাড় করানো যায়;
                                    </Span>{" "}
                                    এর মাঝে আকাশ পাতাল তফাৎ আছে।
                                </P>
                                <P>
                                    টুলস ইউটিউব দেখেই শেখা যায়। কিন্তু
                                    স্টোরিটেলিং এর জন্য প্রয়োজন{" "}
                                    <Span className="text-primary font-bold">
                                        সঠিক গাইডলাইন।
                                    </Span>
                                </P>
                            </div>

                            <P className="text-xs font-semibold text-muted-foreground/70 tracking-widest uppercase mt-8">
                                — Cobalt Training Principle
                            </P>
                        </div>
                    </div>
                </div>
            </div>
        </SectionSeparator>
    );
};

export default TeachingApproach;
