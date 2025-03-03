import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { disorderTypes } from "@/constants/disorderTypes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnatomyWrapper from "@/components/page/testDetails/anatomy/anatomyWrapper";

interface Disorder {
  title: string;
  disorders: string[];
}

const Step2 = ({
  prevStep,
  nextStep,
}: {
  prevStep: () => void;
  nextStep: () => void;
}) => {
  const [selectedDisorders, setSelectedDisorders] = useState<Disorder[]>([]);
  console.log(selectedDisorders);

  const handleCheckboxChange = (itemTitle, disorderType, checked) => {
    setSelectedDisorders((prevSelected) => {
      // Check if the item already exists
      const existingItem = prevSelected.find(
        (item) => item.title === itemTitle
      );

      // If the item doesn't exist, add it
      if (!existingItem) {
        return [
          ...prevSelected,
          {
            title: itemTitle,
            disorders: checked ? [disorderType] : [],
          },
        ];
      }

      // If the item exists, update it
      const updatedItem = {
        ...existingItem,
        disorders: checked
          ? [...existingItem.disorders, disorderType]
          : existingItem.disorders.filter((type) => type !== disorderType),
      };

      // Replace the old item with the updated one
      return prevSelected.map((item) =>
        item.title === itemTitle ? updatedItem : item
      );
    });
  };

  return (
    <div className="grid gap-8">
      {/* body */}
      <div className="flex flex-col-reverse lg:flex-row gap-8">
        <section className="w-full lg:w-2/3">
          <Accordion type="single" collapsible className="w-full grid gap-2">
            {disorderTypes.painTypes.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id.toString()}
                className="border-none"
              >
                <div className="flex justify-between items-center gap-2">
                  <div className="bg-zinc-100 rounded-lg w-full p-4 flex items-center gap-4">
                    <p className="font-medium flex items-center gap-5">
                      {item.title}
                      <span className="text-xs font-medium text-zinc-400">
                        {item.disorders.length} items
                      </span>
                    </p>
                  </div>
                  <AccordionTrigger className="bg-zinc-100 p-5 rounded-lg"></AccordionTrigger>
                </div>
                <AccordionContent className="p-2 md:p-5 lg:pr-20">
                  <div className="grid gap-4 md:gap-2">
                    {item.disorders.map((disorder) => (
                      <div
                        key={disorder.id}
                        className="flex items-center gap-2"
                      >
                        <Checkbox
                          id={disorder.type}
                          value={disorder.type}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              item.title,
                              disorder.type,
                              checked
                            )
                          }
                        />
                        <Label
                          htmlFor={disorder.type}
                          className="text-sm text-stone-600"
                        >
                          {disorder.type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
        <section className="flex-1">
          <AnatomyWrapper testPoints={[]} />
        </section>
      </div>

      {/* submit button */}
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

export default Step2;
