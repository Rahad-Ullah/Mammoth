"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

type TModalProps = {
  action?: () => void;
  btnVariant?:
    | "secondary"
    | "ghost"
    | "destructive"
    | "link"
    | "outline"
    | "default"
    | null
    | undefined;
};

const AddModalButton = ({ action, btnVariant }: TModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={btnVariant}>
          <Plus /> Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New option for this category</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input placeholder="Enter option name" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant={btnVariant}
              type="submit"
              onClick={action}
              className="w-full"
            >
              Add Option
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddModalButton;
