import { cn } from "@/lib/utils";

function isBengali(text: string): boolean {
    return /[\u0980-\u09FF]/.test(text);
}

function H1({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <h1
            className={cn(
                isBengali(children as string) ? "font-bengali" : "font-sans",
                className,
            )}
        >
            {children}
        </h1>
    );
}

function H2({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <h2
            className={cn(
                isBengali(children as string) ? "font-bengali" : "font-sans",
                className,
            )}
        >
            {children}
        </h2>
    );
}
function H3({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <h3
            className={cn(
                isBengali(children as string) ? "font-bengali" : "font-sans",
                className,
            )}
        >
            {children}
        </h3>
    );
}

function P({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <p
            className={cn(
                isBengali(children as string) ? "font-bengali" : "font-sans",
                className,
            )}
        >
            {children}
        </p>
    );
}

function Span({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <span
            className={cn(
                isBengali(children as string) ? "font-bengali" : "font-sans",
                className,
            )}
        >
            {children}
        </span>
    );
}

export { H1, H2, H3, P, Span };
