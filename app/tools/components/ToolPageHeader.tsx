import { type ComponentType } from "react";

interface ToolPageHeaderProps {
    icon: ComponentType<{ className?: string; stroke?: number }>;
    title: string;
    description: string;
}

const ToolPageHeader = ({ icon: Icon, title, description }: ToolPageHeaderProps) => {
    return (
        <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Icon className="h-7 w-7 text-primary" stroke={1.8} />
            </div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                {title}
            </h1>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
                {description}
            </p>
        </div>
    );
};

export default ToolPageHeader;
