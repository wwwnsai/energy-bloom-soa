/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
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
import Image from "next/image";
import EditDeviceDialog from "./edit-device-dialog";
import { deleteDevice } from "@/../../energy-bloom-soa/backend/src/services/devices/devices.actions";
import { Device } from "../../../types/device";

interface EditOrDeleteDeviceDialogProps {
  device: Device;
}

const EditOrDeleteDeviceDialog = ({
  device,
}: EditOrDeleteDeviceDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteDevice = async () => {
    const data = await deleteDevice({
      id: device.id,
    });

    console.log("Device deleted:", data);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Image
          src="/assets/icons/shared/dots-vertical-icon.svg"
          alt="dots vertical icon"
          width={100}
          height={100}
          className="size-5"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Device</DialogTitle>
          <DialogDescription>
            Do you want to delete "{device.device_name}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <EditDeviceDialog device={device} />
          </DialogClose>
          <DialogClose asChild>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
              onClick={() => {
                handleDeleteDevice();
                setIsDialogOpen(false);
              }}
            >
              Delete
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrDeleteDeviceDialog;
