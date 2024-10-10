// src/services/billings/index.ts
"use server";

import { Router } from 'express';
import supabase from '../../db/supabaseClient';
import { addBilling, getBillings } from './billings.actions';
// import dayjs from "dayjs";
// import { revalidatePath } from "next/cache";
// import { getMonthlyUsage } from './electricity-usage.actions';
// import { TAX } from "@/src/constants";

// Create a router instance
const router = Router();

// Define a route to get billing data
router.get('/billings', async (req, res) => {
  try {
    const data = await getBillings({ user_id: req.query.user_id as string });
    res.json(data);
  } catch (error) {
    console.error('Error fetching billing data:', error);
    res.status(500).send('Error fetching billing data');
  }
});

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
