import GradientTopBorder from "@/components/global/GradientTopBorder";
import SectionHeader from "@/components/global/SectionHeader";
import SectionSeparator from "@/components/global/SectionSeparator";
import { H3, P, Span } from "@/components/global/Texts";
import { MessageSquare, MousePointerClick, Target, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

const TeachingApproach = () => {
    const translation = useTranslations("Home.teachingApproach");

    const methods = [
        {
            title: translation("projectBasedLearning"),
            description: translation("projectBasedLearningDescription"),
            icon: Target,
        },
        {
            title: translation("deepDiving"),
            description: translation("deepDivingDescription"),
            icon: MousePointerClick,
        },
        {
            title: translation("codeReview"),
            description: translation("codeReviewDescription"),
            icon: MessageSquare,
        },
        {
            title: translation("ai"),
            description: translation("aiDescription"),
            icon: Zap,
        },
    ];

    return (
        <SectionSeparator className="relative overflow-hidden bg-muted py-20 md:py-28">
            {/* Gradient Top Border */}
            <GradientTopBorder />
            {/* Background Glow */}
            <div className="absolute left-[-10%] top-1/2 w-175 h-125 bg-primary/25 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="absolute right-[-10%] bottom-1/2 w-194.5 h-125 bg-primary/18 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Left Column - Header & Timeline */}
                    <div className="lg:col-span-6 space-y-10">
                        <SectionHeader
                            title={translation("title")}
                            titlePrimary={translation("titlePrimary")}
                            subtitle={translation("subTitle")}
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
                                            <div className="absolute left-5.75 top-12 -bottom-18 w-0.5 bg-primary/20" />
                                        )}

                                        {/* Icon Container */}
                                        <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-xl border border-muted-foreground/20 bg-background shadow-sm text-primary transition-all duration-300 group-hover:border-primary/80 group-hover:dark:border-transparent group-hover:bg-blue-50 group-hover:dark:bg-background group-hover:dark:text-white shrink-0">
                                            <IconComponent className="size-5" />
                                        </div>

                                        {/* Content */}
                                        <div className="space-y-1.5 pt-1.5">
                                            <H3 className="text-lg font-bold text-foreground tracking-tight transition-colors duration-300 group-hover:text-primary">
                                                {method.title}
                                            </H3>
                                            <P className="text-sm md:text-base text-muted-foreground/80 dark:text-zinc-300/70 leading-relaxed">
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
                            {/* Decorative Quote Mark */}
                            <div className="absolute -top-6 left-6 text-primary/15 text-[120px] font-serif leading-none select-none pointer-events-none">
                                “
                            </div>

                            <div className="space-y-6 text-foreground/90 font-medium text-lg md:text-xl leading-relaxed">
                                <P>
                                    {translation("quote.paragraph1.text1")}
                                    <Span className="text-primary font-bold">
                                        {translation(
                                            "quote.paragraph1.highlight",
                                        )}
                                    </Span>
                                    {translation("quote.paragraph1.text2")}
                                </P>
                                <P>
                                    {translation("quote.paragraph2.text1")}
                                    <Span className="text-primary font-bold">
                                        {translation(
                                            "quote.paragraph2.highlight",
                                        )}
                                    </Span>
                                    {translation("quote.paragraph2.text2")}
                                </P>
                            </div>

                            <P className="text-xs font-semibold text-muted-foreground/70 tracking-widest uppercase mt-8">
                                — {translation("quote.author")}
                            </P>
                        </div>
                    </div>
                </div>
            </div>
        </SectionSeparator>
    );
};

export default TeachingApproach;
