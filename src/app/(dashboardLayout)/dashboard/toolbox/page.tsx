
import CannedDxTab from "@/components/page/toolbox/CannedDxTab";
import InsuranceTab from "@/components/page/toolbox/InsuranceTab";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toolBoxData, toolboxTabs } from "@/constants/toolbox";
import { capitalizeSentence } from "@/utils/capitalizeSentence";
import { myFetch } from "@/utils/myFetch";

const ToolboxPage = async () => {
  const cannedDxResponse = await myFetch("/canned-dx", {
    tags: ["canned-dx"],
  });
  const insuranceResponse = await myFetch("/insurance", {
    tags: ["insurance"],
  });

  return (
    <Tabs
      defaultValue={"canned-dx"}
      className="flex flex-col lg:flex-row gap-2 h-[calc(100vh-128px)] sticky top-32"
    >
      <div className="bg-white p-4 rounded-xl">
        <TabsList className="flex flex-col justify-start items-start gap-2">
          {toolboxTabs.map((item, idx) => {
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
      <CannedDxTab data={cannedDxResponse?.data} />

      {/* tab content 2 */}
      <InsuranceTab data={insuranceResponse?.data} />

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
