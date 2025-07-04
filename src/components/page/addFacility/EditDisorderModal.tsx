/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchResponse } from "@/utils/myFetch";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type TModalProps = {
  diseaseIdx: number;
  disorderIdx: number;
  inputValue: any;
  action?: (
    item: string,
    diseaseIdx: number,
    disorderIdx: number
  ) => Promise<FetchResponse> | any;
  triggerBtn: React.ReactNode;
  btnVariant?:
    | "secondary"
    | "ghost"
    | "destructive"
    | "link"
    | "outline"
    | "default"
    | null
    | undefined;
  title?: string;
  placeholderText?: string;
  btnText?: string;
};

// Define the form schema using zod
const editOptionSchema = z.object({
  option: z.string().min(1, "Option is required"),
});

const EditDisorderModal = ({
  diseaseIdx,
  disorderIdx,
  inputValue,
  triggerBtn,
  action,
  btnVariant = "default",
  title = "Edit Option",
  btnText = "Save",
  placeholderText = "Enter option",
}: TModalProps) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof editOptionSchema>>({
    resolver: zodResolver(editOptionSchema),
  });
  // set form input default value
  setValue("option", inputValue);

  // handle submit
  const onSubmit = async (data: { option: string }) => {
    if (action) {
      await action(data?.option, diseaseIdx, disorderIdx); // Call the action callback with the form data
      setOpen(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {triggerBtn}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div>
            <Input placeholder={placeholderText} {...register("option")} />
            {errors.option && (
              <p className="text-red-500 text-sm mt-1">
                {errors.option.message} {/* Display validation error */}
              </p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild onClick={() => setOpen(false)}>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button variant={btnVariant} type="submit">
              {btnText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDisorderModal;
