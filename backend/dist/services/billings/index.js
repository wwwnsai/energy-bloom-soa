// src/services/billings/index.ts
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
import { Router } from 'express';
import { getBillings } from './billings.actions.js';
// import dayjs from "dayjs";
// import { revalidatePath } from "next/cache";
// import { getMonthlyUsage } from './electricity-usage.actions';
// import { TAX } from "@/src/constants";
// Create a router instance
const router = Router();
// Define a route to get billing data
router.get('/billings', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield getBillings({ user_id: req.query.user_id });
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching billing data:', error);
        res.status(500).send('Error fetching billing data');
    }
}));
// async function getBillingData({ user_id }: { user_id: string }): Promise<Billing[]> {
//   const { data, error } = await supabase
//     .from('billings')
//     .select('*')
//     .eq('user_id', user_id); 
//   if (error) {
//     throw new Error(error.message);
//   }
//   console.log('Billing data:', data[0].totalPrice);
//   return data || [];
// }
// Export the router
export { router as billingRoutes };
