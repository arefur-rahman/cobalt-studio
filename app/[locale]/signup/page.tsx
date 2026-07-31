"use client";

import GoogleSignInBtn from "@/components/global/GoogleSignInBtn";
import NavBarSticky from "@/components/global/NavBarSticky";
import { H1, P, Span } from "@/components/global/Texts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/providers/auth-provider";
import {
    IconAlertCircle,
    IconEye,
    IconEyeOff,
    IconLock,
    IconMail,
    IconPhone,
    IconUser,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type SignupFormValues = {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
};

const Signup = () => {
    const { signUpWithEmailPasswordAndOtherCredentials, user, loading } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        getValues,
        formState: { errors },
    } = useForm<SignupFormValues>();

    if (user) {
        return null;
    }

    const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
        setError(null);
        try {
            await signUpWithEmailPasswordAndOtherCredentials(
                data.email.trim(),
                data.password.trim(),
                data.name.trim(),
                data.phone.trim(),
                "/",
            );
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something error occurred, please try again later.",
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
                            SIGN UP YOUR{" "}
                            <span className="text-primary">ACCOUNT</span>
                        </H1>
                        <P className="mt-2 text-sm text-muted-foreground">
                            Please Enter Your Details To Sign Up.
                        </P>
                    </div>

                    {/* google sign-up — at the top */}
                    <GoogleSignInBtn setError={setError} />

                    {/* divider */}
                    <div className="my-6 flex items-center gap-3">
                        <span className="h-px flex-1 bg-border/60" />
                        <Span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            or
                        </Span>
                        <span className="h-px flex-1 bg-border/60" />
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-6"
                    >
                        {/* full name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                            >
                                Full Name
                            </label>
                            <div className="relative">
                                <IconUser
                                    className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                    stroke={2}
                                />
                                <Input
                                    id="name"
                                    placeholder="Your Name"
                                    className={`h-12 rounded-xl bg-card pl-11 text-sm focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-0 ${
                                        errors.name
                                            ? "border-destructive"
                                            : "border-border/60"
                                    }`}
                                    {...register("name", {
                                        required: "Full name is required",
                                        minLength: {
                                            value: 2,
                                            message:
                                                "Name must be at least 2 characters",
                                        },
                                    })}
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-1.5 text-xs font-semibold text-destructive">
                                    {errors.name.message
                                        ?.toString()
                                        .toUpperCase()}
                                </p>
                            )}
                        </div>

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

                        {/* phone */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                            >
                                Phone Number
                            </label>
                            <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card px-4">
                                <span className="text-lg leading-none">🇧🇩</span>
                                <span className="font-mono text-sm text-foreground">
                                    +880
                                </span>
                                <span className="h-5 w-px bg-border/60" />
                                <IconPhone
                                    className="h-4 w-4 text-muted-foreground"
                                    stroke={2}
                                />
                                <input
                                    id="phone"
                                    type="tel"
                                    placeholder="01XXXXXXXXX"
                                    className="h-12 flex-1 bg-transparent text-sm text-foreground outline-none"
                                    {...register("phone", {
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^01[3-9]\d{8}$/,
                                            message:
                                                "Enter a valid BD number (e.g. 01XXXXXXXXX)",
                                        },
                                    })}
                                />
                            </div>
                            {errors.phone && (
                                <p className="mt-1.5 text-xs font-semibold text-destructive">
                                    {errors.phone.message
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
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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

                        {/* confirm password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <IconLock
                                    className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                                    stroke={2}
                                />
                                <Input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="••••••••••••"
                                    className={`h-12 rounded-xl bg-card pl-11 pr-11 text-sm focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-0 ${
                                        errors.confirmPassword
                                            ? "border-destructive"
                                            : "border-border/60"
                                    }`}
                                    {...register("confirmPassword", {
                                        required:
                                            "Please confirm your password",
                                        validate: (value) =>
                                            value === getValues("password") ||
                                            "Passwords do not match",
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword((v) => !v)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    aria-label={
                                        showConfirmPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showConfirmPassword ? (
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
                            {errors.confirmPassword && (
                                <p className="mt-1.5 text-xs font-semibold text-destructive">
                                    {errors.confirmPassword.message
                                        ?.toString()
                                        .toUpperCase()}
                                </p>
                            )}
                        </div>

                        {/* submit */}
                        <div className="flex flex-col items-center gap-3">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="h-12 w-full rounded-xl bg-primary text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
                            >
                                {loading ? "Signing up..." : "Sign Up"}
                            </Button>

                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Already have an account?{" "}
                                <Link
                                    href="/signin"
                                    className="text-primary hover:underline"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </form>
                </motion.div>
            </section>
        </NavBarSticky>
    );
};

export default Signup;
