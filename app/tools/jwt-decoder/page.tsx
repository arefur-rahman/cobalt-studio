"use client";

import NavBarSticky from "@/components/global/NavBarSticky";
import { Button } from "@/components/ui/button";
import {
    IconAlertCircle,
    IconArrowUp,
    IconCheck,
    IconClock,
    IconCopy,
    IconKey,
    IconWand,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import BackNavigation from "../components/BackNavigation";

// ---------- JWT decoding (pure utility, outside component) ----------

// JWT uses base64URL (- and _ instead of + and /, no padding)
function base64UrlDecode(segment: string): string {
    const base64 = segment.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
        base64.length + ((4 - (base64.length % 4)) % 4),
        "=",
    );
    return atob(padded);
}

type DecodedJwt = {
    header: Record<string, unknown>;
    payload: Record<string, unknown>;
    signature: string;
};

// claim keys that are unix-seconds timestamps per the JWT spec (RFC 7519)
const TIME_CLAIMS = ["iat", "exp", "nbf"] as const;

function decodeJwt(token: string): DecodedJwt {
    const parts = token.trim().split(".");
    if (parts.length !== 3) {
        throw new Error(
            "সঠিক JWT না — তিনটা অংশ (header.payload.signature) থাকা লাগবে।",
        );
    }
    const [headerB64, payloadB64, signature] = parts;

    let header: Record<string, unknown>;
    let payload: Record<string, unknown>;
    try {
        header = JSON.parse(base64UrlDecode(headerB64));
    } catch {
        throw new Error("Header ডিকোড করা যাচ্ছে না — invalid base64/JSON।");
    }
    try {
        payload = JSON.parse(base64UrlDecode(payloadB64));
    } catch {
        throw new Error("Payload ডিকোড করা যাচ্ছে না — invalid base64/JSON।");
    }

    return { header, payload, signature };
}

function formatClaimValue(key: string, value: unknown): string {
    if (
        (TIME_CLAIMS as readonly string[]).includes(key) &&
        typeof value === "number"
    ) {
        return `${value}  (${new Date(value * 1000).toUTCString()})`;
    }
    return JSON.stringify(value);
}

// ---------- JWT generation (HS256, via Web Crypto — runs entirely client-side) ----------

function base64UrlEncodeString(str: string): string {
    return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlEncodeBytes(bytes: Uint8Array): string {
    const binary = Array.from(bytes)
        .map((b) => String.fromCharCode(b))
        .join("");
    return base64UrlEncodeString(binary);
}

async function signHS256(
    headerObj: Record<string, unknown>,
    payloadObj: Record<string, unknown>,
    secret: string,
): Promise<string> {
    const encoder = new TextEncoder();
    const headerPart = base64UrlEncodeString(JSON.stringify(headerObj));
    const payloadPart = base64UrlEncodeString(JSON.stringify(payloadObj));
    const signingInput = `${headerPart}.${payloadPart}`;

    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"],
    );
    const signatureBuffer = await crypto.subtle.sign(
        "HMAC",
        key,
        encoder.encode(signingInput),
    );
    const signaturePart = base64UrlEncodeBytes(new Uint8Array(signatureBuffer));

    return `${signingInput}.${signaturePart}`;
}

const DEFAULT_GEN_PAYLOAD = () =>
    JSON.stringify(
        {
            sub: "1234567890",
            name: "Aref",
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 3600,
        },
        null,
        2,
    );

// which field's "Copied" checkmark is currently showing — one state
// instead of three separate booleans
type CopiedField = "header" | "payload" | "token" | null;

// the generator's async lifecycle, collapsed into one tagged union so
// loading/success/error can never contradict each other
type GenState =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success"; token: string }
    | { status: "error"; message: string };

// ---------- Component ----------

