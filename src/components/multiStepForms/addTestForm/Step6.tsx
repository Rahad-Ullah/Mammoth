import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Trash, XIcon } from "lucide-react";
import AnatomyWrapper from "@/components/page/testDetails/anatomy/anatomyWrapper";
import { addBiopsySampleFormSchema } from "@/schemas/formSchemas/addBiopsySampleForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { anatomyPointsData } from "@/constants/anatomyPointsData";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useRouter } from "next/navigation";

const formSchema = addBiopsySampleFormSchema();

const Step6 = ({
  prevStep,
  resetStep,
}: {
  prevStep: () => void;
  resetStep: () => void;
}) => {
  const [sampleSites, setSampleSites] = React.useState<
    { area: string; side: string; specimen_id: string }[]
  >([]);
  const router = useRouter();

  // format a unique list of sample area
  const sampleAreas = [
    ...new Set(
      anatomyPointsData.map((item) =>
        JSON.stringify({
          location: item.sample_area,
          abbreviation: item.abbreviation,
        })
      )
    ),
  ].map((item) => JSON.parse(item));

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      area: "",
      side: "",
      specimen_id: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    setSampleSites([...sampleSites, values]);
  }

  const handleSubmit = () => {
    resetStep();
    router.push(`/dashboard/tests`);
  };
  return (
    <div className="grid gap-8">
      {/* Body section */}
      <div className="flex flex-col-reverse lg:flex-row gap-8">
        <section className="w-full lg:w-2/3 grid gap-6">
          {/* biopsy samples */}
          <div className="bg-muted p-6 rounded-xl">
            <div>
              <ul className="text-zinc-500 grid gap-4 w-full">
                {sampleSites.map((item, idx: number) => (
                  <li key={idx} className="flex flex-wrap justify-between">
                    <p>
                      {idx + 1}. Sample taken from{" "}
                      <span className="text-primary font-medium">
                        (
                        {
                          sampleAreas.find((item) => item.area === item.area)
                            .abbreviation
                        }
                        ) {item.area}
                      </span>{" "}
                      <span className="text-red-500 capitalize">
                        {item.side}
                      </span>{" "}
                      Side
                    </p>
                    <p className="text-sm text-zinc-400 flex items-center gap-4">
                      Specimen Id: {item.specimen_id}
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="text-destructive"
                      >
                        <Trash />
                      </Button>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            {sampleSites.length > 0 && <Separator className="my-6" />}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-6"
              >
                {/* area */}
                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Sample Area</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select a sample area" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sampleAreas.map((area) => (
                            <SelectItem
                              key={area.location}
                              value={area.location}
                            >
                              {area.location} ({area.abbreviation})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* area side */}
                <FormField
                  control={form.control}
                  name="side"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Sample Side</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select a side " />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem key="Left" value="Left">
                            Left
                          </SelectItem>
                          <SelectItem key="Right" value="Right">
                            Right
                          </SelectItem>
                          <SelectItem key="Both" value="Both">
                            Both
                          </SelectItem>
                          <SelectItem key="Middle" value="Middle">
                            Middle
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* specimen Id */}
                <FormField
                  control={form.control}
                  name="specimen_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specimen Id</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter specimen ID"
                          {...field}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* submit button */}
                <Button type="submit">Add Site</Button>
              </form>
            </Form>
          </div>

          {/* ICD codes */}
          <div className="grid gap-4">
            <h3>
              Please remove any of the following that dont apply and add
              whatever you would like{" "}
            </h3>
            <div className="bg-muted p-6 rounded-xl flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-2 bg-background p-2 rounded-lg w-fit">
                <span>G60.3</span>{" "}
                <XIcon
                  size={20}
                  className="text-red-500/80 hover:text-destructive cursor-pointer"
                />
              </span>
              <span className="flex items-center gap-2 bg-background p-2 rounded-lg w-fit">
                <span>G60.3</span>{" "}
                <XIcon
                  size={20}
                  className="text-red-500/80 hover:text-destructive cursor-pointer"
                />
              </span>
            </div>
          </div>
        </section>
        <section className="flex-1">
          <AnatomyWrapper testPoints={[]} />
        </section>
      </div>

      {/* Submit buttons */}
      <section className="flex justify-end gap-4">
        <Button onClick={prevStep} className="md:px-6">
          <ChevronLeft /> Back
        </Button>
        <Button onClick={handleSubmit} className="md:px-6">
          Submit <ChevronRight />
        </Button>
      </section>
    </div>
  );
};

export default Step6;
