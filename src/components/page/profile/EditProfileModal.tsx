"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown, Pencil } from "lucide-react";
import ImageUpload from "./ImageUpload";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { editUserFormSchema } from "@/schemas/formSchemas/editUserForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { facilitiesData } from "@/constants/facilities";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

const EditProfileModal = () => {
  const [file, setFile] = useState<File | string | null>(
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
  );

  // 1. Define your form schema.
  const formSchema = editUserFormSchema();

  // 2. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      apt_number: "",
      facility_location: "",
    },
  });

  // 3. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="shadow-lg text-primary">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[80vw] grid gap-6">
        <DialogHeader>
          <DialogTitle className="text-primary font-medium text-xl">
            Edit Profile
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Label>Upload Profile Image</Label>
          <ImageUpload file={file} setFile={setFile} />
        </div>
        <section>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 lg:space-y-0 lg:grid gap-6"
            >
              {/* First Name Field */}
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name Field */}
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="me@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number Field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address Field */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Road City State " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* APT Number for only doctor */}
              <FormField
                control={form.control}
                name="apt_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>APT Number</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* facility location */}
              <FormField
                control={form.control}
                name="facility_location"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 mt-0.5 col-span-2">
                    <FormLabel>Facility Location</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? facilitiesData.find(
                                  (items) => items.address === field.value
                                )?.address
                              : "Select location"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="min-w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search location..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No location found.</CommandEmpty>
                            <CommandGroup>
                              {facilitiesData.map((item) => (
                                <CommandItem
                                  value={item.address}
                                  key={item.id}
                                  onSelect={() => {
                                    form.setValue(
                                      "facility_location",
                                      item.address
                                    );
                                    form.clearErrors("facility_location");
                                  }}
                                >
                                  {item.address}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      item.address === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* submit button */}
              <DialogFooter className="col-span-2">
                <Button type="submit" className="md:px-16">
                  Save & Change
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </section>
        {/* <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" className="w-full">
              Add Option
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
