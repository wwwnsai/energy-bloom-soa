"use server";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { createClient } from "../../utils/supabase/server.js";
export const getLoggedInUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("GETTING LOGGED IN USER");
        const supabase = createClient();
        const { data: { user }, error, } = yield supabase.auth.getUser();
        if (error) {
            throw new Error(error.message);
        }
        return user;
    }
    catch (error) {
        console.error("Error fetching logged-in user:", error);
        throw new Error("Failed to get logged-in user.");
    }
});
export const getUserInfo = (_a) => __awaiter(void 0, [_a], void 0, function* ({ user_id }) {
    try {
        const supabase = createClient();
        const { data, error } = yield supabase
            .from("users")
            .select("*")
            .eq("id", user_id);
        if (error) {
            throw new Error(error.message);
        }
        if (!data || data.length === 0) {
            throw new Error("User not found.");
        }
        return data[0];
    }
    catch (error) {
        console.error("Error fetching user info:", error);
        throw new Error("Failed to fetch user info. Please try again later.");
    }
});
// users.actions.ts
export const signIn = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
    try {
        console.log("Starting sign-in for email:", email);
        const supabase = createClient();
        const { data, error } = yield supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            console.error("Supabase sign-in error:", error.message);
            throw new Error(error.message);
        }
        if (!data.user) {
            console.error("Supabase sign-in error: User data is null");
            throw new Error("User data is null after sign-in.");
        }
        console.log("Sign-in successful, user data:", data.user);
        return data.user;
    }
    catch (error) {
        console.error("Error in signIn:", error);
        throw new Error("Failed to sign in. Please check your credentials.");
    }
});
export const signUp = (_a) => __awaiter(void 0, void 0, void 0, function* () {
    var { password } = _a, userData = __rest(_a, ["password"]);
    try {
        const supabase = createClient();
        console.log("Attempting sign-up with data:", userData);
        // Sign up the user with just email and password (SUPABASE AUTH)
        const { data, error } = yield supabase.auth.signUp({
            email: userData.email,
            password,
        });
        if (error) {
            console.error("Supabase sign-up error:", error);
            throw new Error(error.message);
        }
        if (!data.user) {
            throw new Error("Failed to retrieve user data after sign-up.");
        }
        const { data: existingUser, error: selectError } = yield supabase
            .from("users")
            .select("id")
            .eq("id", data.user.id)
            .single();
        if (selectError && selectError.code !== "PGRST116") {
            console.error("Error checking if user exists:", selectError);
            throw new Error("Failed to check if user exists. Please try again later.");
        }
        if (existingUser) {
            const { error: updateError } = yield supabase
                .from("users")
                .update({
                email: userData.email,
                first_name: userData.first_name,
                last_name: userData.last_name,
                address1: userData.address1,
                city: userData.city,
                postal_code: userData.postal_code,
                date_of_birth: userData.date_of_birth,
            })
                .eq("id", data.user.id);
            if (updateError) {
                console.error("Error updating user data:", updateError);
                throw new Error("Failed to update user data. Please try again later.");
            }
        }
        else {
            const { error: insertError } = yield supabase.from("users").insert([
                {
                    id: data.user.id,
                    email: userData.email,
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    address1: userData.address1,
                    city: userData.city,
                    postal_code: userData.postal_code,
                    date_of_birth: userData.date_of_birth,
                },
            ]);
            if (insertError) {
                console.error("Error inserting user data:", insertError);
                throw new Error("Failed to insert user data. Please try again later.");
            }
        }
        return data.user;
    }
    catch (error) {
        console.error("Error signing up:", error);
        throw new Error("Failed to sign up. Please try again later.");
    }
});
export const logoutAccount = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supabase = createClient();
        const { error } = yield supabase.auth.signOut();
        if (error) {
            throw new Error(error.message);
        }
        return { message: "Successfully logged out." };
    }
    catch (error) {
        console.error("Error logging out:", error);
        throw new Error("Failed to log out. Please try again later.");
    }
});
