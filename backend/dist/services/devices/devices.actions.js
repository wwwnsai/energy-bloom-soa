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
import dayjs from 'dayjs';
import bcrypt from 'bcrypt';
import { revalidatePath } from "next/cache.js";
export const addDevice = (_a) => __awaiter(void 0, [_a], void 0, function* ({ user_id, device_name, device_type, device_count, device_unit_usage, }) {
    try {
        const supabase = createClient();
        const createdAt = dayjs().toISOString();
        // Hash the device name using bcrypt
        const saltRounds = 10;
        const hashedDeviceName = yield bcrypt.hash(device_name, saltRounds);
        console.log("Hashed Device Name:", hashedDeviceName);
        console.log("Device Verification:", yield bcrypt.compare(device_name, hashedDeviceName));
        // console.log("Device Verification:", await bcrypt.compare("worng keys", hashedDeviceName));
        console.log("Adding device this is from actions:", {
            hash: hashedDeviceName,
            user_id,
            device_name,
            device_type,
            device_count,
            device_unit_usage,
            created_at: createdAt,
        });
        const { data, error } = yield supabase.from("devices").insert([
            {
                user_id,
                device_name,
                device_type,
                device_count,
                device_unit_usage,
                created_at: createdAt,
            },
        ]);
        if (error) {
            throw new Error(error.message);
        }
        revalidatePath("/");
        return data;
    }
    catch (error) {
        console.error("Error adding device:", error);
        throw new Error("Failed to add device. Please try again later.");
    }
});
export const updateDevice = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, device_name, device_type, device_count, device_unit_usage, }) {
    try {
        const supabase = createClient();
        // Hash the device name using bcrypt
        const saltRounds = 10;
        const hashedDeviceName = yield bcrypt.hash(device_name, saltRounds);
        console.log("Hashed Device Name:", hashedDeviceName);
        console.log('Updating device this is from actions:', {
            id,
            device_name: hashedDeviceName,
            device_type,
            device_count,
            device_unit_usage,
        });
        const { data, error } = yield supabase
            .from('devices')
            .update({
            device_name,
            device_type,
            device_count,
            device_unit_usage,
        })
            .eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
        revalidatePath('/');
        return data;
    }
    catch (error) {
        console.error('Error updating device:', error);
        throw new Error('Failed to update device. Please try again later.');
    }
});
export const deleteDevice = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id }) {
    try {
        const supabase = createClient();
        console.log('Deleting device this is from actions:', id);
        const { data, error } = yield supabase
            .from('devices')
            .delete()
            .eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
        revalidatePath('/');
        return data;
    }
    catch (error) {
        console.error('Error deleting device:', error);
        throw new Error('Failed to delete device. Please try again later.');
    }
});
export const getDevices = (_a) => __awaiter(void 0, [_a], void 0, function* ({ user_id }) {
    try {
        const supabase = createClient();
        const { data, error } = yield supabase
            .from("devices")
            .select("*")
            .eq("user_id", user_id);
        if (error) {
            console.error("Error:", error);
            throw new Error(error.message);
        }
        return data;
    }
    catch (error) {
        console.error("Error fetching devices:", error);
        throw new Error("Failed to fetch devices. Please try again later.");
    }
});
