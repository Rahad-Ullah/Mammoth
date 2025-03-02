"use client";

import React from "react";
import { useFormContext } from "@/contexts/FormContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const CreateTestModal = () => {
  const { step, setStep } = useFormContext();

  const nextStep = () => setStep(step + 1);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"default"}>
          <FilePlus /> Intake
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-8">
        {step === 1 && (
          <div className="grid gap-8">
            <DialogHeader>
              <DialogTitle>Would you like to start a new intake?</DialogTitle>
            </DialogHeader>
            <DialogFooter className="flex-row gap-6">
              <DialogClose asChild>
                <Button variant={"outline"} className="w-full">
                  No
                </Button>
              </DialogClose>
              <Button
                variant={"default"}
                type="submit"
                onClick={nextStep}
                className="w-full"
              >
                Yes
              </Button>
            </DialogFooter>
          </div>
        )}

        {step === 2 && (
          <div>
            <DialogHeader>
              <DialogTitle></DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <div className="space-y-6">
                <Button
                  variant={"default"}
                  onClick={nextStep}
                  className="w-full"
                >
                  Full Intake (Recommended)
                </Button>
                <Button variant={"outline"} className="w-full">
                  Quick Intake
                </Button>
              </div>
            </DialogFooter>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-6">
            <DialogHeader>
              <DialogTitle>Location in the system to Facility.</DialogTitle>
            </DialogHeader>
            <div>
              <Input placeholder="Enter location" />
            </div>
            <DialogFooter>
              <Link href={`/dashboard/tests/add-new-test`} className="w-full">
                <Button className="w-full">Confirm</Button>
              </Link>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateTestModal;
