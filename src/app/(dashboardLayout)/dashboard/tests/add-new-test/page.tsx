"use client";

import React from "react";
import { useFormContext } from "@/contexts/FormContext";
import Step1 from "@/components/multiStepForms/addTestForm/Step1";

const AddNewTestPage = () => {
  const { step, setStep } = useFormContext();

  const nextStep = () => setStep(step + 1);
  // const prevStep = () => setStep(step - 1);

  return <>{step === 1 && <Step1 nextStep={nextStep} />}</>;
};

export default AddNewTestPage;
