"use client";

import AddEditItemModal from "@/components/page/addFacility/AddEditItemModal";
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

type TMedicalDiagnosis = {
  name: string;
  type: string;
  isHidden: boolean;
};

const Step3 = ({ nextStep, prevStep, medicalDiagnosis }) => {
  const { formData, setFormData } = useFacilityFormContext();

  const [formatedDiagnosis, setFormatedDiagnosis] = useState(
    medicalDiagnosis?.map((item) => ({
      name: item?.content,
      type: item?.type,
      isHidden: false,
    }))
  );

  // Toggle visibility of an item
  const toggleItemVisible = (idx: number) => {
    setFormatedDiagnosis((prev: TMedicalDiagnosis[]) =>
      prev.map((item, i: number) =>
        i === idx ? { ...item, isHidden: !item.isHidden } : item
      )
    );
  };

  // handle add new item
  const addItem = (newItem: { name: string; type?: string }) => {
    setFormatedDiagnosis((prev: TMedicalDiagnosis[]) => [
      ...prev,
      { name: newItem.name, type: newItem.type, isHidden: false },
    ]);
  };
  const handleAddItem = (data: { option: string }) => {
    addItem({ name: data.option, type: "medical_diagnosis" });
  };

  // handle edit item
  const editItem = (idx: number, newName: string) => {
    setFormatedDiagnosis((prev: TMedicalDiagnosis[]) =>
      prev.map((item, i) => (i === idx ? { ...item, name: newName } : item))
    );
  };
  const handleEditItem = (data: { option: string }, id) => {
    editItem(id, data?.option);
  };

  // handle delete item
  const deleteItem = (idx: number) => {
    setFormatedDiagnosis((prev: TMedicalDiagnosis[]) =>
      prev.filter((_, i) => i !== idx)
    );
  };

  // handle next button
  const handleNext = () => {
    setFormData({ ...formData, reasons: formatedDiagnosis });
    nextStep();
  };

  return (
    <div className="h-full flex flex-col justify-between">
      {/* header options */}
      <section>
        <div className="col-span-2 flex justify-end gap-4">
          <AddEditItemModal
            triggerBtn={
              <Button variant={"secondary"}>
                <Plus /> Add
              </Button>
            }
            inputValue={""}
            action={handleAddItem}
            title="Add New Option"
            btnText="Add"
          />
        </div>
      </section>

      {/* body */}
      <section className="py-6 flex-1">
        <ul className="grid gap-4 md:gap-2">
          {formatedDiagnosis?.length > 0 ? (
            formatedDiagnosis?.map((item: TMedicalDiagnosis, idx: number) => (
              <li key={idx} className="flex justify-between items-center gap-2">
                <p
                  className={`flex items-center gap-3 text-sm ${
                    item?.isHidden ? "text-stone-400" : "text-stone-600"
                  } `}
                >
                  <span className="min-w-3 h-3 bg-primary-foreground rounded-full"></span>
                  {item?.name}
                </p>
                <div className="flex">
                  <AddEditItemModal
                    triggerBtn={
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="text-primary"
                      >
                        <Pencil />
                      </Button>
                    }
                    id={idx}
                    inputValue={item?.name}
                    action={handleEditItem}
                  />
                  <Button
                    onClick={() => toggleItemVisible(idx)}
                    variant={"ghost"}
                    size={"icon"}
                    className="text-zinc-500"
                  >
                    {!item.isHidden ? <Eye /> : <EyeOff />}
                  </Button>
                  <Button
                    onClick={() => deleteItem(idx)}
                    variant={"ghost"}
                    size={"icon"}
                    className="text-red-500"
                  >
                    <Trash />
                  </Button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-stone-500 text-center py-8">No data found</p>
          )}
        </ul>
      </section>

      {/* submit button */}
      <div className="col-span-2 flex justify-end gap-4">
        <Button onClick={prevStep} className="md:px-6">
          <ChevronLeft /> Back
        </Button>
        <Button onClick={handleNext} className="md:px-6">
          Next <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default Step3;
