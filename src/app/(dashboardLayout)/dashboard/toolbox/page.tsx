import AddModalButton from "@/components/add-modal-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toolBoxData } from "@/constants/toolBox";
import { capitalizeSentence } from "@/utils/capitalizeSentence";
import { Pencil, Trash } from "lucide-react";

const ToolboxPage = () => {
  return (
    <Tabs
      defaultValue={Object.keys(toolBoxData)[0]}
      className="flex flex-col lg:flex-row gap-2 h-[calc(100vh-128px)] sticky top-32"
    >
      <div className="bg-white p-4 rounded-xl">
        <TabsList className="flex flex-col justify-start items-start gap-2">
          {Object.keys(toolBoxData).map((item, idx) => {
            return (
              <TabsTrigger
                value={item}
                key={idx}
                className="text-zinc-500 text-base font-normal"
              >
                {capitalizeSentence(item)}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>

      {/* tab content 1 */}
      <TabsContent
        value={Object.keys(toolBoxData)[0]}
        className="bg-white p-4 rounded-xl overflow-y-scroll no-scrollbar"
      >
        {/* header */}
        <section className="flex justify-between items-center gap-2">
          <h1 className="text-xl lg:text-2xl font-medium text-primary">
            Canned Dx&apos;s
          </h1>
          <AddModalButton />
        </section>
        <Separator className="my-4" />
        {/* body */}
        <section className="">
          <ul className="grid gap-4 md:gap-2">
            {toolBoxData.canned_dxs.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center gap-2 ml-2 md:m-0"
              >
                <p className={`flex items-center gap-3 text-sm text-stone-600`}>
                  <span className="size-3 min-w-3 bg-primary-foreground rounded-full"></span>{" "}
                  {item.findings}
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

      {/* tab content 2 */}
      <TabsContent
        value={Object.keys(toolBoxData)[1]}
        className="bg-white p-4 rounded-xl overflow-y-scroll no-scrollbar"
      >
        {/* header */}
        <section className="flex justify-between items-center gap-2">
          <h1 className="text-xl lg:text-2xl font-medium text-primary">
            {capitalizeSentence(Object.keys(toolBoxData)[1])}
          </h1>
          <AddModalButton />
        </section>
        <Separator className="my-4" />
        {/* body */}
        <section className="">
          <ul className="grid gap-4 md:gap-2">
            {toolBoxData.insurance.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center gap-2 ml-2 md:m-0"
              >
                <p className={`flex items-center gap-3 text-sm text-stone-600`}>
                  <span className="size-3 min-w-3 bg-primary-foreground rounded-full"></span>{" "}
                  {item.organization}
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

      {/* tab content 3 */}
      <TabsContent
        value={Object.keys(toolBoxData)[2]}
        className="bg-white p-4 rounded-xl overflow-y-scroll no-scrollbar"
      >
        {/* header */}
        <div className="h-full flex flex-col">
          <section className="flex justify-between items-center gap-2 mb-6">
            <h1 className="text-xl lg:text-2xl font-medium text-primary">
              {capitalizeSentence(Object.keys(toolBoxData)[2])}
            </h1>
          </section>
          {/* body */}
          <section className="flex flex-col gap-4 flex-1">
            <div className="bg-muted p-4 rounded-lg flex-1">
              <p className="text-sm lg:text-base text-stone-500">
                {toolBoxData.report_disclaimer}
              </p>
            </div>
            <div className="flex justify-end">
              <Button>Save & Change</Button>
            </div>
          </section>
        </div>
      </TabsContent>

      {/* tab content 4 */}
      <TabsContent
        value={Object.keys(toolBoxData)[3]}
        className="bg-white p-4 rounded-xl overflow-y-scroll no-scrollbar"
      >
        {/* header */}
        <div className="h-full flex flex-col">
          <section className="flex justify-between items-center gap-2 mb-6">
            <h1 className="text-xl lg:text-2xl font-medium text-primary">
              {capitalizeSentence(Object.keys(toolBoxData)[3])}
            </h1>
          </section>
          {/* body */}
          <section className="flex flex-col gap-4 flex-1">
            <div className="bg-muted p-4 rounded-lg flex-1">
              <p className="text-sm lg:text-base text-stone-500">
                {toolBoxData.length_dependent_response}
              </p>
            </div>
            <div className="flex justify-end">
              <Button>Save & Change</Button>
            </div>
          </section>
        </div>
      </TabsContent>

      {/* tab content 5 */}
      <TabsContent
        value={Object.keys(toolBoxData)[4]}
        className="bg-white p-4 rounded-xl overflow-y-scroll no-scrollbar"
      >
        {/* header */}
        <div className="h-full flex flex-col">
          <section className="flex justify-between items-center gap-2 mb-6">
            <h1 className="text-xl lg:text-2xl font-medium text-primary">
              {capitalizeSentence(Object.keys(toolBoxData)[4])}
            </h1>
          </section>
          {/* body */}
          <section className="flex flex-col gap-4 flex-1">
            <div className="bg-muted p-4 rounded-lg flex-1">
              <p className="text-sm lg:text-base text-stone-500">
                {toolBoxData.non_length_dependent_response}
              </p>
            </div>
            <div className="flex justify-end">
              <Button>Save & Change</Button>
            </div>
          </section>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ToolboxPage;
