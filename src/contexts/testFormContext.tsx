"use client";

import { createContext, useContext, useState } from "react";

interface IDiease {
  name: string;
  disorders: {
    name: string;
  }[];
}
interface IDiagnosis {
  content: string;
  type: string;
}
interface IClinicalSymptom {
  title: string;
  disorders: {
    name: string;
    sides: string[];
  }[];
}

// Define the initial form data structure
const initialFormData = {
  patient_info: {
    firstname: "Delware",
    lastname: "Hossen",
    email: "delware@gmail.com",
    phone: "01234567890",
    address: "Bansree, Dhaka",
    aptNumber: "12345",
    gender: "Male",
    dateOfBirth: "1990-05-15",
    insuranceCompany: "ABC Health Insurance",
    memberId: "1234565",
    reasonsForVisit: ["Routine Checkup", "Mild Fever"] as string[],
    sensorySymptoms: ["Tingling in Hands"] as string[],
    ethnicity: "Asian",
    orderingPhysician: "67d7d5c43ec57598786279af",
  },
  report_info: {
    dieases: [] as IDiease[],
    medical_terms: [] as IDiagnosis[],
    clinical_symptoms: [] as IClinicalSymptom[],
    facility_location: "",
    ordering_provider: "",
  },
  biopsy_info: [],
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
  const [step, setStep] = useState(5);

  // console.log(formData);

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
