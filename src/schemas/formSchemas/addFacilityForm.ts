import { z } from "zod";

// zod validation schema for add user form
export const addFacilityFormSchema = () => {
  return z.object({
    facility_name: z.string().min(3, {
      message: "Must be at least 3 characters.",
    }),
    contact_name: z.string().min(3, {
      message: "Must be at least 3 characters.",
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
    suite: z.string().min(2, {
      message: "Must be at least 2 characters.",
    }),
    notify_email_1: z.string().email().min(1, {
      message: "Must be a valid email address.",
    }),
    notify_email_2: z.string().email().min(1, {
      message: "Must be a valid email address.",
    }),
    fax: z.string().min(10, {
      message: "Must be at least 10 digits.",
    }),
    account_type: z.string().min(1, {
      message: "Must be a valid account type.",
    }),
    status: z.enum(["active", "blocked"]).default("active"),
  });
};
