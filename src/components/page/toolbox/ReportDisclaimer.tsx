"use client";

import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { capitalizeSentence } from "@/utils/capitalizeSentence";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { myFetch } from "@/utils/myFetch";

// Define the form schema using zod
const disclaimerSchema = z.object({
  content: z.string().min(1, "Disclaimer content is required."),
});

const ReportDisclaimerTab = ({ data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof disclaimerSchema>>({
    resolver: zodResolver(disclaimerSchema),
    defaultValues: {
      content: data?.content || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof disclaimerSchema>) => {
    toast.loading("Saving changes...", { id: "save-disclaimer" });
    try {
      const res = await myFetch("/disclaimer", {
        method: "POST",
        body: { ...values, type: "report_disclaimer" },
      });

      if (res?.success) {
        toast.success("Disclaimer updated successfully!", {
          id: "save-disclaimer",
        });
      } else {
        toast.error(res?.message || "Failed to update disclaimer.", {
          id: "save-disclaimer",
        });
      }
    } catch (error) {
      toast.error("An error occurred while saving changes.", {
        id: "save-disclaimer",
      });
      console.error(error);
    }
  };

  return (
    <TabsContent
      value={"Report Disclaimer"}
      className="bg-white p-4 rounded-xl overflow-y-scroll no-scrollbar"
    >
      {/* header */}
      <div className="h-full flex flex-col">
        <section className="flex justify-between items-center gap-2 mb-6">
          <h1 className="text-xl lg:text-2xl font-medium text-primary">
            {capitalizeSentence("Report Disclaimer")}
          </h1>
        </section>
        {/* body */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 flex-1"
        >
          <div className="bg-muted p-4 rounded-lg flex-1">
            <Textarea
              {...register("content")}
              placeholder="Write report disclaimer here"
              className="h-full shadow-none border-none text-sm lg:text-base text-stone-500"
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <Button type="submit">Save & Change</Button>
          </div>
        </form>
      </div>
    </TabsContent>
  );
};

export default ReportDisclaimerTab;
