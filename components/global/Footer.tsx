import {
    IconBrandFacebook,
    IconBrandTiktok,
    IconBrandYoutube,
    IconClock,
    IconId,
    IconMail,
    IconMapPin,
    IconWorld,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import BrandLogo from "./BrandLogo";
import GradientTopBorder from "./GradientTopBorder";
import { P } from "./Texts";

const Footer = () => {
    const t = useTranslations("footer");

    const quickLinks = [
        { label: t("links.home"), href: "/" },
        { label: t("links.about"), href: "/about" },
        { label: t("links.privacyPolicy"), href: "/privacy" },
        { label: t("links.terms"), href: "/terms" },
        { label: t("links.refund"), href: "/refund" },
    ];

    return (
        <footer className="bg-muted/60 border-t border-border/60 relative">
            <GradientTopBorder />
            {/* Main footer grid */}
            <div className="container mx-auto px-6 py-14 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand Column */}
                    <div className="space-y-5">
                        <BrandLogo />
                        <P className="text-sm text-muted-foreground dark:text-foreground leading-relaxed max-w-50">
                            {t("brandTagline")}
                        </P>
                        <div className="flex items-center gap-2.5">
                            <Button
                                asChild
                                size="icon"
                                variant="ghost"
                                className="size-9 text-muted-foreground/70 border border-border/80 rounded-xl hover:text-primary hover:border-primary/60 hover:bg-primary/5 transition-all"
                            >
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                >
                                    <IconBrandFacebook size={17} />
                                </a>
                            </Button>
                            <Button
                                asChild
                                size="icon"
                                variant="ghost"
                                className="size-9 text-muted-foreground/70 border border-border/80 rounded-xl hover:text-primary hover:border-primary/60 hover:bg-primary/5 transition-all"
                            >
                                <a
                                    href="https://youtube.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="YouTube"
                                >
                                    <IconBrandYoutube size={17} />
                                </a>
                            </Button>
                            <Button
                                asChild
                                size="icon"
                                variant="ghost"
                                className="size-9 text-muted-foreground/70 border border-border/80 rounded-xl hover:text-primary hover:border-primary/60 hover:bg-primary/5 transition-all"
                            >
                                <a
                                    href="https://tiktok.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="TikTok"
                                >
                                    <IconBrandTiktok size={17} />
                                </a>
                            </Button>
                            <Button
                                asChild
                                size="icon"
                                variant="ghost"
                                className="size-9 text-muted-foreground/70 border border-border/80 rounded-xl hover:text-primary hover:border-primary/60 hover:bg-primary/5 transition-all"
                            >
                                <a
                                    href="https://arefolio.vercel.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Website"
                                >
                                    <IconWorld size={17} />
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div className="space-y-5">
                        <h4 className="text-xs font-bold tracking-[0.2rem] uppercase text-muted-foreground">
                            {t("quickLink")}
                        </h4>
                        <ul className="space-y-3.5">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-foreground/80 hover:text-primary transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Info Column */}
                    <div className="space-y-5">
                        <h4 className="text-xs font-bold tracking-[0.2rem] uppercase text-muted-foreground">
                            {t("info")}
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-2.5">
                                <IconId
                                    size={16}
                                    className="text-primary mt-0.5 shrink-0"
                                />
                                <span className="text-sm text-foreground/80">
                                    License: MIT2025
                                </span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <IconMapPin
                                    size={16}
                                    className="text-primary mt-0.5 shrink-0"
                                />
                                <span className="text-sm text-foreground/80">
                                    House 423, Pirojpur, Bangladesh
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div className="space-y-5">
                        <h4 className="text-xs font-bold tracking-[0.2rem] uppercase text-muted-foreground">
                            {t("support")}
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-2.5">
                                <IconMail
                                    size={16}
                                    className="text-primary shrink-0"
                                />
                                <a
                                    href="mailto:studioredlabbd@gmail.com"
                                    className="text-sm text-foreground/80 hover:text-primary transition-colors"
                                >
                                    studioredlabbd@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <IconClock
                                    size={16}
                                    className="text-primary shrink-0"
                                />
                                <span className="text-sm text-foreground/80">
                                    Class time – Sat &amp; Wed: 09:00 PM
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Payment Methods Banner */}
            <div className="border-t border-border/50 bg-background/60 py-4 px-6 overflow-hidden">
                <div className="container mx-auto">
                    <Image
                        src="/Payment-Banner-xl.webp"
                        alt="Accepted payment methods"
                        width={1920}
                        height={80}
                        loading="lazy"
                        className="w-full h-auto object-contain dark:opacity-70 rounded-lg"
                    />
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-border/50 bg-accent/50">
                <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
                    <P className="text-xs text-muted-foreground/70">
                        {t("allRightReserved")}
                    </P>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/refund"
                            className="text-xs text-muted-foreground/70 hover:text-primary transition-colors"
                        >
                            {t("links.refund")}
                        </Link>
                        <span className="text-muted-foreground/40 text-xs">
                            |
                        </span>
                        <Link
                            href="/privacy"
                            className="text-xs text-muted-foreground/70 hover:text-primary transition-colors"
                        >
                            {t("privacy")}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
