import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Span } from "./Texts";

interface PillBadgeProps extends HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
}

const PillBadge = ({ children, className, ...props }: PillBadgeProps) => {
    return (
        <Span
            className={cn(
                "text-primary text-xs font-bold uppercase border border-primary/40 bg-primary/20 px-4 py-1.5 rounded-full inline-block",
                className,
            )}
            {...props}
        >
            {children}
        </Span>
    );
};

export default PillBadge;
