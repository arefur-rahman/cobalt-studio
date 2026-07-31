"use client";

import { Input } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";

interface ToolSearchBarProps {
    query: string;
    onQueryChange: (value: string) => void;
}

export default function ToolSearchBar({
    query,
    onQueryChange,
}: ToolSearchBarProps) {
    return (
        <div className="mx-auto mb-12 max-w-md text-center">
            <div className="relative">
                <IconSearch
                    stroke={2}
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    placeholder="Search tools..."
                    className="h-12 w-full rounded-xl border border-border bg-card pl-11 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-0"
                />
            </div>
        </div>
    );
}
