"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Span } from "@/components/global/Texts";

interface TimeRemaining {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function getTargetDate() {
    const now = new Date();
    const target = new Date(now);
    const currentDay = now.getDay();

    // Monday is day 1. Calculate days to add to get to next Monday.
    let daysToAdd = (1 - currentDay + 7) % 7;

    // If today is Monday but we are already past 11:59:59 PM, count to next Monday.
    if (daysToAdd === 0) {
        const todayMidnight = new Date(now);
        todayMidnight.setHours(23, 59, 59, 999);
        if (now.getTime() > todayMidnight.getTime()) {
            daysToAdd = 7;
        }
    }

    target.setDate(now.getDate() + daysToAdd);
    target.setHours(23, 59, 59, 999);
    return target.getTime();
}

function calculateTime(targetTime: number) {
    const now = new Date().getTime();
    const difference = targetTime - now;

    if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
}

export default function CountdownTimer() {
    const mounted = useSyncExternalStore(
        emptySubscribe,
        getClientSnapshot,
        getServerSnapshot,
    );
    const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() => {
        if (typeof window === "undefined") {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return calculateTime(getTargetDate());
    });

    useEffect(() => {
        const targetTime = getTargetDate();
        const interval = setInterval(() => {
            setTimeLeft(calculateTime(targetTime));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!mounted) {
        // Skeleton placeholder to prevent shift and match structure
        return (
            <div className="flex gap-3 md:gap-4 justify-center items-center py-4">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="flex flex-col items-center justify-center w-14 h-18 md:w-22 md:h-26 rounded-2xl border border-border/40 bg-card animate-pulse"
                    />
                ))}
            </div>
        );
    }

    const timeUnits = [
        { label: "দিন", value: timeLeft.days, labelEn: "Days" },
        { label: "ঘণ্টা", value: timeLeft.hours, labelEn: "Hours" },
        { label: "মিনিট", value: timeLeft.minutes, labelEn: "Mins" },
        { label: "সেকেন্ড", value: timeLeft.seconds, labelEn: "Secs" },
    ];

    return (
        <div className="flex flex-col items-center gap-4 py-4 w-full select-none">
            <style>{`
                @keyframes natural-blink {
                    0% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.15; transform: scale(0.85); }
                    100% { opacity: 1; transform: scale(1); }
                }
                .animate-natural-blink {
                    animation: natural-blink 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
            `}</style>
            <div className="flex gap-3 sm:gap-4 md:gap-6 justify-center items-center">
                {timeUnits.map((unit, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 sm:gap-4"
                    >
                        <div className="relative flex flex-col items-center justify-center w-14 h-18 sm:w-16 sm:h-20 md:w-22 md:h-26 rounded-2xl border border-border/50 bg-card/60 dark:bg-zinc-900/50 backdrop-blur-md shadow-sm transition-all duration-300 hover:border-primary/30 group overflow-hidden">
                            {/* Accent highlight top bar */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary/40 to-primary rounded-t-2xl opacity-80 group-hover:opacity-100 transition-opacity" />

                            {/* Main digit counter */}
                            <Span className="text-xl sm:text-2xl md:text-4xl font-bold font-mono tracking-tight text-foreground/90 tabular-nums">
                                {String(unit.value).padStart(2, "0")}
                            </Span>

                            {/* Label */}
                            <div className="flex flex-col items-center mt-1">
                                {/* Bengali label (labelBn) preserved for future tasks:
                                <Span className="text-[10px] sm:text-xs font-semibold text-primary/80">
                                    {unit.label}
                                </Span>
                                */}
                                <Span className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                                    {unit.labelEn}
                                </Span>
                            </div>
                        </div>

                        {/* Colon separator */}
                        {index < timeUnits.length - 1 && (
                            <div 
                                key={`colon-${index}-${timeUnits[index + 1].value}`}
                                className="flex flex-col gap-1.5 justify-center items-center h-full animate-natural-blink"
                            >
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary/60" />
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary/60" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
