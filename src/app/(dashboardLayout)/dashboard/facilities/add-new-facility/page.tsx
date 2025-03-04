"use client";

import React from "react";

import Step1 from "@/components/multiStepForms/addFacilityForm/Step1";
import { useFormContext } from "@/contexts/FormContext";
import Step2 from "@/components/multiStepForms/addFacilityForm/Step2";
import Step3 from "@/components/multiStepForms/addFacilityForm/Step3";
import Step4 from "@/components/multiStepForms/addFacilityForm/Step4";

const AddNewFacilityPage = () => {
  const { step, setStep } = useFormContext();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="bg-white p-6 rounded-xl h-full">
      {step === 1 && <Step1 nextStep={nextStep} />}
      {step === 2 && <Step2 prevStep={prevStep} nextStep={nextStep} />}
      {step === 3 && <Step3 prevStep={prevStep} nextStep={nextStep} />}
      {step === 4 && <Step4 prevStep={prevStep} />}
    </div>
  );
};

export default AddNewFacilityPage;
