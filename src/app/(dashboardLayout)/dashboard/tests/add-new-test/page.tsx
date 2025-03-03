"use client";

import React from "react";
import { useFormContext } from "@/contexts/FormContext";
import Step1 from "@/components/multiStepForms/addTestForm/Step1";
import Step2 from "@/components/multiStepForms/addTestForm/Step2";

const AddNewTestPage = () => {
  const { step, setStep } = useFormContext();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <>
      {step === 1 && <Step1 nextStep={nextStep} />}
      {step === 2 && <Step2 prevStep={prevStep} nextStep={nextStep} />}
    </>
  );
};

export default AddNewTestPage;
