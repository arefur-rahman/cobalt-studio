import { cn } from "@/lib/utils";
import React from "react";

function isBengali(text: string): boolean {
    return /[\u0980-\u09FF]/.test(text);
}

function extractTextFromNode(node: React.ReactNode): string {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(extractTextFromNode).join("");
    if (React.isValidElement(node)) {
        return extractTextFromNode(
            (node.props as { children?: React.ReactNode }).children,
        );
    }
    return "";
}

type TypographyProps = {
    children: React.ReactNode;
    className?: string;
};

function createTypography(Tag: React.ElementType) {
    return function Typography({ children, className }: TypographyProps) {
        const textContent = extractTextFromNode(children);
        const hasBengali = isBengali(textContent);

        return (
            <Tag
                className={cn(
                    hasBengali ? "font-bengali" : "font-sans",
                    className,
                )}
            >
                {children}
            </Tag>
        );
    };
}

const H1 = createTypography("h1");
const H2 = createTypography("h2");
const H3 = createTypography("h3");
const P = createTypography("p");
const Span = createTypography("span");

export { H1, H2, H3, P, Span };
