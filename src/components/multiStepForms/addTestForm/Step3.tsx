import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnatomyWrapper from "@/components/page/testDetails/anatomy/anatomyWrapper";
import { facilityOptions } from "@/constants/facilityOptions";

interface Disorder {
  id: number;
  title: string;
}

const Step3 = ({
  prevStep,
  nextStep,
}: {
  prevStep: () => void;
  nextStep: () => void;
}) => {
  // State to hold selected disorders (simplified structure)
  const [selectedDisorderOptions, setSelectedDisorderOptions] = useState<
    Disorder[]
  >([]);

  console.log(selectedDisorderOptions);

  // Function to handle checkbox change
  const handleCheckboxChange = (
    facilityId: number,
    facilityTitle: string,
    checked: boolean
  ) => {
    setSelectedDisorderOptions((prevSelected) => {
      // If the checkbox is checked, add the facility to the selectedDisorders
      if (checked) {
        return [...prevSelected, { id: facilityId, title: facilityTitle }];
      } else {
        // If the checkbox is unchecked, remove the facility from the selectedDisorders
        return prevSelected.filter((item) => item.id !== facilityId);
      }
    });
  };

  return (
    <div className="grid gap-8">
      {/* Body section */}
      <div className="flex flex-col-reverse lg:flex-row gap-8">
        <section className="w-full lg:w-2/3">
          <div className="grid gap-4">
            {facilityOptions.facilityTypes.map((item) => (
              <div key={item.id} className="flex items-center gap-2">
                {/* Render checkboxes for each facility */}
                <Checkbox
                  id={item.title}
                  value={item.title}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(item.id, item.title, !!checked)
                  }
                />
                <Label htmlFor={item.title} className="text-sm text-stone-600">
                  {item.title}
                </Label>
              </div>
            ))}
          </div>
        </section>

        <section className="flex-1">
          {/* Anatomy Wrapper can be placed here */}
          <AnatomyWrapper testPoints={[]} />
        </section>
      </div>

      {/* Submit buttons */}
      <div className="flex justify-end gap-4">
        <Button onClick={prevStep} className="md:px-6">
          <ChevronLeft /> Back
        </Button>
        <Button onClick={nextStep} className="md:px-6">
          Next <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default Step3;
