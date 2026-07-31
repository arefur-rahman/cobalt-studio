import "@/app/globals.css";
import { AuthProvider } from "@/providers/auth-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import NotFound from "./[locale]/not-found";

export default async function RootNotFound() {
    const messages = await getMessages();

    return (
        <html lang="en">
            <body className="antialiased min-h-screen bg-background text-foreground">
                <NextIntlClientProvider messages={messages}>
                    <AuthProvider>
                        <ThemeProvider>
                            <NotFound />
                        </ThemeProvider>
                    </AuthProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
