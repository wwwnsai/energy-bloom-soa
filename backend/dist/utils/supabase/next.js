import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers.js";
export function createClient() {
    const cookieStore = cookies();
    return createServerClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
        cookies: {
            get(name) {
                var _a;
                return (_a = cookieStore.get(name)) === null || _a === void 0 ? void 0 : _a.value;
            },
            set(name, value, options) {
                try {
                    cookieStore.set(Object.assign({ name, value }, options));
                }
                catch (error) {
                    // The `set` method was called from a Server Component.
                    // This can be ignored if you have middleware refreshing
                    // user sessions.
                }
            },
            remove(name, options) {
                try {
                    cookieStore.set(Object.assign({ name, value: "" }, options));
                }
                catch (error) {
                    // The `delete` method was called from a Server Component.
                    // This can be ignored if you have middleware refreshing
                    // user sessions.
                }
            },
        },
    });
}
