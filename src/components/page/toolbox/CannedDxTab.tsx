"use client";

import AddModal from "@/components/add-modal";
import DeleteModal from "@/components/shared/DeleteModal";
import EditModal from "@/components/shared/EditModal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import { revalidate } from "@/helpers/revalidateHelper";
import { myFetch } from "@/utils/myFetch";
import { Pencil, Plus, Trash } from "lucide-react";
import toast from "react-hot-toast";

const CannedDxTab = ({ data = [] }) => {
  // handle add new option
  const handleAddNewOption = async (values: { option: string }) => {
    toast.loading("Adding...", { id: "add-canned-dx" });
    try {
      const res = await myFetch("/canned-dx", {
        method: "POST",
        body: { content: values?.option },
      });

      if (res?.success) {
        toast.success("Added successfully", { id: "add-canned-dx" });
        await revalidate("canned-dx");
      } else {
        toast.error(res?.message || "Failed to add", { id: "add-canned-dx" });
      }
      return res || { success: false, message: "Unknown error" };
    } catch (error) {
      console.error(error);
    }
    return { success: false, message: "Unknown error" };
  };

  // handle edit existing option
  const handleEdit = async (values: { option: string }, id: string) => {
    toast.loading("Updating...", { id: "edit-canned-dx" });
    try {
      const res = await myFetch(`/canned-dx/${id}`, {
        method: "PUT",
        body: { content: values?.option },
      });

      if (res?.success) {
        toast.success("Updated successfully", { id: "edit-canned-dx" });
        await revalidate("canned-dx");
      } else {
        toast.error("Failed to update", {
          id: "edit-canned-dx",
        });
      }
      return res || { success: false, message: "Unknown error" };
    } catch (error) {
      console.error(error);
    }
    return { success: false, message: "Unknown error" };
  };

  // handle delete existing option
  const handleDelete = async (id: string) => {
    toast.loading("Deleting...", { id: "delete-canned-dx" });
    try {
      const res = await myFetch(`/canned-dx/${id}`, {
        method: "DELETE",
      });

      if (res?.success) {
        toast.success("Deleted successfully", { id: "delete-canned-dx" });
        await revalidate("canned-dx");
      } else {
        toast.error(res?.message || "Failed to delete", {
          id: "delete-canned-dx",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TabsContent
      value={"Canned Dx's"}
      className="bg-white p-4 rounded-xl overflow-y-scroll no-scrollbar"
    >
      {/* header */}
      <section className="flex justify-between items-center gap-2">
        <h1 className="text-xl lg:text-2xl font-medium text-primary">
          {"Canned Dx's"}
        </h1>
        <AddModal
          triggerBtn={
            <Button>
              <Plus /> Add
            </Button>
          }
          title="Add New Canned Dx"
          action={handleAddNewOption}
        />
      </section>
      <Separator className="my-4" />
      {/* body */}
      <section className="">
        <ul className="grid gap-4 md:gap-2">
          {data?.length > 0 ? (
            data?.map((item: { _id: string; content: string }) => (
              <li
                key={item?._id}
                className="flex justify-between items-center gap-2 ml-2 md:m-0"
              >
                <p className={`flex items-center gap-3 text-sm text-stone-600`}>
                  <span className="size-3 min-w-3 bg-primary-foreground rounded-full"></span>{" "}
                  {item?.content}
                </p>
                <div className="flex">
                  <EditModal
                    triggerBtn={
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="text-primary"
                      >
                        <Pencil />
                      </Button>
                    }
                    title="Edit Canned Dx"
                    btnText="Update"
                    action={handleEdit}
                    item={item}
                    inputValue={item?.content}
                  />
                  <DeleteModal
                    itemId={item?._id}
                    triggerBtn={
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="text-red-500"
                      >
                        <Trash />
                      </Button>
                    }
                    actionBtnText="Delete"
                    action={handleDelete}
                  />
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-stone-600">No data found</p>
          )}
        </ul>
      </section>
    </TabsContent>
  );
};

export default CannedDxTab;
