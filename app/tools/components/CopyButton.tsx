import { Button } from "@/components/ui/button";
import { IconCheck, IconCopy } from "@tabler/icons-react";

interface CopyButtonProps {
    onClick: () => void;
    copied: boolean;
    disabled?: boolean;
    label?: string;
    copiedLabel?: string;
    className?: string;
}

const CopyButton = ({
    onClick,
    copied,
    disabled = false,
    label = "Copy",
    copiedLabel = "Copied",
    className = "",
}: CopyButtonProps) => {
    return (
        <Button
            variant="secondary"
            size="sm"
            onClick={onClick}
            disabled={disabled}
            className={`gap-1.5 rounded-lg ${className}`}
        >
            {copied ? (
                <>
                    <IconCheck className="h-4 w-4 text-emerald-500" stroke={2.2} />
                    {copiedLabel}
                </>
            ) : (
                <>
                    <IconCopy className="h-4 w-4" stroke={2} />
                    {label}
                </>
            )}
        </Button>
    );
};

export default CopyButton;
