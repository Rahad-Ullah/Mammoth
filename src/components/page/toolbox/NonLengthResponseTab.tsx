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
import { revalidate } from "@/helpers/revalidateHelper";

// Define the form schema using zod
const nonLengthResponseSchema = z.object({
  content: z.string().min(1, "Content is required."),
});

const NonLengthResponseTab = ({ data }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof nonLengthResponseSchema>>({
    resolver: zodResolver(nonLengthResponseSchema),
    defaultValues: {
      content: data?.content || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof nonLengthResponseSchema>) => {
    toast.loading("Saving changes...", { id: "save-non-length-response" });
    try {
      const res = await myFetch("/disclaimer", {
        method: "POST",
        body: { ...values, type: "non_length_response" },
      });

      if (res?.success) {
        toast.success("Updated successfully!", {
          id: "save-non-length-response",
        });
        await revalidate("non-length-response");
      } else {
        toast.error(res?.message || "Failed to update non-length response.", {
          id: "save-non-length-response",
        });
      }
    } catch (error) {
      toast.error("An error occurred while saving changes.", {
        id: "save-non-length-response",
      });
      console.error(error);
    }
  };

  return (
    <TabsContent
      value={"Non Length Dependent Response"}
      className="bg-white p-4 rounded-xl overflow-y-scroll no-scrollbar"
    >
      {/* header */}
      <div className="h-full flex flex-col">
        <section className="flex justify-between items-center gap-2 mb-6">
          <h1 className="text-xl lg:text-2xl font-medium text-primary">
            {capitalizeSentence("Non Length Dependent Response")}
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
              placeholder="Write non-length dependent response here"
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

export default NonLengthResponseTab;
