"use client";

import { IconArrowUpSquareFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={`
                fixed bottom-8 right-8 z-50
                size-12 rounded-full
                flex items-center justify-center
                bg-primary text-primary-foreground
                shadow-lg shadow-primary/30
                border border-primary/20
                transition-all duration-300 ease-out
                hover:scale-110 hover:shadow-xl hover:shadow-primary/40
                active:scale-95
                ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}
            `}
        >
            <IconArrowUpSquareFilled className="size-6" />
        </button>
    );
}
