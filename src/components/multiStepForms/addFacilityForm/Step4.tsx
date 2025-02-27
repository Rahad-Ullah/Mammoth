import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { disorderTypes } from "@/constants/disorderTypes";
import { useFormContext } from "@/contexts/FormContext";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Pencil,
  Plus,
  Trash,
} from "lucide-react";

const Step4 = ({ prevStep }) => {
  const { setStep, setFormData, initialFormData } = useFormContext();

  const handleSubmit = () => {
    // handle form submission
    console.log("Form submitted");
    setStep(1);
    setFormData(initialFormData);
  };

  return (
    <div className="h-full flex flex-col justify-between">
      {/* body */}
      <section className="py-6 flex-1">
        <Accordion type="single" collapsible className="w-full grid gap-2">
          {disorderTypes.painTypes.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id.toString()}
              className="border-none"
            >
              <div className="flex justify-between items-center gap-2">
                <div className="bg-zinc-100 rounded-lg w-full p-4 flex justify-between items-center gap-4">
                  <p className="font-medium flex items-center gap-5">
                    {item.title}
                    <span className="text-xs font-medium text-zinc-400">
                      {item.disorders.length} items
                    </span>
                  </p>
                  <div className="flex items-center gap-4">
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant={"secondary"} className="h-10">
                          <Plus /> Add
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>
                            New option for this category
                          </DialogTitle>
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
                </div>
                <AccordionTrigger className="bg-zinc-100 p-7 rounded-lg"></AccordionTrigger>
              </div>
              <AccordionContent className="p-2 md:p-5 lg:pr-20">
                <ul className="grid gap-4 md:gap-2">
                  {item.disorders.map((disorder) => (
                    <li
                      key={disorder.id}
                      className="flex justify-between items-center gap-2"
                    >
                      <p
                        className={`flex items-center gap-3 text-sm ${
                          disorder.isHidden
                            ? "text-stone-400"
                            : "text-stone-600"
                        } `}
                      >
                        <span className="size-3 min-w-3 bg-primary-foreground rounded-full"></span>{" "}
                        {disorder.type}
                      </p>
                      <div className="flex">
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          className="text-primary"
                        >
                          <Pencil />
                        </Button>
                        {!disorder.isHidden && (
                          <Button
                            variant={"ghost"}
                            size={"icon"}
                            className="text-zinc-500"
                          >
                            <Eye />
                          </Button>
                        )}
                        {disorder.isHidden && (
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
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* submit button */}
      <div className="col-span-2 flex justify-end gap-4">
        <Button onClick={prevStep} className="md:px-6">
          <ChevronLeft /> Back
        </Button>
        <Button onClick={handleSubmit} className="md:px-6">
          Submit <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default Step4;
