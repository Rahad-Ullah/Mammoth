import AddModalButton from "@/components/add-modal-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import { Pencil, Trash } from "lucide-react";

const CannedDxTab = ({ data }) => {
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
        <AddModalButton />
      </section>
      <Separator className="my-4" />
      {/* body */}
      <section className="">
        <ul className="grid gap-4 md:gap-2">
          {data?.map((item: { _id: string; content: string }) => (
            <li
              key={item?._id}
              className="flex justify-between items-center gap-2 ml-2 md:m-0"
            >
              <p className={`flex items-center gap-3 text-sm text-stone-600`}>
                <span className="size-3 min-w-3 bg-primary-foreground rounded-full"></span>{" "}
                {item?.content}
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
          ))}
        </ul>
      </section>
    </TabsContent>
  );
};

export default CannedDxTab;
