import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

const BackNavigation = () => {
    return (
        <Link
            href="/tools"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
            <IconArrowLeft className="h-4 w-4" stroke={2} />
            Go Back
        </Link>
    );
};

export default BackNavigation;
