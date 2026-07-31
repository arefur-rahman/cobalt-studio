"use client";

import { H1, P, Span } from "@/components/global/Texts";
import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarImage,
} from "@/components/ui/avatar";
import getStartDateStr from "@/lib/getClosestMondayStr";
import {
    IconArrowUpRight,
    IconAward,
    IconCircleCheckFilled,
    IconCpu,
    IconPlayerPlayFilled,
    IconStarFilled,
    IconUsers,
} from "@tabler/icons-react";
import { GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
    const ratingsAvatars = [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80",
    ];

    const stats = [
        {
            icon: <IconUsers className="size-6 text-primary" />,
            bgColor: "bg-primary/10",
            value: "700K+",
            label: "Subscribers",
        },
        {
            icon: <GraduationCap className="size-6 text-indigo-400" />,
            bgColor: "bg-indigo-500/10",
            value: "4,349+",
            label: "Students",
        },
        {
            icon: <IconAward className="size-6 text-purple-400" />,
            bgColor: "bg-purple-500/10",
            value: "3+ YRS",
            label: "Experience",
        },
        {
            icon: <IconCpu className="size-6 text-emerald-400" />,
            bgColor: "bg-emerald-500/10",
            value: "AI-DRIVEN",
            label: "Workflow",
        },
    ];

    const bulletPoints = [
        "Expert Mentors",
        "Hands-on Learning",
        "Lifetime Access",
    ];

    return (
        <div className="relative min-h-screen w-full bg-black py-20 text-white overflow-hidden flex flex-col justify-between">
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0 bg-black">
                <div
                    className="absolute inset-0 bg-cover bg-no-repeat opacity-70 md:opacity-90"
                    style={{
                        backgroundImage: "url('/hero-bg.avif')",
                        backgroundPosition: "center -8%",
                    }}
                />
                {/* Gradients to blend background & text */}
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-black/50" />
                <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/50 to-transparent md:from-black md:via-black/40 md:to-transparent" />
            </div>
            {/* Main Content Area */}
            <div className="container mx-auto px-4 md:px-8 pt-5 md:pt-28 pb-10 grow flex flex-col justify-between relative z-10">
                {/* Upper Hero Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center grow mt-4">
                    {/* Left Column: Heading and Details */}
                    <div className="lg:col-span-7 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                        {/* Enrollment Badge */}
                        <div className="flex items-center justify-center gap-2 border border-primary/30 bg-primary/5 rounded-full px-3 py-1 w-fit mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <Span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-zinc-300">
                                Enrollment is open now
                            </Span>
                        </div>

                        {/* Title Heading */}
                        <H1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight uppercase leading-[0.95] mb-6">
                            Welcome to <br />
                            the{" "}
                            <Span className="text-primary drop-shadow-[0_0_25px_rgba(86,96,242,0.3)]">
                                Future
                            </Span>
                        </H1>

                        {/* Subheading / Description */}
                        <P className="text-sm sm:text-base text-zinc-400 max-w-lg leading-relaxed mb-8">
                            Elevate your editing style and master the art of{" "}
                            <Span className="text-white font-semibold">
                                visual storytelling
                            </Span>
                            . Learn cutting-edge motion graphics and
                            post-production techniques from industry
                            professionals at{" "}
                            <Span className="text-primary font-semibold">
                                Cobalt Studio.
                            </Span>
                        </P>

                        {/* Action Buttons & Bengali date */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
                            <Link href="/enroll">
                                <button className="bg-primary hover:bg-primary/95 text-white font-semibold px-10 md:px-8 py-3 md:py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 flex items-center gap-2 group w-full sm:w-fit justify-center cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0">
                                    Enroll Now
                                    <IconArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                                </button>
                            </Link>

                            <div className="flex items-center justify-center sm:justify-start gap-2 text-[#D9A05B]">
                                <IconPlayerPlayFilled className="size-3.5" />
                                <Span className="text-sm tracking-wide">
                                    ক্লাস শুরু - {getStartDateStr()})
                                </Span>
                            </div>
                        </div>

                        {/* Overlapping User Ratings */}
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {ratingsAvatars.map((url, i) => (
                                    <AvatarGroup key={i}>
                                        <Avatar>
                                            <AvatarImage src={url} />
                                            <AvatarFallback>
                                                {i + 1}
                                            </AvatarFallback>
                                        </Avatar>
                                    </AvatarGroup>
                                ))}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                    <span className="text-white font-bold text-sm sm:text-base leading-none">
                                        4.95
                                    </span>
                                    <div className="flex items-center text-amber-500">
                                        {[...Array(5)].map((_, idx) => (
                                            <IconStarFilled
                                                key={idx}
                                                className="size-3.5"
                                            />
                                        ))}
                                    </div>
                                </div>
                                <span className="text-[11px] text-zinc-500 font-medium">
                                    300+ Trusted reviews
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Floating Software Icons (Desktop) */}
                    <div className="lg:col-span-5 relative h-[350px] lg:h-[480px] w-full lg:flex items-center justify-center select-none pointer-events-none hidden">
                        {/* Cursor AI Logo — Main Highlight */}
                        <motion.div
                            className="absolute md:right-[15%] top-[-8%] z-20 w-28 md:w-36 h-36 filter drop-shadow-[0_15px_35px_rgba(59,130,246,0.5)]"
                            animate={{
                                y: [0, -15, 0],
                                rotate: [0, 8, 0],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <Image
                                src="/cursor-ai.avif"
                                alt="Cursor AI Logo by cobalt"
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 96px, 128px"
                                priority
                            />
                        </motion.div>

                        {/* Next.js Logo — Now clear and positioned */}
                        <motion.div
                            className="absolute right-[23%] top-[40%] opacity-70 z-10 w-24 md:w-32 h-32 filter drop-shadow-[0_15px_30px_rgba(56,189,248,0.3)]"
                            animate={{
                                y: [0, 12, 0],
                                rotate: [-6, 6, -6],
                            }}
                            transition={{
                                duration: 7,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <Image
                                src="/next-logo.avif"
                                alt="Next.js Logo by cobalt"
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 112px, 144px"
                                priority
                            />
                        </motion.div>

                        {/* React Logo — Combined Spin and Pulse */}
                        <motion.div
                            className="absolute left-[-30%] opacity-70 top-[-10%] z-10 w-24 md:w-30 h-30 filter drop-shadow-[0_15px_30px_rgba(14,165,233,0.35)]"
                            animate={{
                                y: [0, -15, 0], // উপরে-নিচে ভাসবে (Pulse)
                                rotate: 360, // একটানা ঘুরবে (Spin)
                            }}
                            transition={{
                                y: {
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                },
                                rotate: {
                                    duration: 12,
                                    repeat: Infinity,
                                    ease: "linear",
                                },
                            }}
                        >
                            <Image
                                src="/react-logo.avif"
                                alt="React Logo"
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 96px, 120px"
                                priority
                            />
                        </motion.div>
                    </div>

                    {/* Floating logos (Mobile & Tablet) */}
                    <div className="lg:hidden absolute top-16 right-0 w-full h-56 select-none pointer-events-none z-10">
                        {/* Next.js logo — top right */}
                        <motion.div
                            className="absolute right-5 top-0 size-12 opacity-80 filter drop-shadow-[0_10px_22px_rgba(59,130,246,0.45)]"
                            animate={{ y: [0, -8, 0], rotate: [0, 8, 0] }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <Image
                                src="/next-logo.avif"
                                alt="Next.js Logo by cobalt"
                                fill
                                className="object-contain"
                                sizes="64px"
                                priority
                            />
                        </motion.div>

                        {/* Cursor AI — slightly below and right, now clear */}
                        <motion.div
                            className="absolute right-5 bottom-2 size-14 opacity-80 filter drop-shadow-[0_10px_20px_rgba(56,189,248,0.3)]"
                            animate={{ y: [0, 8, 0], rotate: [-6, 6, -6] }}
                            transition={{
                                duration: 7,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <Image
                                src="/cursor-ai.avif"
                                alt="Cursor AI Logo"
                                fill
                                className="object-contain"
                                sizes="80px"
                                priority
                            />
                        </motion.div>

                        {/* React — left side mobile, combined animation */}
                        <motion.div
                            className="absolute left-4 top-10 size-12 opacity-75 filter drop-shadow-[0_10px_20px_rgba(14,165,233,0.35)]"
                            animate={{
                                y: [0, -6, 0],
                                rotate: [0, 360],
                            }}
                            transition={{
                                y: {
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                },
                                rotate: {
                                    duration: 15,
                                    repeat: Infinity,
                                    ease: "linear",
                                },
                            }}
                        >
                            <Image
                                src="/react-logo.avif"
                                alt="React Logo"
                                fill
                                className="object-contain"
                                sizes="64px"
                                priority
                            />
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Section: Stat Cards & Footer Checklist */}
                <div className="mt-12 w-full">
                    {/* Stat Cards Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                className="bg-background/40 dark:bg-background/75 backdrop-blur-md border border-zinc-800/40 p-4 rounded-2xl flex items-center gap-4 hover:border-zinc-700/60 hover:bg-zinc-900/30 transition-all duration-300 shadow-xl"
                            >
                                <div
                                    className={`p-3 rounded-xl ${stat.bgColor} flex items-center justify-center shrink-0`}
                                >
                                    {stat.icon}
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-background dark:text-white font-extrabold text-base sm:text-lg leading-tight tracking-tight">
                                        {stat.value}
                                    </span>
                                    <span className="text-xs text-background/70 dark:text-zinc-400 font-medium leading-none mt-1">
                                        {stat.label}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Bullet Points */}
                    <div className="flex flex-nowrap items-center justify-center gap-3 sm:gap-6 mt-8 text-xs sm:text-sm text-zinc-400 font-medium">
                        {bulletPoints.map((point, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
                            >
                                <IconCircleCheckFilled className="size-3.5 sm:size-4 text-primary shrink-0" />
                                <span>{point}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
