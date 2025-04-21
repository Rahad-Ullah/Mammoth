"use client";

import { Button } from "@/components/ui/button";
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
import { facilityTypes } from "@/constants/facilityStatuses";
import { useFacilityFormContext } from "@/contexts/facilityFormContext";
import { addFacilityFormSchema } from "@/schemas/formSchemas/addFacilityForm";
import { capitalizeSentence } from "@/utils/capitalizeSentence";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Step1 = ({ nextStep, representatives }) => {
  const formContext = useFacilityFormContext();

  const { formData, setFormData } = formContext;

  // 1. Define your form schema.
  const formSchema = addFacilityFormSchema();

  // 2. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  // 3. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setFormData({ ...formData, ...values });
    nextStep();
  }

  return (
    <div className="grid gap-8">
      <section>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 lg:space-y-0 lg:grid gap-6"
          >
            {/* Facility Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facility Name</FormLabel>
                  <FormControl>
                    <Input placeholder="ABC Facility" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Name Field */}
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
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

            {/* Suite Field */}
            <FormField
              control={form.control}
              name="suite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Suite</FormLabel>
                  <FormControl>
                    <Input placeholder="Suite 200" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notification email 1 */}
            <FormField
              control={form.control}
              name="notificationEmail1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notification Email 1</FormLabel>
                  <FormControl>
                    <Input placeholder="example@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notification email 2 */}
            <FormField
              control={form.control}
              name="notificationEmail2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notification Email 2</FormLabel>
                  <FormControl>
                    <Input placeholder="example@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fax Field */}
            <FormField
              control={form.control}
              name="fax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fax</FormLabel>
                  <FormControl>
                    <Input placeholder="111-111-1111" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Account Type Field */}
            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="capitalize">
                      {facilityTypes.map((item) => (
                        <SelectItem key={item} value={item}>
                          {capitalizeSentence(item)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Account Type Field */}
            <FormField
              control={form.control}
              name="representative"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Representative</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a person" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="capitalize">
                      {representatives.map((item) => (
                        <SelectItem key={item?._id} value={item?._id}>
                          {capitalizeSentence(item?.name)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* submit button */}
            <div className="col-span-2 flex justify-end gap-4">
              <Button type="submit" className="md:px-6">
                Next <ChevronRight />
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </div>
  );
};

export default Step1;
