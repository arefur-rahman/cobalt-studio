"use client";

import NavBarSticky from "@/components/global/NavBarSticky";
import { IconAlertCircle, IconBraces } from "@tabler/icons-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import BackNavigation from "../components/BackNavigation";
import CopyButton from "../components/CopyButton";
import ToolPageHeader from "../components/ToolPageHeader";
import { generateTypeScript } from "./lib";

// ---------- Constants ----------

const SAMPLE_JSON = `{
  "id": 101,
  "name": "Aref",
  "isActive": true,
  "tags": ["frontend", "mern"],
  "address": {
    "city": "Lakshmipur",
    "zip": "3700"
  }
}`;

// ---------- Sub-components ----------

interface JsonInputPanelProps {
    value: string;
    onChange: (value: string) => void;
    error: string | null;
}

const JsonInputPanel = ({ value, onChange, error }: JsonInputPanelProps) => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col rounded-2xl border border-border/60 bg-card p-4 shadow-sm sm:p-6"
    >
        <div className="mb-2 flex items-center justify-between">
            <label
                htmlFor="json-input"
                className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            >
                JSON
            </label>
            {error && (
                <span className="flex items-center gap-1 text-xs text-destructive">
                    <IconAlertCircle className="h-3.5 w-3.5" stroke={2} />
                    Invalid JSON
                </span>
            )}
        </div>
        <textarea
            id="json-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            spellCheck={false}
            placeholder='{ "key": "value" }'
            className={`h-80 w-full resize-none rounded-xl border bg-background p-4 font-mono text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/30 ${
                error ? "border-destructive" : "border-border/60"
            }`}
        />
        {error && (
            <p className="mt-2 font-mono text-xs text-destructive">{error}</p>
        )}
    </motion.div>
);

interface TypescriptOutputPanelProps {
    code: string;
    copied: boolean;
    onCopy: () => void;
}

const TypescriptOutputPanel = ({
    code,
    copied,
    onCopy,
}: TypescriptOutputPanelProps) => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
        className="flex flex-col rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-6"
    >
        <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                TypeScript
            </span>
            <CopyButton onClick={onCopy} copied={copied} disabled={!code} />
        </div>
        <pre className="h-80 w-full overflow-auto rounded-xl border border-border/40 bg-background p-4 font-mono text-sm text-foreground">
            <code>{code || "// TypeScript interface will appear here"}</code>
        </pre>
    </motion.div>
);

// ---------- Page ----------

const JsonToTypescript = () => {
    const [input, setInput] = useState(SAMPLE_JSON);
    const [copied, setCopied] = useState(false);

    const result = useMemo(() => {
        if (input.trim() === "") {
            return { code: "", error: null as string | null };
        }
        try {
            const code = generateTypeScript(input, "RootObject");
            return { code, error: null as string | null };
        } catch (err) {
            return {
                code: "",
                error: err instanceof Error ? err.message : "Invalid JSON",
            };
        }
    }, [input]);

    const handleCopy = () => {
        if (!result.code) return;
        navigator.clipboard.writeText(result.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <NavBarSticky>
            <section className="w-full py-16 md:py-24">
                <div className="mx-auto max-w-5xl px-6">
                    <BackNavigation />

                    <ToolPageHeader
                        icon={IconBraces}
                        title="JSON to TypeScript"
                        description="Paste JSON and instantly get TypeScript interfaces — supports nested objects and arrays."
                    />

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <JsonInputPanel
                            value={input}
                            onChange={setInput}
                            error={result.error}
                        />
                        <TypescriptOutputPanel
                            code={result.code}
                            copied={copied}
                            onCopy={handleCopy}
                        />
                    </div>
                </div>
            </section>
        </NavBarSticky>
    );
};

export default JsonToTypescript;
