import { cn } from "@/lib/utils";

const SectionSeparator = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("px-6 py-12 md:p-28", className)}>{children}</div>
    );
};

export default SectionSeparator;
