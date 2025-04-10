
import CannedDxTab from "@/components/page/toolbox/CannedDxTab";
import InsuranceTab from "@/components/page/toolbox/InsuranceTab";
import LengthResponseTab from "@/components/page/toolbox/LengthResponseTab";
import NonLengthResponseTab from "@/components/page/toolbox/NonLengthResponseTab";
import ReportDisclaimerTab from "@/components/page/toolbox/ReportDisclaimer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toolboxTabs } from "@/constants/toolbox";
import { capitalizeSentence } from "@/utils/capitalizeSentence";
import { myFetch } from "@/utils/myFetch";

const ToolboxPage = async () => {
  // fetch data
  const cannedDxResponse = await myFetch("/canned-dx", {
    tags: ["canned-dx"],
  });
  const insuranceResponse = await myFetch("/insurance", {
    tags: ["insurance"],
  });
  const reportDisclaimerResponse = await myFetch(
    "/disclaimer/report_disclaimer",
    {
      tags: ["report-disclaimer"],
    }
  );
  const lengthDependentResponse = await myFetch("/disclaimer/length_response", {
    tags: ["length-response"],
  });
  const nonLengthDependentResponse = await myFetch(
    "/disclaimer/non_length_response",
    {
      tags: ["non-length-response"],
    }
  );

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
      <ReportDisclaimerTab data={reportDisclaimerResponse?.data} />

      {/* tab content 4 */}
      <LengthResponseTab data={lengthDependentResponse?.data} />

      {/* tab content 5 */}
      <NonLengthResponseTab data={nonLengthDependentResponse?.data} />
    </Tabs>
  );
};

export default ToolboxPage;
