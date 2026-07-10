import SplashCursor from "@/components/ui/SplashCursor";
import {
    constructMetadata,
    constructViewport,
    SiteConfig,
} from "@/lib/metadata";
import type { Metadata, Viewport } from "next";
import { Anek_Bangla, Inter } from "next/font/google";
import "./globals.css";

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
    baseUrl: "https://site_url.com",
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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${anekBangla.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">{children}</body>
        </html>
    );
}
