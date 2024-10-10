"use server";

import { createClient } from "../../utils/supabase/server.js";
import dayjs from 'dayjs';
// import bcrypt from 'bcrypt';
import { revalidatePath } from "next/cache.js";
import { hash } from 'crypto';
import { AddDeviceParams, DeleteDeviceParams, GetDevicesParams, UpdateDeviceParams } from "../../types/device.js";

export const addDevice = async ({
  user_id,
  device_name,
  device_type,
  device_count,
  device_unit_usage,
}: AddDeviceParams) => {
  try {
    const supabase = createClient();

    const createdAt = dayjs().toISOString();

    // Hash the device name using bcrypt
    // const saltRounds = 10;
    // const hashedDeviceName = await bcrypt.hash(device_name, saltRounds);

    // console.log("Hashed Device Name:", hashedDeviceName);
    // console.log("Device Verification:", await bcrypt.compare(device_name, hashedDeviceName));
    // console.log("Device Verification:", await bcrypt.compare("worng keys", hashedDeviceName));

    console.log("Adding device this is from actions:", {
      hash: device_name,
      user_id,
      device_name,
      device_type,
      device_count,
      device_unit_usage,
      created_at: createdAt,
    });

    const { data, error } = await supabase.from("devices").insert([
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
  } catch (error) {
    console.error("Error adding device:", error);
    throw new Error("Failed to add device. Please try again later.");
  }
};

export const updateDevice = async ({
  id,
  device_name,
  device_type,
  device_count,
  device_unit_usage,
}: UpdateDeviceParams) => {
  try {
    const supabase = createClient();

    // Hash the device name using bcrypt
    // const saltRounds = 10;
    // const hashedDeviceName = await bcrypt.hash(device_name, saltRounds);

    // console.log("Hashed Device Name:", hashedDeviceName);

    console.log('Updating device this is from actions:', {
      id,
      device_name: device_name,
      device_type,
      device_count,
      device_unit_usage,
    });

    const { data, error } = await supabase
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
  } catch (error) {
    console.error('Error updating device:', error);
    throw new Error('Failed to update device. Please try again later.');
  }
}
  
export const deleteDevice = async ({ id }: DeleteDeviceParams) => {
  try {
    const supabase = createClient();

    console.log('Deleting device this is from actions:', id);

    const { data, error } = await supabase
      .from('devices')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath('/');

    return data;
  } catch (error) {
    console.error('Error deleting device:', error);
    throw new Error('Failed to delete device. Please try again later.');
  }
};

export const getDevices = async ({ user_id }: GetDevicesParams) => {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("devices")
      .select("*")
      .eq("user_id", user_id);

    if (error) {
      console.error("Error:", error);
      throw new Error(error.message);
    }

    return data;
    
  } catch (error) {
    console.error("Error fetching devices:", error);
    throw new Error("Failed to fetch devices. Please try again later.");
  }
};
