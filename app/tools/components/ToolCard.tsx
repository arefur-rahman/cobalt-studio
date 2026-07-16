"use client";

import { motion } from "motion/react";
import Link from "next/link";

export type Tool = {
    slug: string;
    icon: React.ComponentType<{
        className?: string;
        stroke?: number;
        size?: number | string;
    }>;
    title: string;
    description: string;
};

interface ToolCardProps {
    tool: Tool;
    index: number;
}

export default function ToolCard({ tool, index }: ToolCardProps) {
    const { slug, icon: Icon, title, description } = tool;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: index * 0.05,
            }}
        >
            <Link
                href={`/tools/${slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
            >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                    <Icon className="h-6 w-6 text-primary" stroke={1.8} />
                </div>

                <h3 className="font-bengali mt-5 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                    {title}
                </h3>
                <p className="font-bengali mt-2 text-sm leading-relaxed text-muted-foreground">
                    {description}
                </p>
            </Link>
        </motion.div>
    );
}
