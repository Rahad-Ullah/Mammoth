import AddDisorderModal from "@/components/page/addFacility/AddDisorderModal";
import EditDisorderModal from "@/components/page/addFacility/EditDisorderModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useFacilityFormContext } from "@/contexts/facilityFormContext";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Pencil,
  Plus,
  Trash,
} from "lucide-react";
import { useState } from "react";

const Step2 = ({ prevStep, nextStep, dieases }) => {
  const { formData, setFormData } = useFacilityFormContext();

  // Initialize local state for formatted diseases
  const [formatedDieses, setFormatedDieses] = useState(
    dieases?.map((item) => ({
      name: item?.name,
      isHidden: false,
      disorders: item?.disorders?.map((nestedItem) => ({
        name: nestedItem?.name,
        isHidden: false,
      })),
    }))
  );

  // Toggle visibility of a disease
  const toggleDiesesVisibility = (idx: number) => {
    setFormatedDieses((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, isHidden: !item.isHidden } : item
      )
    );
  };

  // Toggle visibility of a disorder (nested item)
  const toggleDisorderVisibility = (
    diseaseIdx: number,
    disorderIdx: number
  ) => {
    setFormatedDieses((prev) =>
      prev.map((disease, i) =>
        i === diseaseIdx
          ? {
              ...disease,
              disorders: disease.disorders.map((disorder, j) =>
                j === disorderIdx
                  ? { ...disorder, isHidden: !disorder.isHidden }
                  : disorder
              ),
            }
          : disease
      )
    );
  };

  // Add a new disorder (nested item)
  const addDisorder = (diseaseIdx: number, newDisorderName: string) => {
    setFormatedDieses((prev) =>
      prev.map((disease, i) =>
        i === diseaseIdx
          ? {
              ...disease,
              disorders: [
                ...disease.disorders,
                { name: newDisorderName, isHidden: false },
              ],
            }
          : disease
      )
    );
  };

  const handleAddDisorder = async (newItem: string, dieasesIdx: number) => {
    addDisorder(dieasesIdx, newItem);
  };

  // Edit a disorder (nested item)
  const editDisorder = (
    diseaseIdx: number,
    disorderIdx: number,
    newName: string
  ) => {
    setFormatedDieses((prev) =>
      prev.map((disease, i) =>
        i === diseaseIdx
          ? {
              ...disease,
              disorders: disease.disorders.map((disorder, j) =>
                j === disorderIdx ? { ...disorder, name: newName } : disorder
              ),
            }
          : disease
      )
    );
  };

  const handleEditDisorder = async (
    item: string,
    dieasesIdx: number,
    disorderIdx: number
  ) => {
    editDisorder(dieasesIdx, disorderIdx, item);
  };

  // Delete a disorder (nested item)
  const deleteDisorder = (diseaseIdx: number, disorderIdx: number) => {
    setFormatedDieses((prev) =>
      prev.map((disease, i) =>
        i === diseaseIdx
          ? {
              ...disease,
              disorders: disease.disorders.filter((_, j) => j !== disorderIdx),
            }
          : disease
      )
    );
  };

  // handle next button
  const handleNextButton = async () => {
    setFormData({ ...formData, disorders: formatedDieses });
    nextStep();
  };

  return (
    <div className="h-full flex flex-col justify-between">
      {/* body */}
      <section className="pb-6 flex-1">
        <Accordion type="single" collapsible className="w-full grid gap-2">
          {formatedDieses?.map((item, itemIdx: number) => (
            <AccordionItem
              key={itemIdx}
              value={item.name}
              className="border-none"
            >
              <div className="flex justify-between items-center gap-2">
                <div className="bg-zinc-100 rounded-lg w-full p-4 flex justify-between items-center gap-4">
                  <p className="font-medium flex items-center gap-5">
                    {item?.name}
                    <span className="text-xs font-medium text-zinc-400">
                      {item?.disorders?.length} items
                    </span>
                  </p>
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={() => toggleDiesesVisibility(itemIdx)}
                      variant={"ghost"}
                      size={"icon"}
                      className="text-zinc-500"
                    >
                      {!item?.isHidden ? <Eye /> : <EyeOff />}
                    </Button>
                    <AddDisorderModal
                      triggerBtn={
                        <Button variant={"secondary"} className="h-10">
                          <Plus /> Add
                        </Button>
                      }
                      diseaseIdx={itemIdx}
                      action={handleAddDisorder}
                    />
                  </div>
                </div>
                <AccordionTrigger className="bg-zinc-100 p-7 rounded-lg"></AccordionTrigger>
              </div>
              <AccordionContent className="p-2 md:p-5 lg:pr-20">
                <ul className="grid gap-4 md:gap-2">
                  {item.disorders.map((disorder, nestedIdx: number) => (
                    <li
                      key={nestedIdx}
                      className="flex justify-between items-center gap-2"
                    >
                      <p
                        className={`flex items-center gap-3 text-sm ${
                          disorder?.isHidden
                            ? "text-stone-400"
                            : "text-stone-600"
                        } `}
                      >
                        <span className="size-3 min-w-3 bg-primary-foreground rounded-full"></span>{" "}
                        {disorder?.name}
                      </p>
                      <div className="flex">
                        <EditDisorderModal
                          triggerBtn={
                            <Button
                              variant={"ghost"}
                              size={"icon"}
                              className="text-primary"
                            >
                              <Pencil />
                            </Button>
                          }
                          diseaseIdx={itemIdx}
                          disorderIdx={nestedIdx}
                          inputValue={disorder?.name}
                          action={handleEditDisorder}
                        />

                        <Button
                          onClick={() =>
                            toggleDisorderVisibility(itemIdx, nestedIdx)
                          }
                          variant={"ghost"}
                          size={"icon"}
                          className="text-zinc-500"
                        >
                          {!disorder?.isHidden ? <Eye /> : <EyeOff />}
                        </Button>
                        <Button
                          onClick={() => deleteDisorder(itemIdx, nestedIdx)}
                          variant={"ghost"}
                          size={"icon"}
                          className="text-red-500"
                        >
                          <Trash />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
          {!(formatedDieses?.length > 0) && (
            <p className="text-stone-500 text-center py-8">No data found</p>
          )}
        </Accordion>
      </section>

      {/* submit button */}
      <div className="col-span-2 flex justify-end gap-4">
        <Button onClick={prevStep} className="md:px-6">
          <ChevronLeft /> Back
        </Button>
        <Button onClick={handleNextButton} className="md:px-6">
          Next <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default Step2;
