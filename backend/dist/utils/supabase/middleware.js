var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server.js";
export function updateSession(request) {
    return __awaiter(this, void 0, void 0, function* () {
        let supabaseResponse = NextResponse.next({
            request,
        });
        const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
                },
            },
        });
        // IMPORTANT: Avoid writing any logic between createServerClient and
        // supabase.auth.getUser(). A simple mistake could make it very hard to debug
        // issues with users being randomly logged out.
        const { data: { user }, } = yield supabase.auth.getUser();
        if (!user &&
            !request.nextUrl.pathname.startsWith("/login") &&
            !request.nextUrl.pathname.startsWith("/auth")) {
            // no user, potentially respond by redirecting the user to the login page
            const url = request.nextUrl.clone();
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }
        // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
        // creating a new response object with NextResponse.next() make sure to:
        // 1. Pass the request in it, like so:
        //    const myNewResponse = NextResponse.next({ request })
        // 2. Copy over the cookies, like so:
        //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
        // 3. Change the myNewResponse object to fit your needs, but avoid changing
        //    the cookies!
        // 4. Finally:
        //    return myNewResponse
        // If this is not done, you may be causing the browser and server to go out
        // of sync and terminate the user's session prematurely!
        return supabaseResponse;
    });
}
