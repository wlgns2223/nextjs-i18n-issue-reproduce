import { NextRequest, NextResponse } from "next/server";

export const IS_DEV = process.env.NODE_ENV === "development";

export const config = {
    matcher: [
        /*
         * Match all paths except for:
         * 1. /api routes
         * 2. /_next (Next.js internals)
         * 3. /_static (inside /public)
         * 4. all root files inside /public (e.g. /favicon.ico)
         */
        "/((?!api/|_next|img/|_next/|_static/|board/|/uidoc|uidoc/|sitemap|404|_vercel|[\\w-]+\\.\\w+).*)",
    ],
};

export default async function middleware(req: NextRequest, res: NextResponse) {
    const url = req.nextUrl;

    console.log("nextUrl", req.nextUrl);

    // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
    const hostname = req.headers.get("host")!;
    //   .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

    // Get the pathname of the request (e.g. /, /about, /blog/first-post)
    const path = url.pathname;

    if (IS_DEV && path.includes("uidoc")) {
        console.log("redner to uiDoc");
    }

    // rewrite everything else to `/[domain]/[path] dynamic route
    console.log(
        "middleweare to: ",
        `from = ${req.url}  to = ${new URL(`/${hostname}${path}`, req.url)}`
    );
    return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}
