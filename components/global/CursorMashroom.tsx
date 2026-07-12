"use client";

import { useEffect, useState } from "react";
import SplashCursor from "../ui/SplashCursor";

const CursorMashroom = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Disable cursor effect on mobile to improve touch UX
    if (isMobile) return null;

    return (
        <SplashCursor
            DENSITY_DISSIPATION={3.5}
            VELOCITY_DISSIPATION={2}
            PRESSURE={0.1}
            CURL={3}
            SPLAT_RADIUS={0.2}
            SPLAT_FORCE={6000}
            COLOR_UPDATE_SPEED={10}
            SHADING
            RAINBOW_MODE={false}
            COLOR="#02091C"
        />
    );
};

export default CursorMashroom;
