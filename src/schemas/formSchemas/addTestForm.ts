import { z } from "zod";

// zod validation schema for add user form
export const addTestFormSchema = () => {
  return z.object({
    first_name: z.string().min(3, {
      message: "Must be at least 3 characters.",
    }),
    last_name: z.string().min(3, {
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
    apt_number: z.string().min(5, {
      message: "Must be at least 5 digits.",
    }),
    gender: z.string().min(3, {
      message: "Must be at least 3 characters.",
    }),
    date_of_birth: z.string().min(1, {
      message: "Must be a valid date.",
    }),
    insurance_company: z.string().min(2, {
      message: "Must be at least 2 characters.",
    }),
    member_id: z.string().min(10, {
      message: "Must be at least 10 digits.",
    }),
    reasons: z
      .array(z.string())
      .min(1, { message: "At least one reason is required" }),
    sensory_symptoms: z
      .array(z.string())
      .min(1, { message: "At least one symptom is required" }),
    ethnicity: z.string().min(1, {
      message: "Must be select at least 1 options.",
    }),
    ordering_physician: z.string().min(1, {
      message: "Must be select at least 1 options.",
    }),
  });
};
