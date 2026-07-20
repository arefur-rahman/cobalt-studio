"use client";

import NavBarSticky from "@/components/global/NavBarSticky";
import { H1, P, Span } from "@/components/global/Texts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    IconAlertCircle,
    IconBrandGoogleFilled,
    IconCircleCheck,
    IconMail,
    IconPhone,
    IconUser,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [nameError, setNameError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [linkSent, setLinkSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setNameError(null);

        if (name.trim() === "") {
            setNameError("Full name is required");
            return;
        }

        setLoading(true);
        try {
            // TODO: Firebase Auth এর sendSignInLinkToEmail() এখানে বসাও
            // await sendSignInLinkToEmail(auth, email, {
            //     url: `${window.location.origin}/signup/complete`,
            //     handleCodeInApp: true,
            // });
            // window.localStorage.setItem("emailForSignIn", email);
            // window.localStorage.setItem("pendingSignupName", name);
            // window.localStorage.setItem("pendingSignupPhone", phone);
            setLinkSent(true);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "লিংক পাঠানো যায়নি — আবার চেষ্টা করুন।",
            );
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setError(null);
        setGoogleLoading(true);
        try {
            // TODO: Firebase Auth এর signInWithPopup() + GoogleAuthProvider এখানে বসাও
            // await signInWithPopup(auth, new GoogleAuthProvider());
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Google দিয়ে সাইন আপ করা যায়নি — আবার চেষ্টা করুন।",
            );
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <NavBarSticky>
            <section className="flex min-h-[85vh] w-full items-center justify-center px-6 py-16">
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
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleGoogleSignUp}
                        disabled={googleLoading}
                        className="h-12 w-full gap-2.5 rounded-xl border-border/60 bg-card text-sm font-semibold text-foreground hover:bg-accent"
                    >
                        <IconBrandGoogleFilled className="h-4 w-4" />
                        {googleLoading
                            ? "Connecting..."
                            : "Sign up with Google"}
                    </Button>

                    {/* divider */}
                    <div className="my-6 flex items-center gap-3">
                        <span className="h-px flex-1 bg-border/60" />
                        <Span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            or
                        </Span>
                        <span className="h-px flex-1 bg-border/60" />
                    </div>

                    <form
                        onSubmit={handleSubmit}
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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your Name"
                                    className={`h-12 rounded-xl bg-card pl-11 text-sm focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-0 ${
                                        nameError
                                            ? "border-destructive"
                                            : "border-border/60"
                                    }`}
                                />
                            </div>
                            {nameError && (
                                <p className="mt-1.5 text-xs font-semibold text-destructive">
                                    {nameError.toUpperCase()}
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="example@gmail.com"
                                    required
                                    className="h-12 rounded-xl border-border/60 bg-card pl-11 text-sm focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-0"
                                />
                            </div>
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
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="1XXXXXXXXX"
                                    className="h-12 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                                />
                            </div>
                        </div>

                        {linkSent && (
                            <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-3 py-2.5 text-sm text-emerald-500">
                                <IconCircleCheck
                                    className="h-4 w-4 shrink-0"
                                    stroke={2}
                                />
                                <span className="font-bengali">
                                    লিংক পাঠানো হয়েছে — ইমেইল চেক করে সাইন আপ
                                    শেষ করুন।
                                </span>
                            </div>
                        )}

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
                                className="h-12 w-full rounded-xl bg-primary text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
                            >
                                {loading
                                    ? "Sending..."
                                    : "Send Magic Link To Sign Up"}
                            </Button>

                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
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
