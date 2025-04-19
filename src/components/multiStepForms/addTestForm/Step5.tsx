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
  type: string;
  sides: string[];
}

interface AccordionItemType {
  id: number;
  title: string;
  disorders: Disorder[];
}

const Step5 = ({
  prevStep,
  nextStep,
}: {
  prevStep: () => void;
  nextStep: () => void;
}) => {
  const [selectedDisorders, setSelectedDisorders] = useState<
    { title: string; disorders: Disorder[] }[]
  >([]);

  // Handle the checkbox change and update selected disorders
  const handleCheckboxChange = (
    accordionTitle: string,
    disorderType: string,
    side: string,
    checked: boolean
  ) => {
    setSelectedDisorders((prevSelected) => {
      const existingItem = prevSelected.find(
        (item) => item.title === accordionTitle
      );

      // If the item doesn't exist, add it
      if (!existingItem) {
        return [
          ...prevSelected,
          {
            title: accordionTitle,
            disorders: checked ? [{ type: disorderType, sides: [side] }] : [],
          },
        ];
      }

      // If the item exists, update it
      const updatedDisorders = existingItem.disorders.map((disorder) => {
        if (disorder.type === disorderType) {
          // If side is already selected, remove it
          if (checked) {
            return {
              ...disorder,
              sides: [...new Set([...disorder.sides, side])], // Ensure no duplicates
            };
          } else {
            return {
              ...disorder,
              sides: disorder.sides.filter((item) => item !== side),
            };
          }
        }
        return disorder;
      });

      // If the disorder does not exist in the list, add it
      if (!existingItem.disorders.find((d) => d.type === disorderType)) {
        updatedDisorders.push({
          type: disorderType,
          sides: checked ? [side] : [],
        });
      }

      // Replace the old item with the updated one
      return prevSelected.map((item) =>
        item.title === accordionTitle
          ? { ...item, disorders: updatedDisorders }
          : item
      );
    });
  };

  return (
    <div className="grid gap-8">
      {/* Body section */}
      <div className="flex flex-col-reverse lg:flex-row gap-8">
        <section className="w-full lg:w-2/3">
          <Accordion type="single" collapsible className="w-full grid gap-4">
            {disorderTypes.painTypes.map((item: AccordionItemType) => (
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
                  <div className="grid gap-6">
                    {item.disorders.map((disorder) => (
                      <div key={disorder.type} className="grid gap-4">
                        <p className="text-stone-700">{disorder.type}</p>
                        <div className="flex items-center gap-4 ml-8">
                          {/* Checkbox for "Both" side */}
                          <span className="flex items-center gap-2">
                            <Checkbox
                              id={disorder.type + "-Both"}
                              value={disorder.type}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange(
                                  item.title,
                                  disorder.type,
                                  "Both",
                                  !!checked
                                )
                              }
                            />
                            <Label
                              htmlFor={disorder.type + "-Both"}
                              className="text-sm text-stone-600 font-normal"
                            >
                              Both Sides
                            </Label>
                          </span>

                          {/* Checkbox for "Left" side */}
                          <span className="flex items-center gap-2">
                            <Checkbox
                              id={disorder.type + "-Left"}
                              value={disorder.type}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange(
                                  item.title,
                                  disorder.type,
                                  "Left",
                                  !!checked
                                )
                              }
                            />
                            <Label
                              htmlFor={disorder.type + "-Left"}
                              className="text-sm text-stone-600 font-normal"
                            >
                              Left Side
                            </Label>
                          </span>

                          {/* Checkbox for "Right" side */}
                          <span className="flex items-center gap-2">
                            <Checkbox
                              id={disorder.type + "-Right"}
                              value={disorder.type}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange(
                                  item.title,
                                  disorder.type,
                                  "Right",
                                  !!checked
                                )
                              }
                            />
                            <Label
                              htmlFor={disorder.type + "-Right"}
                              className="text-sm text-stone-600 font-normal"
                            >
                              Right Side
                            </Label>
                          </span>

                          {/* Checkbox for "Middle" side */}
                          <span className="flex items-center gap-2">
                            <Checkbox
                              id={disorder.type + "-Middle"}
                              value={disorder.type}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange(
                                  item.title,
                                  disorder.type,
                                  "Middle",
                                  !!checked
                                )
                              }
                            />
                            <Label
                              htmlFor={disorder.type + "-Middle"}
                              className="text-sm text-stone-600 font-normal"
                            >
                              Middle
                            </Label>
                          </span>
                        </div>
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

export default Step5;
