"use client";

import React from "react";
import { useFormContext } from "@/contexts/FormContext";
import Step1 from "@/components/multiStepForms/addTestForm/Step1";
import Step2 from "@/components/multiStepForms/addTestForm/Step2";
import Step3 from "@/components/multiStepForms/addTestForm/Step3";
import Step4 from "@/components/multiStepForms/addTestForm/Step4";
import Step5 from "@/components/multiStepForms/addTestForm/Step5";
import Step6 from "@/components/multiStepForms/addTestForm/Step6";

const AddNewTestPage = () => {
  const { step, setStep } = useFormContext();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const resetStep = () => setStep(1);

  return (
    <div className="bg-white p-6 rounded-xl">
      {step === 1 && <Step1 nextStep={nextStep} />}
      {step === 2 && <Step2 prevStep={prevStep} nextStep={nextStep} />}
      {step === 3 && <Step3 prevStep={prevStep} nextStep={nextStep} />}
      {step === 4 && <Step4 prevStep={prevStep} nextStep={nextStep} />}
      {step === 5 && <Step5 prevStep={prevStep} nextStep={nextStep} />}
      {step === 6 && <Step6 prevStep={prevStep} resetStep={resetStep} />}
    </div>
  );
};

export default AddNewTestPage;
