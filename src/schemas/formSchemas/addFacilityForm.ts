import { z } from "zod";

// zod validation schema for add user form
export const addFacilityFormSchema = () => {
  return z.object({
    name: z.string().min(3, {
      message: "Must be at least 3 characters.",
    }),
    contactName: z.string().min(3, {
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
    notificationEmail1: z.string().email().min(1, {
      message: "Must be a valid email address.",
    }),
    notificationEmail2: z.string().email().min(1, {
      message: "Must be a valid email address.",
    }),
    fax: z.string().min(10, {
      message: "Must be at least 10 digits.",
    }),
    accountType: z.string().min(1, {
      message: "Must be a valid account type.",
    }),
    representative: z.string().min(1, {
      message: "Must be a valid representative.",
    }),
  });
};
