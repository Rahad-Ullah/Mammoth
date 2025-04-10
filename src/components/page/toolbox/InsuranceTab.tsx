import AddModalButton from "@/components/add-modal-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import { capitalizeSentence } from "@/utils/capitalizeSentence";
import { Pencil, Trash } from "lucide-react";

const InsuranceTab = ({ data = [] }) => {
  return (
    <TabsContent
      value={"Insurance"}
      className="bg-white p-4 rounded-xl overflow-y-scroll no-scrollbar"
    >
      {/* header */}
      <section className="flex justify-between items-center gap-2">
        <h1 className="text-xl lg:text-2xl font-medium text-primary">
          {capitalizeSentence("Insurance")}
        </h1>
        <AddModalButton />
      </section>
      <Separator className="my-4" />
      {/* body */}
      <section className="">
        <ul className="grid gap-4 md:gap-2">
          {data?.length > 0 ? (
            data?.map((item: { _id: string; name: string }) => (
              <li
                key={item?._id}
                className="flex justify-between items-center gap-2 ml-2 md:m-0"
              >
                <p className={`flex items-center gap-3 text-sm text-stone-600`}>
                  <span className="size-3 min-w-3 bg-primary-foreground rounded-full"></span>{" "}
                  {item?.name}
                </p>
                <div className="flex">
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="text-primary"
                  >
                    <Pencil />
                  </Button>
                  <Button
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
            <p className="text-center text-stone-600">No data found</p>
          )}
        </ul>
      </section>
    </TabsContent>
  );
};

export default InsuranceTab;
