import { authMiddleware } from "@clerk/nextjs";

import { PAGES, FOOTER } from "@/app/lib/constants";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [
    PAGES.HOME.href,
    PAGES.PRICING.href,
    PAGES.BLOG.href,
    PAGES.ABOUT.href,
    FOOTER.PRIVACY.href,
    FOOTER.TERMS.href,
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
