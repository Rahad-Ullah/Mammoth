"use client";

import Step1 from "@/components/multiStepForms/addFacilityForm/Step1";
import Step2 from "@/components/multiStepForms/addFacilityForm/Step2";
import Step3 from "@/components/multiStepForms/addFacilityForm/Step3";
import Step4 from "@/components/multiStepForms/addFacilityForm/Step4";
import { Progress } from "@/components/ui/progress";
import { useFacilityFormContext } from "@/contexts/facilityFormContext";

const AddFacilityForm = ({ representatives = [] }) => {
  const { step, setStep } = useFacilityFormContext();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="bg-white p-6 rounded-xl flex flex-col gap-6 h-full">
      <div className="grid gap-2">
        <div className="flex justify-between gap-4 text-zinc-500">
          <h1 className="text-xl text-primary">Facility Details</h1>
          <span>{step}/4</span>
        </div>
        <Progress value={(100 / 4) * step} className="h-1 bg-zinc-200" />
      </div>
      <div>
        {step === 1 && (
          <Step1 nextStep={nextStep} representatives={representatives} />
        )}
        {step === 2 && <Step2 prevStep={prevStep} nextStep={nextStep} />}
        {step === 3 && <Step3 prevStep={prevStep} nextStep={nextStep} />}
        {step === 4 && <Step4 prevStep={prevStep} />}
      </div>
    </div>
  );
};

export default AddFacilityForm;
