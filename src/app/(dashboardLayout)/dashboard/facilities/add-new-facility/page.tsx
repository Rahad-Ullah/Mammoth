"use client";

import React from "react";

import Step1 from "@/components/multiStepForms/addFacilityForm/Step1";
import { useFormContext } from "@/contexts/FormContext";
import Step2 from "@/components/multiStepForms/addFacilityForm/Step2";
import Step3 from "@/components/multiStepForms/addFacilityForm/Step3";

const AddNewFacilityPage = () => {
  const { step, setStep, formData } = useFormContext();
  console.log(formData);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <>
      {step === 1 && <Step1 nextStep={nextStep} />}
      {step === 2 && <Step2 prevStep={prevStep} nextStep={nextStep} />}
      {step === 3 && <Step3 prevStep={prevStep} nextStep={nextStep} />}
    </>
  );
};

export default AddNewFacilityPage;
