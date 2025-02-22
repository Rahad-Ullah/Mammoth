"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { capitalizeSentence } from "@/utils/capitalizeSentence";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const userRoles = [
  {
    id: 1,
    title: "Admin",
    value: "admin",
  },
  {
    id: 2,
    title: "Doctor",
    value: "doctor",
  },
  {
    id: 3,
    title: "Pathologist",
    value: "pathologist",
  },
  {
    id: 4,
    title: "Histologist",
    value: "histologist",
  },
  {
    id: 5,
    title: "Representative",
    value: "representative",
  },
];

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  image: z
    .any()
    .refine((file) => file, "Image is required.") // Required
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  first_name: z.string().min(2, {
    message: "Must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Must be at least 2 characters.",
  }),
  email: z.string().email().min(1, {
    message: "Must be a valid email address.",
  }),
  phone: z.string().min(10).max(14, {
    message: "Must be a valid phone number.",
  }),
  address: z.string().min(3, {
    message: "Must be at least 3 characters.",
  }),
  company: z.string().min(3, {
    message: "Must be at least 3 characters.",
  }),
});

const AddNewUserPage = () => {
  const [role, setRole] = React.useState("admin");
  const [preview, setPreview] = React.useState<string | null>(null);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: null,
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      company: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="grid gap-8">
      <section>
        <h3 className="text-sm font-medium mb-4">User Role</h3>
        <RadioGroup
          defaultValue={role}
          onValueChange={(value) => setRole(value)}
          className="flex flex-col md:flex-row gap-6"
        >
          {userRoles.map((userRole) => (
            <div key={userRole.id} className="flex items-center space-x-2">
              <RadioGroupItem
                value={userRole.value}
                id={userRole.value}
                className="size-5"
              />
              <Label htmlFor={userRole.value}>
                {capitalizeSentence(userRole.title)}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </section>

      <section>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
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

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Example Company Ltd" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload Field */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Profile Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                          setPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </FormControl>
                  {preview && (
                    <Image
                      src={preview}
                      alt="Preview"
                      width={160}
                      height={160}
                      className="mt-2 w-32 h-32 object-cover rounded-md"
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-2">
              <Button type="submit" className="md:px-10">
                Confirm
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </div>
  );
};

export default AddNewUserPage;
