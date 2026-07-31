import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
    // Match all pathnames except for internal Next.js/Vercel paths and static files with extensions
    matcher: ["/", "/(bn|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
