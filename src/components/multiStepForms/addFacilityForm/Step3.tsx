import { Button } from "@/components/ui/button";
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
import { facilityOptions } from "@/constants/facilityOptions";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Pencil,
  Plus,
  Trash,
} from "lucide-react";

const Step3 = ({ nextStep, prevStep }) => {
  // const { formData, setFormData } = useFormContext();

  return (
    <div className="h-full flex flex-col justify-between">
      {/* header options */}
      <section>
        <div className="col-span-2 flex justify-end gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"secondary"}>
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
                  <Button type="submit" className="w-full">
                    Add Option
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* body */}
      <section className="py-6 flex-1">
        <ul className="grid gap-2">
          {facilityOptions.facilityDetails.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center gap-2"
            >
              <p
                className={`flex items-center gap-3 text-sm ${
                  item.isHidden ? "text-stone-400" : "text-stone-600"
                } `}
              >
                <span className="size-3 bg-primary-foreground rounded-full"></span>{" "}
                {item.description}
              </p>
              <div>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="text-primary"
                >
                  <Pencil />
                </Button>
                {!item.isHidden && (
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="text-zinc-500"
                  >
                    <Eye />
                  </Button>
                )}
                {item.isHidden && (
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="text-zinc-500"
                  >
                    <EyeOff />
                  </Button>
                )}
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="text-red-500"
                >
                  <Trash />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* submit button */}
      <div className="col-span-2 flex justify-end gap-4">
        <Button onClick={prevStep} className="md:px-6">
          <ChevronLeft /> Back
        </Button>
        <Button onClick={nextStep} className="md:px-6">
          Next <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default Step3;
