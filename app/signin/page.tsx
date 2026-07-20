"use client";

import GoogleSignInBtn from "@/components/global/GoogleSignInBtn";
import NavBarSticky from "@/components/global/NavBarSticky";
import { H1, P, Span } from "@/components/global/Texts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingScreen from "@/components/global/LoadingScreen";
import { useAuth } from "@/providers/auth-provider";
import {
    IconAlertCircle,
    IconEye,
    IconEyeOff,
    IconLock,
    IconMail,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type SigninFormValues = {
    email: string;
    password: string;
};

const SignIn = () => {
    const { signInWithEmailPassword, user, loading } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/");
            router.refresh();
        }
    }, [user, router]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SigninFormValues>();

    if (loading || user) {
        return <LoadingScreen />;
    }

    const onSubmit: SubmitHandler<SigninFormValues> = async (data) => {
        setError(null);
        try {
            await signInWithEmailPassword(
                data.email.trim(),
                data.password.trim(),
                "/",
            );
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong, please try again later.",
            );
        }
    };

    return (
        <NavBarSticky>
            <section className="flex min-h-[85vh] w-full items-center justify-center px-6 py-16 mt-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full max-w-md"
                >
                    {/* heading */}
                    <div className="mb-10 text-center">
                        <H1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                            WELCOME <Span className="text-primary">BACK</Span>
                        </H1>
                        <P className="mt-2 text-sm text-muted-foreground">
                            Please Enter Your Details To Sign In.
                        </P>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-6"
                    >
                        {/* email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <IconMail
                                    className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                    stroke={2}
                                />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="example@gmail.com"
                                    className={`h-12 rounded-xl bg-card pl-11 text-sm focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-0 ${
                                        errors.email
                                            ? "border-destructive"
                                            : "border-border/60"
                                    }`}
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message:
                                                "Enter a valid email address",
                                        },
                                    })}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1.5 text-xs font-semibold text-destructive">
                                    {errors.email.message
                                        ?.toString()
                                        .toUpperCase()}
                                </p>
                            )}
                        </div>

                        {/* password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <IconLock
                                    className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                    stroke={2}
                                />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••••••"
                                    className={`h-12 rounded-xl bg-card pl-11 pr-11 text-sm focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-0 ${
                                        errors.password
                                            ? "border-destructive"
                                            : "border-border/60"
                                    }`}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message:
                                                "Password must be at least 6 characters",
                                        },
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <IconEyeOff
                                            className="h-4 w-4"
                                            stroke={2}
                                        />
                                    ) : (
                                        <IconEye
                                            className="h-4 w-4"
                                            stroke={2}
                                        />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1.5 text-xs font-semibold text-destructive">
                                    {errors.password.message
                                        ?.toString()
                                        .toUpperCase()}
                                </p>
                            )}
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive">
                                <IconAlertCircle
                                    className="h-4 w-4 shrink-0"
                                    stroke={2}
                                />
                                <span className="font-bengali">{error}</span>
                            </div>
                        )}

                        {/* submit */}
                        <div className="flex flex-col items-center gap-3">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="h-12 w-full rounded-xl bg-primary text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 cursor-pointer"
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </Button>
                        </div>
                    </form>

                    {/* divider */}
                    <div className="my-6 flex items-center gap-3">
                        <span className="h-px flex-1 bg-border/60" />
                        <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            OR
                        </span>
                        <span className="h-px flex-1 bg-border/60" />
                    </div>

                    {/* google sign-in */}
                    <GoogleSignInBtn setError={setError} />
                    <P className="mt-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Don&apos;t have access?{" "}
                        <Link
                            href="/signup"
                            className="text-primary hover:underline"
                        >
                            Create Account
                        </Link>
                    </P>
                </motion.div>
            </section>
        </NavBarSticky>
    );
};

export default SignIn;
