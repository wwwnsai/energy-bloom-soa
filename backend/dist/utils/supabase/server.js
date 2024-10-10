import dotenv from "dotenv";
dotenv.config();
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
export const createClient = () => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey) {
        throw new Error("Supabase URL or Key is missing");
    }
    return createSupabaseClient(supabaseUrl, supabaseKey);
};
