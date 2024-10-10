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
import { createClient } from "../../utils/supabase/server.js";
import dayjs from "dayjs";
import { revalidatePath } from "next/cache.js";
import { getMonthlyUsage } from './../electricity-usages/electricity-usage.actions.js';
import { TAX } from '../../constants/index.js';
import { handleSupabaseRequest } from '../../utils/supabase/supabase-request-handler.js';
export const addBilling = (_a) => __awaiter(void 0, [_a], void 0, function* ({ user_id, month, year, }) {
    return handleSupabaseRequest(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const supabase = createClient();
            const createdAt = dayjs().toISOString();
            const { usage, price } = yield getMonthlyUsage({ user_id });
            const numericPrice = Number(price);
            const totalPrice = Number(numericPrice.toFixed(2));
            console.log("price:", totalPrice);
            const tax = Number((totalPrice * TAX).toFixed(2));
            const total = totalPrice + tax;
            console.log("Adding billing this is from actions:", {
                user_id,
                month,
                year,
                usage,
                totalPrice,
                tax,
                total,
                created_at: createdAt,
            });
            const { data, error } = yield supabase.from("billings").insert([
                {
                    user_id,
                    month,
                    year,
                    usage,
                    price: totalPrice,
                    tax,
                    total,
                    created_at: createdAt,
                },
            ]);
            if (error) {
                throw new Error(error.message);
            }
            revalidatePath("/house/billing");
            return data;
        }
        catch (error) {
            console.error("Error adding billing:", error);
            throw new Error("Failed to add billing. Please try again later.");
        }
    }), "adding billing");
});
export const getBillings = (_a) => __awaiter(void 0, [_a], void 0, function* ({ user_id }) {
    return handleSupabaseRequest(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const supabase = createClient();
            const currentMonth = dayjs().month() + 1;
            const currentYear = dayjs().year();
            const { data, error } = yield supabase
                .from("billings")
                .select("*")
                .eq("user_id", user_id);
            if (error) {
                console.error("Error:", error);
                throw new Error(error.message);
            }
            console.log("BILLING DATA:", data);
            const isLastDayOfMonth = dayjs().endOf("month").isSame(dayjs(), "day");
            const hasCurrentMonthBilling = data.some((billing) => billing.month === currentMonth && billing.year === currentYear);
            console.log("hasCurrentMonthBilling:", hasCurrentMonthBilling);
            if (!hasCurrentMonthBilling && isLastDayOfMonth) {
                console.log("No billing data for this month. Adding new billing...");
                yield addBilling({
                    user_id,
                    month: currentMonth,
                    year: currentYear,
                });
            }
            else {
                console.log("Billing data already exists for this month.");
            }
            // NOTE: For testing:::
            // if (true) {
            //   console.log("No billing data for this month. Adding new billing...");
            //   await addBilling({
            //     user_id,
            //     month: currentMonth,
            //     year: currentYear,
            //   });
            // } else {
            //   console.log("Billing data already exists for this month.");
            // }
            return data;
        }
        catch (error) {
            console.error("Error getting billing:", error);
            throw new Error("Failed to get billing. Please try again later.");
        }
    }), "getting billings");
});
