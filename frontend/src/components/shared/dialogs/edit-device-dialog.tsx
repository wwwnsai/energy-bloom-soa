/* eslint-disable react/no-unescaped-entities */

"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../../ui/dialog";
import { updateDevice } from "@/../../energy-bloom-soa/backend/src/services/devices/devices.actions";
import { Device } from "../../../types/device";

interface EditDeviceDialogProps {
  device: Device;
}

const EditDeviceDialog = ({ device }: EditDeviceDialogProps) => {
  const [deviceName, setDeviceName] = useState(device.device_name);
  const [deviceType, setDeviceType] = useState(device.device_type);
  const [deviceCount, setDeviceCount] = useState(
    device.device_count.toString()
  );
  const [deviceUnitUsage, setDeviceUnitUsage] = useState(
    device.device_unit_usage.toString()
  );
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const data = await updateDevice({
        id: device.id,
        device_name: deviceName,
        device_type: deviceType,
        device_count: Number(deviceCount),
        device_unit_usage: Number(deviceUnitUsage),
      });

      console.log("Device updated successfully:", data);

      setIsDialogOpen(false);
    } catch (error: any) {
      console.error("Error updating device:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button className="flex flex-row gap-2 justify-between items-center rounded-lg px-3 py-2 bg-tertiary hover:bg-secondary transition-all duration-100">
          <Image
            src="/assets/icons/shared/edit-icon.svg"
            width={20}
            height={20}
            alt="edit icon"
            className="size-4"
          />
          <h2 className="text-[14px] font-semibold text-gray-600 mt-[0.15rem]">
            Edit Device
          </h2>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Device</DialogTitle>
          <DialogDescription>
            Update the details for the device "{deviceName}".
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Device Name"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            placeholder="Device Type"
            value={deviceType}
            onChange={(e) => setDeviceType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            placeholder="Device Count"
            value={deviceCount}
            onChange={(e) => setDeviceCount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            placeholder="Device Unit Usage"
            value={deviceUnitUsage}
            onChange={(e) => setDeviceUnitUsage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <DialogFooter>
            <DialogClose asChild>
              <button type="button" className="mr-4">
                Cancel
              </button>
            </DialogClose>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-black-1 px-4 py-2 rounded-lg"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDeviceDialog;
