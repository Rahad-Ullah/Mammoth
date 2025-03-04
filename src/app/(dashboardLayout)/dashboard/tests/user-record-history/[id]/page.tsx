import { Card, CardContent, CardHeader } from "@/components/ui/card";
import TestInfo from "@/components/page/testDetails/testInfo";
import GeneralTestDetails from "@/components/page/testDetails/generalTestDetails";
import DocumentSection from "@/components/page/testDetails/documentSection";
import NoteSection from "@/components/page/testDetails/noteSection";
import AnatomyWrapper from "@/components/page/testDetails/anatomy/anatomyWrapper";
import { testsData } from "@/constants/tests";

type PageParams = Promise<{ id: string }>;

const UserRecordHistoryPage = async ({ params }: { params: PageParams }) => {
  const { id } = await params;

  const test = testsData.find((item) => item.report_no === id);
  if (!test) return <h1>Data not found</h1>;

  return (
    <section className="grid gap-6">
      <Card>
        <CardHeader>
          <h1 className="text-xl font-medium text-primary">Chart Details:</h1>
        </CardHeader>
        <CardContent className="grid gap-10">
          <TestInfo test={test} />
          <section className="flex flex-col-reverse lg:flex-row gap-8">
            {/* left section */}
            <section className="w-full lg:w-2/3 grid gap-8">
              <GeneralTestDetails test={test} />

              {/* Document */}
              <section>
                <DocumentSection test={test} />
              </section>

              {/* Note */}
              <NoteSection />
            </section>
            {/* Anatomy Image section */}
            <section>
              <AnatomyWrapper testPoints={test.biopsy_samples} />
            </section>
          </section>
        </CardContent>
      </Card>
    </section>
  );
};

export default UserRecordHistoryPage;
