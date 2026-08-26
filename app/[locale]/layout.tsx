import ScrollToTop from "@/components/global/ScrollToTop";
import {
    constructMetadata,
    constructViewport,
    SiteConfig,
} from "@/lib/metadata";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Anek_Bangla, Inter } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/providers/auth-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const anekBangla = Anek_Bangla({
    subsets: ["bengali", "latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-anek-bangla",
    display: "swap",
});

export const siteConfig: SiteConfig = {
    baseUrl: "https://cobalt-studio-xi.vercel.app",
    siteName: "Cobalt Studio",
    title: "Cobalt Studio",
    description: "Cobalt Studio",
    ogImage: "/brand_logo_xl.png",
    twitterHandle: "@CobaltStudio",
    authorName: "Arefur Rahman Khan",
    portfolioUrl: "http://arefolio.vercel.app/",
    locale: "en_US",
    themeColor: "#F0F9FF",
    keywords: [
        "Arefur Rahman Khan",
        "aref",
        "mern stack developer",
        "developer portfolio",
        "Full Stack Developer",
        "web developer",
    ],
};

export const metadata: Metadata = constructMetadata(siteConfig);
export const viewport: Viewport = constructViewport(siteConfig);

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
        notFound();
    }

    setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <html
            lang={locale}
            className={`${inter.variable} ${anekBangla.variable} h-full antialiased`}
            suppressHydrationWarning
        >
            <body className="min-h-full flex flex-col">
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <AuthProvider>
                        <ThemeProvider>
                            {children}
                            <ScrollToTop />
                            <Toaster
                                position="top-center"
                                richColors
                                offset={{ top: 75 }}
                            />
                            <Analytics />
                        </ThemeProvider>
                    </AuthProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
