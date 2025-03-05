"use client";

import React from "react";
import { useFormContext } from "@/contexts/FormContext";
import Step1 from "@/components/multiStepForms/addTestForm/Step1";
import Step2 from "@/components/multiStepForms/addTestForm/Step2";
import Step3 from "@/components/multiStepForms/addTestForm/Step3";
import Step4 from "@/components/multiStepForms/addTestForm/Step4";
import Step5 from "@/components/multiStepForms/addTestForm/Step5";
import Step6 from "@/components/multiStepForms/addTestForm/Step6";
import { Progress } from "@/components/ui/progress";

const AddNewTestPage = () => {
  const { step, setStep } = useFormContext();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const resetStep = () => setStep(1);

  return (
    <div className="bg-white p-6 rounded-xl grid gap-6 h-full">
      <div className="grid gap-2">
        <div className="flex justify-between gap-4 text-zinc-500">
          <h1 className="text-xl text-primary">Patient Details</h1>
          <span>{step}/6</span>
        </div>
        <Progress value={(100 / 6) * step} className="h-1 bg-zinc-200" />
      </div>
      <div className="">
        {step === 1 && <Step1 nextStep={nextStep} />}
        {step === 2 && <Step2 prevStep={prevStep} nextStep={nextStep} />}
        {step === 3 && <Step3 prevStep={prevStep} nextStep={nextStep} />}
        {step === 4 && <Step4 prevStep={prevStep} nextStep={nextStep} />}
        {step === 5 && <Step5 prevStep={prevStep} nextStep={nextStep} />}
        {step === 6 && <Step6 prevStep={prevStep} resetStep={resetStep} />}
      </div>
    </div>
  );
};

export default AddNewTestPage;
