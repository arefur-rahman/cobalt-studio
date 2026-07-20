"use client";

import { motion } from "motion/react";

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/85 backdrop-blur-md">
            <div className="relative flex flex-col items-center gap-6">
                {/* Glowing Background Blur */}
                <div className="absolute -inset-10 -z-10 rounded-full bg-primary/10 blur-2xl" />

                {/* Animated custom loader */}
                <div className="relative flex items-center justify-center">
                    <motion.div
                        className="h-16 w-16 rounded-full border-[3px] border-primary/20 border-t-primary"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 0.85,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                    <motion.div
                        className="absolute h-10 w-10 rounded-full border-[3px] border-accent/25 border-b-accent"
                        animate={{ rotate: -360 }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                </div>

                {/* Elegant Branding Loader Text */}
                <motion.div
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="text-center"
                >
                    <span className="font-sans text-sm font-bold tracking-widest text-foreground uppercase">
                        Cobalt <span className="text-primary">Studio</span>
                    </span>
                </motion.div>
            </div>
        </div>
    );
}
