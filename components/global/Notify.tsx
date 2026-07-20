"use client";

import {
    IconAlertTriangle,
    IconCircleCheck,
    IconCircleX,
    IconInfoCircle,
    IconLoader2,
    IconX,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { Toaster as SonnerToaster, toast } from "sonner";

// ---------- <Toaster /> — drop this once in app/layout.tsx ----------

export function Toaster() {
    const { resolvedTheme } = useTheme();

    return (
        <SonnerToaster
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            position="bottom-right"
            gap={10}
            toastOptions={{
                unstyled: true,
                classNames: {
                    toast: "!bg-transparent !shadow-none !border-none !p-0 !w-full",
                },
            }}
        />
    );
}

// ---------- shared card shell for every toast variant ----------

type ToastVariant = "success" | "error" | "info" | "warning" | "loading";

const VARIANT_CONFIG: Record<
    ToastVariant,
    {
        icon: React.ComponentType<{ className?: string; stroke?: number }>;
        color: string;
        bar: string;
    }
> = {
    success: {
        icon: IconCircleCheck,
        color: "text-emerald-500 bg-emerald-500/10",
        bar: "bg-emerald-500",
    },
    error: {
        icon: IconCircleX,
        color: "text-destructive bg-destructive/10",
        bar: "bg-destructive",
    },
    info: {
        icon: IconInfoCircle,
        color: "text-primary bg-primary/10",
        bar: "bg-primary",
    },
    warning: {
        icon: IconAlertTriangle,
        color: "text-amber-500 bg-amber-500/10",
        bar: "bg-amber-500",
    },
    loading: {
        icon: IconLoader2,
        color: "text-primary bg-primary/10",
        bar: "bg-primary",
    },
};

function ToastCard({
    id,
    variant,
    title,
    description,
    duration,
}: {
    id: string | number;
    variant: ToastVariant;
    title: string;
    description?: string;
    duration: number;
}) {
    const { icon: Icon, color, bar } = VARIANT_CONFIG[variant];

    return (
        <div className="relative flex w-full max-w-sm items-start gap-3 overflow-hidden rounded-2xl border border-border/60 bg-card p-4 shadow-lg shadow-black/5">
            <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${color}`}
            >
                <Icon
                    className={`h-5 w-5 ${variant === "loading" ? "animate-spin" : ""}`}
                    stroke={2}
                />
            </div>

            <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-sm font-semibold text-foreground">{title}</p>
                {description && (
                    <p className="font-bengali mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>

            {variant !== "loading" && (
                <button
                    onClick={() => toast.dismiss(id)}
                    className="shrink-0 rounded-md p-1 text-muted-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="Dismiss"
                >
                    <IconX className="h-3.5 w-3.5" stroke={2} />
                </button>
            )}

            {/* auto-dismiss progress bar */}
            {variant !== "loading" && duration > 0 && (
                <span
                    className={`absolute bottom-0 left-0 h-0.5 ${bar} animate-toast-progress`}
                    style={{ animationDuration: `${duration}ms` }}
                />
            )}
        </div>
    );
}

// ---------- public API ----------

const DEFAULT_DURATION = 4000;

function showToast(
    variant: ToastVariant,
    title: string,
    description?: string,
    duration = DEFAULT_DURATION,
) {
    return toast.custom(
        (id) => (
            <ToastCard
                id={id}
                variant={variant}
                title={title}
                description={description}
                duration={duration}
            />
        ),
        { duration },
    );
}

export const notify = {
    success: (title: string, description?: string) =>
        showToast("success", title, description),
    error: (title: string, description?: string) =>
        showToast("error", title, description),
    info: (title: string, description?: string) =>
        showToast("info", title, description),
    warning: (title: string, description?: string) =>
        showToast("warning", title, description),

    loading: (title: string, description?: string) =>
        showToast("loading", title, description, 0),

    // wraps an async action: shows a loading toast, then swaps to success/error
    promise: <T,>(
        promise: Promise<T>,
        messages: {
            loading: string;
            success: string | ((data: T) => string);
            error: string | ((err: unknown) => string);
        },
    ) => {
        const id = showToast("loading", messages.loading, undefined, 0);

        promise
            .then((data) => {
                const title =
                    typeof messages.success === "function"
                        ? messages.success(data)
                        : messages.success;
                toast.dismiss(id);
                showToast("success", title);
            })
            .catch((err) => {
                const title =
                    typeof messages.error === "function"
                        ? messages.error(err)
                        : messages.error;
                toast.dismiss(id);
                showToast("error", title);
            });

        return promise;
    },

    dismiss: (id?: string | number) => toast.dismiss(id),
};
