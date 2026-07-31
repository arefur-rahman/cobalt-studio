"use client";

import { BookOpen, GraduationCap, PlayCircle, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";

interface StudentDashboardProps {
    userName?: string;
    enrolledCount?: number;
    inProgressCount?: number;
    completedCount?: number;
    isEmailVerified?: boolean;
    onVerifyEmail?: () => void;
    onBrowseCourses?: () => void;
}

const StudentDashboardMain = ({
    userName = "MD Arefur Rahman Khan",
    enrolledCount = 0,
    inProgressCount = 0,
    completedCount = 0,
    isEmailVerified = false,
    onVerifyEmail,
    onBrowseCourses,
}: StudentDashboardProps) => {
    const stats = [
        {
            id: "enrolled",
            label: "Enrolled",
            value: enrolledCount,
            icon: BookOpen,
            iconBg: "bg-destructive/10 text-destructive dark:bg-destructive/20",
        },
        {
            id: "in-progress",
            label: "In Progress",
            value: inProgressCount,
            icon: PlayCircle,
            iconBg: "bg-destructive/10 text-destructive dark:bg-destructive/20",
        },
        {
            id: "completed",
            label: "Completed",
            value: completedCount,
            icon: GraduationCap,
            iconBg: "bg-destructive/10 text-destructive dark:bg-destructive/20",
        },
    ];

    return (
        <section className="w-full max-w-7xl mx-auto space-y-6 p-4 md:p-6 font-sans">
            {/* Header Section */}
            <header className="space-y-1">
                <div className="flex items-center gap-2 text-foreground font-semibold text-lg md:text-xl">
                    <GraduationCap className="w-5 h-5" />
                    <h1>Student Dashboard</h1>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">
                    Welcome back{" "}
                    <span className="font-medium text-foreground">
                        {userName}
                    </span>
                    ! Let&apos;s start!
                </p>
            </header>

            {/* Email Verification Banner */}
            {!isEmailVerified && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative w-full rounded-xl border border-amber-500/30 bg-amber-500/10 dark:bg-amber-950/20 p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-full bg-amber-500 text-white dark:bg-amber-600 shrink-0">
                            <ShieldAlert className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-foreground text-base md:text-lg">
                                Email verification required!
                            </h3>
                            <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                                Unlock the full learning experience, keep your
                                account secure.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onVerifyEmail}
                        className="w-full sm:w-auto px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500 text-amber-950 dark:text-amber-50 font-semibold text-xs md:text-sm transition-colors cursor-pointer text-center whitespace-nowrap"
                    >
                        Verify Now
                    </button>
                </motion.div>
            )}

            {/* Stats Cards Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.id}
                            whileHover={{ y: -2 }}
                            className="relative p-5 md:p-6 rounded-xl border border-border bg-card text-card-foreground shadow-2xs flex items-center justify-between"
                        >
                            <div className="space-y-2">
                                <span className="text-xs md:text-sm font-medium text-muted-foreground">
                                    {stat.label}
                                </span>
                                <p className="text-3xl md:text-4xl font-extrabold text-foreground">
                                    {stat.value}
                                </p>
                            </div>
                            <div className={`p-3 rounded-xl ${stat.iconBg}`}>
                                <Icon className="w-6 h-6" />
                            </div>
                        </motion.div>
                    );
                })}
            </section>

            {/* Empty State / Course Content Container */}
            <section className="w-full min-h-75 md:min-h-90 rounded-xl border border-dashed border-border bg-card/50 dark:bg-card/20 p-8 flex flex-col items-center justify-center text-center">
                <div className="p-4 rounded-2xl bg-muted/50 mb-3 text-muted-foreground/60">
                    <BookOpen className="w-10 h-10 stroke-[1.5]" />
                </div>
                <p className="text-xs md:text-sm text-muted-foreground mb-4">
                    No courses enrolled yet
                </p>
                <button
                    onClick={onBrowseCourses}
                    className="px-5 py-2.5 rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium text-xs md:text-sm transition-colors cursor-pointer shadow-2xs"
                >
                    Browse Courses
                </button>
            </section>
        </section>
    );
};

export default StudentDashboardMain;
