"use client";

import { createContext, useContext, useState } from "react";

// Define the initial form data structure
const initialFormData = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  address: "",
  apt_number: "",
  gender: "",
  date_of_birth: "",
  insurance_company: "",
  member_id: "",
  reasons: [] as string[],
  sensory_symptoms: [] as string[],
  ethnicity: "",
  ordering_physician: "",
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
export const TestFormProvider = ({ children }) => {
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
export const useTestFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a TestFormProvider");
  }
  return context;
};
