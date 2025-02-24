"use client";

import { createContext, useContext, useState } from "react";

// Define the initial form data structure
const initialFormData = {
  facility_name: "",
  contact_name: "",
  email: "",
  phone: "",
  address: "",
  suite: "",
  fax: "",
  notify_email_1: "",
  notify_email_2: "",
  account_type: "",
};

// Define the form context type
interface FormContextType {
  formData: typeof initialFormData;
  initialFormData: typeof initialFormData;
  setFormData: React.Dispatch<React.SetStateAction<typeof initialFormData>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

// Create context
const FormContext = createContext<FormContextType | null>(null);

// Create Provider Component
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [step, setStep] = useState(1);

  return (
    <FormContext.Provider
      value={{ formData, setFormData, step, setStep, initialFormData }}
    >
      {children}
    </FormContext.Provider>
  );
};

// Custom Hook to use form context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
