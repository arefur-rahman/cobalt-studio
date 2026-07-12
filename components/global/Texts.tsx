import { cn } from "@/lib/utils";
import React, {
    cloneElement,
    createElement,
    isValidElement,
    type ElementType,
    type ReactNode,
} from "react";

const BENGALI_RUN = /[\u0980-\u09FF]+|[^\u0980-\u09FF]+/g;

function isBengaliChar(ch: string): boolean {
    return /[\u0980-\u09FF]/.test(ch);
}

// Splits a string into Bengali/non-Bengali runs and wraps each in a span with the right font class
function renderTextWithFonts(text: string, keyPrefix: string): ReactNode[] {
    const matches = text.match(BENGALI_RUN);
    if (!matches) return [text];

    return matches.map((chunk, i) => (
        <span
            key={`${keyPrefix}-${i}`}
            className={isBengaliChar(chunk) ? "font-bengali" : "font-sans"}
        >
            {chunk}
        </span>
    ));
}

// Recursively walks the children tree: splits string nodes by font,
// and recurses into nested elements (e.g. <Span>) to process their children too

function processChildren(node: ReactNode, keyPrefix = "t"): ReactNode {
    if (node == null || typeof node === "boolean") return node;

    if (typeof node === "string" || typeof node === "number") {
        return renderTextWithFonts(String(node), keyPrefix);
    }

    if (Array.isArray(node)) {
        return React.Children.map(node, (child, i) =>
            processChildren(child, `${keyPrefix}-${i}`),
        );
    }

    if (isValidElement(node)) {
        const children = (node.props as { children?: ReactNode }).children;

        return cloneElement(
            node,
            { key: node.key ?? keyPrefix },
            processChildren(children, keyPrefix),
        );
    }

    return node;
}

type TypographyProps = {
    children: ReactNode;
    className?: string;
};

function createTypography(tag: ElementType) {
    return function Typography({ children, className }: TypographyProps) {
        return createElement(
            tag,
            { className: cn(className) },
            processChildren(children),
        );
    };
}

const H1 = createTypography("h1");
const H2 = createTypography("h2");
const H3 = createTypography("h3");
const P = createTypography("p");
const Span = createTypography("span");

export { H1, H2, H3, P, Span };
