import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { capitalizeSentence } from "@/utils/capitalizeSentence";

const NonLengthResponseTab = ({ data }) => {
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
        <section className="flex flex-col gap-4 flex-1">
          <div className="bg-muted p-4 rounded-lg flex-1">
            <p className="text-sm lg:text-base text-stone-500">
              {data?.content || "No data found"}
            </p>
          </div>
          <div className="flex justify-end">
            <Button>Save & Change</Button>
          </div>
        </section>
      </div>
    </TabsContent>
  );
};

export default NonLengthResponseTab;
