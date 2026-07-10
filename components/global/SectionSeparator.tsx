import { cn } from "@/lib/utils";

const SectionSeparator = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return <div className={cn("p-28", className)}>{children}</div>;
};

export default SectionSeparator;
