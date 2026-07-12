"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// next-themes injects a <script> tag for FOUC prevention which React 19 warns about.
// This is a known false positive — the script runs correctly on the server.
// Suppress the warning until next-themes ships an official fix.
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    const orig = console.error;
    console.error = (...args: unknown[]) => {
        if (
            typeof args[0] === "string" &&
            args[0].includes("Encountered a script tag")
        ) {
            return;
        }
        orig.apply(console, args);
    };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
            {children}
        </NextThemesProvider>
    );
}
