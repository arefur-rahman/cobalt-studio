"use client";

import { useEffect, useState } from "react";
import TopNav from "./TopNav";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Run once on mount to handle initial state
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 h-12 md:h-16 flex items-center group ${
                isScrolled
                    ? "header-scrolled bg-transparent backdrop-blur-md border-b border-zinc-800/40 shadow-lg"
                    : "bg-transparent border-b border-transparent"
            }`}
        >
            <TopNav isScrolled={isScrolled} />
        </header>
    );
};

export default Header;