const JwtDecoder = () => {
    const [input, setInput] = useState("");
    const [now] = useState(() => Date.now());
    const [copiedField, setCopiedField] = useState<CopiedField>(null);

    const [genPayload, setGenPayload] = useState(DEFAULT_GEN_PAYLOAD);
    const [genSecret, setGenSecret] = useState("your-256-bit-secret");
    const [genState, setGenState] = useState<GenState>({ status: "idle" });

    const handleCopy = (text: string, field: CopiedField) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 1500);
    };

    const handleGenerate = async () => {
        setGenState({ status: "loading" });
        try {
            const payloadObj = JSON.parse(genPayload);
            const token = await signHS256(
                { alg: "HS256", typ: "JWT" },
                payloadObj,
                genSecret || "secret",
            );
            setGenState({ status: "success", token });
        } catch (err) {
            setGenState({
                status: "error",
                message:
                    err instanceof Error
                        ? err.message
                        : "Token generate করা যায়নি — payload valid JSON কিনা চেক করুন।",
            });
        }
    };

    const handleLoadIntoDecoder = () => {
        if (genState.status !== "success") return;
        setInput(genState.token);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const result = useMemo(() => {
        if (input.trim() === "") {
            return {
                data: null as DecodedJwt | null,
                error: null as string | null,
            };
        }
        try {
            return { data: decodeJwt(input), error: null as string | null };
        } catch (err) {
            return {
                data: null as DecodedJwt | null,
                error: err instanceof Error ? err.message : "Invalid token",
            };
        }
    }, [input]);

    const expiryStatus = useMemo(() => {
        const exp = result.data?.payload?.exp;
        if (typeof exp !== "number") return null;
        const isExpired = now >= exp * 1000;
        return {
            isExpired,
            date: new Date(exp * 1000),
        };
    }, [now, result.data?.payload?.exp]);

    return (
        <NavBarSticky>
            <section className="w-full py-16 md:py-24">
                <div className="mx-auto max-w-4xl px-6">
                    {/* back navigation */}
                    <BackNavigation />

                    {/* header */}
                    <div className="mb-10 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                            <IconKey
                                className="h-7 w-7 text-primary"
                                stroke={1.8}
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                            JWT Decoder
                        </h1>
                        <p className="font-bengali mx-auto mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
                            JWT token পেস্ট করুন — header আর payload সাথে সাথে
                            ডিকোড হয়ে যাবে, কোনো সার্ভারে পাঠানো হয় না।
                        </p>
                    </div>

                    {/* input card */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm sm:p-6"
                    >
                        <label
                            htmlFor="jwt-input"
                            className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                        >
                            Encoded Token
                        </label>
                        <textarea
                            id="jwt-input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            spellCheck={false}
                            placeholder="xxxxx.yyyyy.zzzzz"
                            className={`h-28 w-full resize-none rounded-xl border bg-background p-4 font-mono text-xs text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30 sm:text-sm ${
                                result.error
                                    ? "border-destructive"
                                    : "border-border/60"
                            }`}
                        />
                        {result.error && (
                            <div className="mt-3 flex items-center gap-2 text-sm text-destructive">
                                <IconAlertCircle
                                    className="h-4 w-4 shrink-0"
                                    stroke={2}
                                />
                                <span className="font-bengali">
                                    {result.error}
                                </span>
                            </div>
                        )}
                    </motion.div>

                    {/* expiry banner */}
                    {expiryStatus && (
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                ease: "easeOut",
                                delay: 0.05,
                            }}
                            className={`mt-4 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
                                expiryStatus.isExpired
                                    ? "border-destructive/30 bg-destructive/5 text-destructive"
                                    : "border-emerald-500/30 bg-emerald-500/5 text-emerald-500"
                            }`}
                        >
                            <IconClock
                                className="h-4 w-4 shrink-0"
                                stroke={2}
                            />
                            <span className="font-bengali">
                                {expiryStatus.isExpired
                                    ? `Token মেয়াদ শেষ হয়ে গেছে — ${expiryStatus.date.toLocaleString()}`
                                    : `Token এখনো valid — মেয়াদ শেষ হবে ${expiryStatus.date.toLocaleString()}`}
                            </span>
                        </motion.div>
                    )}

                    {/* decoded output */}
                    {result.data && (
                        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {/* header */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="flex flex-col rounded-2xl border border-violet-500/20 bg-violet-500/5 p-4 sm:p-6"
                            >
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                        Header
                                    </span>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() =>
                                            handleCopy(
                                                JSON.stringify(
                                                    result.data!.header,
                                                    null,
                                                    2,
                                                ),
                                                "header",
                                            )
                                        }
                                        className="gap-1.5 rounded-lg"
                                    >
                                        {copiedField === "header" ? (
                                            <>
                                                <IconCheck
                                                    className="h-4 w-4 text-emerald-500"
                                                    stroke={2.2}
                                                />
                                                Copied
                                            </>
                                        ) : (
                                            <>
                                                <IconCopy
                                                    className="h-4 w-4"
                                                    stroke={2}
                                                />
                                                Copy
                                            </>
                                        )}
                                    </Button>
                                </div>
                                <pre className="overflow-auto rounded-xl border border-border/40 bg-background p-4 font-mono text-xs text-foreground sm:text-sm">
                                    <code>
                                        {JSON.stringify(
                                            result.data.header,
                                            null,
                                            2,
                                        )}
                                    </code>
                                </pre>
                            </motion.div>

                            {/* payload */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.4,
                                    ease: "easeOut",
                                    delay: 0.06,
                                }}
                                className="flex flex-col rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-6"
                            >
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                        Payload
                                    </span>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() =>
                                            handleCopy(
                                                JSON.stringify(
                                                    result.data!.payload,
                                                    null,
                                                    2,
                                                ),
                                                "payload",
                                            )
                                        }
                                        className="gap-1.5 rounded-lg"
                                    >
                                        {copiedField === "payload" ? (
                                            <>
                                                <IconCheck
                                                    className="h-4 w-4 text-emerald-500"
                                                    stroke={2.2}
                                                />
                                                Copied
                                            </>
                                        ) : (
                                            <>
                                                <IconCopy
                                                    className="h-4 w-4"
                                                    stroke={2}
                                                />
                                                Copy
                                            </>
                                        )}
                                    </Button>
                                </div>
                                <pre className="overflow-auto rounded-xl border border-border/40 bg-background p-4 font-mono text-xs text-foreground sm:text-sm">
                                    <code>
                                        {Object.entries(result.data.payload)
                                            .map(
                                                ([key, value]) =>
                                                    `"${key}": ${formatClaimValue(key, value)}`,
                                            )
                                            .join(",\n")}
                                    </code>
                                </pre>
                            </motion.div>
                        </div>
                    )}

                    {/* security note */}
                    <p className="font-bengali mt-6 text-center text-xs text-muted-foreground/70">
                        ⚠️ এইটা শুধু decode করে, signature verify করে না — token
                        সত্যিই valid কিনা যাচাই করতে সার্ভার-সাইড verify জরুরি।
                    </p>

                    {/* ---------- Test token generator ---------- */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="mt-14 rounded-2xl border border-border/60 bg-card p-4 shadow-sm sm:p-6"
                    >
                        <div className="mb-4 flex items-center gap-2">
                            <IconWand
                                className="h-5 w-5 text-primary"
                                stroke={1.8}
                            />
                            <h2 className="text-base font-bold text-foreground sm:text-lg">
                                টেস্ট টোকেন বানান
                            </h2>
                        </div>
                        <p className="font-bengali mb-4 text-sm text-muted-foreground">
                            নিজের payload আর secret দিয়ে একটা HS256-signed JWT
                            বানিয়ে উপরের decoder-এ সাথে সাথে load করুন। সবকিছু
                            browser-এর ভিতরেই হয় (Web Crypto API), কোথাও পাঠানো
                            হয় না।
                        </p>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="gen-payload"
                                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                                >
                                    Payload (JSON)
                                </label>
                                <textarea
                                    id="gen-payload"
                                    value={genPayload}
                                    onChange={(e) =>
                                        setGenPayload(e.target.value)
                                    }
                                    spellCheck={false}
                                    className="h-40 w-full resize-none rounded-xl border border-border/60 bg-background p-3 font-mono text-xs text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label
                                    htmlFor="gen-secret"
                                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                                >
                                    Secret (HMAC key)
                                </label>
                                <input
                                    id="gen-secret"
                                    value={genSecret}
                                    onChange={(e) =>
                                        setGenSecret(e.target.value)
                                    }
                                    spellCheck={false}
                                    className="h-11 w-full rounded-xl border border-border/60 bg-background px-3 font-mono text-xs text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30"
                                />

                                <Button
                                    onClick={handleGenerate}
                                    disabled={genState.status === "loading"}
                                    className="mt-3 gap-1.5 rounded-lg"
                                >
                                    <IconWand className="h-4 w-4" stroke={2} />
                                    {genState.status === "loading"
                                        ? "Generating..."
                                        : "Generate Token"}
                                </Button>

                                {genState.status === "error" && (
                                    <div className="mt-2 flex items-center gap-2 text-xs text-destructive">
                                        <IconAlertCircle
                                            className="h-3.5 w-3.5 shrink-0"
                                            stroke={2}
                                        />
                                        <span className="font-bengali">
                                            {genState.message}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {genState.status === "success" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4"
                            >
                                <p className="mb-2 break-all font-mono text-xs text-foreground">
                                    {genState.token}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() =>
                                            handleCopy(genState.token, "token")
                                        }
                                        className="gap-1.5 rounded-lg"
                                    >
                                        {copiedField === "token" ? (
                                            <>
                                                <IconCheck
                                                    className="h-4 w-4 text-emerald-500"
                                                    stroke={2.2}
                                                />
                                                Copied
                                            </>
                                        ) : (
                                            <>
                                                <IconCopy
                                                    className="h-4 w-4"
                                                    stroke={2}
                                                />
                                                Copy Token
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        size="sm"
                                        onClick={handleLoadIntoDecoder}
                                        className="gap-1.5 rounded-lg"
                                    >
                                        <IconArrowUp
                                            className="h-4 w-4"
                                            stroke={2}
                                        />
                                        Decoder-এ Load করুন
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </section>
        </NavBarSticky>
    );
};

export default JwtDecoder;
