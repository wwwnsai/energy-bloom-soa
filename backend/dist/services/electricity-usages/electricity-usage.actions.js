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
import { UNIT_PRICE } from '../../constants/index.js';
// import { hashData, verifyData } from '@/src/utils/crypto';
import { createClient } from "../../utils/supabase/server.js";
import { handleSupabaseRequest } from '../../utils/supabase/supabase-request-handler.js';
import dayjs from 'dayjs';
import { revalidatePath } from 'next/cache.js';
export const getMonthlyUsage = (_a) => __awaiter(void 0, [_a], void 0, function* ({ user_id }) {
    return handleSupabaseRequest(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const supabase = createClient();
            const currentMonth = dayjs().month() + 1;
            const currentYear = dayjs().year();
            console.log(`Filtering for month: ${currentMonth}, year: ${currentYear}`);
            const { data, error } = yield supabase
                .from("usages")
                .select("*")
                .eq("user_id", user_id)
                .eq("month", currentMonth)
                .eq("year", currentYear);
            if (error) {
                throw new Error(error.message);
            }
            if (!data || data.length === 0) {
                console.log("No usage data found for the current month.");
                return {
                    usage: 0,
                    price: 0,
                };
            }
            return { usage: data[0].usage, price: data[0].price };
        }
        catch (error) {
            console.error("Error fetching monthly usage data:", error);
            throw new Error("Failed to fetch monthly usage data. Please try again later.");
        }
    }), "fetching monthly usage data");
});
export const addElectricityUsage = (_a) => __awaiter(void 0, [_a], void 0, function* ({ user_id, usage, price, }) {
    return handleSupabaseRequest(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const supabase = createClient();
            const createdAt = dayjs().toISOString();
            const currentMonth = dayjs().month() + 1;
            const currentYear = dayjs().year();
            console.log("Adding this usage from actions:", {
                user_id,
                month: currentMonth,
                year: currentYear,
                usage,
                price,
                created_at: createdAt,
                updated_at: createdAt,
            });
            const { data, error } = yield supabase.from("usages").insert([
                {
                    user_id,
                    month: currentMonth,
                    year: currentYear,
                    usage,
                    price,
                    created_at: createdAt,
                    updated_at: createdAt,
                },
            ]);
            if (error) {
                throw new Error(error.message);
            }
            revalidatePath("/");
            return data;
        }
        catch (error) {
            console.error("Error adding electricity usage:", error);
            throw new Error("Failed to add electricity usage. Please try again later.");
        }
    }), "adding electricity usage");
});
export const updateElectricityUsage = (_a) => __awaiter(void 0, [_a], void 0, function* ({ user_id, usage, price, }) {
    return handleSupabaseRequest(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const supabase = createClient();
            const updatedAt = dayjs().toISOString();
            const currentMonth = dayjs().month() + 1;
            const currentYear = dayjs().year();
            console.log("Updating this usage from actions:", {
                user_id,
                usage,
                price,
                updated_at: updatedAt,
            });
            const { data, error } = yield supabase
                .from("usages")
                .update({
                user_id,
                usage,
                price,
                updated_at: updatedAt,
            })
                .eq("user_id", user_id)
                .eq("month", currentMonth)
                .eq("year", currentYear);
            if (error) {
                throw new Error(error.message);
            }
            revalidatePath("/house/my-smart-meter");
            return data;
        }
        catch (error) {
            console.error("Error updating electricity usage:", error);
            throw new Error("Failed to update electricity usage. Please try again later.");
        }
    }), "updating electricity usage");
});
export const calculateUsageAndPrice = (_a) => __awaiter(void 0, [_a], void 0, function* ({ user_id, }) {
    return handleSupabaseRequest(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const supabase = createClient();
            const { data: devices, error } = yield supabase
                .from("devices")
                .select("device_unit_usage, created_at")
                .eq("user_id", user_id);
            if (error) {
                throw new Error(error.message); // Specific Supabase error handling
            }
            const now = dayjs();
            const currentMonthStart = dayjs().startOf("month");
            const currentMinute = now.diff(currentMonthStart, "minute");
            console.log("Minutes since the start of the month:", currentMinute);
            const rawUsage = devices.reduce((total, device) => {
                const deviceCreatedAt = dayjs(device.created_at);
                const minutesSinceCreation = deviceCreatedAt.isSame(currentMonthStart, "minute")
                    ? Math.min(currentMinute - deviceCreatedAt.minute(), currentMinute)
                    : currentMinute;
                const usageToday = device.device_unit_usage * Math.max(minutesSinceCreation, 0);
                const totalUsage = (total + usageToday) / 60;
                return totalUsage;
            }, 0);
            const usage = parseFloat(rawUsage.toFixed(2));
            const price = parseFloat((usage * UNIT_PRICE).toFixed(2));
            console.log("Today's usage (in minutes):", { usage, price });
            //   const storedHash = hashData(usage);
            //   console.log("Data Verification:", verifyData(usage, storedHash));
            //   console.log("Hashed Usage Data:", storedHash);
            const isFirstDayOfMonth = new Date().getDate() === 1;
            console.log("Is first day of month:", isFirstDayOfMonth);
            const { data: existingUsage, error: checkError } = yield supabase
                .from("usages")
                .select("*")
                .eq("user_id", user_id)
                .eq("month", now.month() + 1)
                .eq("year", now.year());
            if (checkError) {
                throw new Error(checkError.message); // Specific Supabase error handling
            }
            const hasCurrentMonthUsage = existingUsage.length > 0;
            console.log("Has current month usage:", hasCurrentMonthUsage);
            if (!hasCurrentMonthUsage ||
                (!hasCurrentMonthUsage && isFirstDayOfMonth)) {
                yield addElectricityUsage({ user_id, usage, price });
            }
            else {
                yield updateElectricityUsage({ user_id, usage, price });
            }
            // NOTE: FOR LIVE DEMO
            if (!hasCurrentMonthUsage ||
                (!hasCurrentMonthUsage && isFirstDayOfMonth)) {
                yield addElectricityUsage({ user_id, usage, price });
            }
            else {
                yield updateElectricityUsage({ user_id, usage, price });
            }
            return { usage, price };
        }
        catch (error) {
            console.error("Error calculating today's usage:", error);
            throw new Error("Failed to calculate today's usage. Please try again later.");
        }
    }), "calculating usage");
});
