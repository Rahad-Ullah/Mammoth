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

const AddNewUserPage = () => {
  const [role, setRole] = React.useState("admin");
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [signaturePreview, setSignaturePreview] = React.useState<string | null>(
    null
  );

  const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  const formSchema = z
    .object({
      image: z
        .any()
        .refine((file) => file, "Image is required.") // Required
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
          "Only .jpg, .jpeg, .png and .webp formats are supported."
        ),
      signature: z
        .any()
        .optional()
        .transform((file) => (file === null ? "" : file)) // Convert null to empty string
        .refine(
          (file) => !file || file?.size <= MAX_FILE_SIZE,
          "Max image size is 5MB."
        )
        .refine(
          (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
          "Only .jpg, .jpeg, .png, and .webp formats are supported."
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
      npi_number: z.string().optional(), // Optional by default for non-doctors
      apt_number: z.string().optional(), // Optional by default for non-doctors
    })

    .superRefine((data, ctx) => {
      if (role === "doctor") {
        // Validate NPI number for doctors
        if (!data.npi_number || data.npi_number.trim() === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["npi_number"],
            message: "Must be a valid NPI number.",
          });
        } else if (data.npi_number.length < 15) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_small,
            path: ["npi_number"],
            message: "Must be at least 15 characters.",
            type: "string",
            minimum: 15,
            inclusive: true,
          });
        }

        // Validate ATP number for doctors
        if (!data.apt_number || data.apt_number.trim() === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["apt_number"],
            message: "Must be a valid APT number.",
          });
        } else if (data.apt_number.length < 5) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_small,
            path: ["apt_number"],
            message: "Must be at least 5 characters.",
            type: "string",
            minimum: 5,
            inclusive: true,
          });
        }

        // Validate Signature for doctors
        if (!data.signature || data.signature === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["signature"],
            message: "Signature is required.",
          });
        }
      }
    });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: null,
      signature: null,
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      company: "",
      npi_number: "",
      apt_number: "",
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

            {/* Company Name Field */}
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

            {/* NPI Number for only doctor */}
            {role === "doctor" && (
              <FormField
                control={form.control}
                name="npi_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NPI Number</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="123456789000000"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* APT Number for only doctor */}
            {role === "doctor" && (
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
            )}

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
                          setImagePreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </FormControl>
                  {imagePreview && (
                    <Image
                      src={imagePreview}
                      alt="Image Preview"
                      width={160}
                      height={160}
                      className="mt-2 w-32 h-32 object-cover rounded-md"
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Signature image Upload Field */}
            {role === "doctor" && (
              <FormField
                control={form.control}
                name="signature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Signature</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file);
                            setSignaturePreview(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </FormControl>
                    {signaturePreview && (
                      <Image
                        src={signaturePreview}
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
            )}

            {/* submit button */}
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
