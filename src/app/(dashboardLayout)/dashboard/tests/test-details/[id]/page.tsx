import PatientCard from "@/components/page/billDetails/patientCard";
import AnatomyWrapper from "@/components/page/testDetails/anatomy/anatomyWrapper";
import BillingSection from "@/components/page/testDetails/billingSection";
import DocumentSection from "@/components/page/testDetails/documentSection";
import GeneralTestDetails from "@/components/page/testDetails/generalTestDetails";
import NoteSection from "@/components/page/testDetails/noteSection";
import PathologistSection from "@/components/page/testDetails/pathologistSection";
import TestInfo from "@/components/page/testDetails/testInfo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { testsData } from "@/constants/tests";
import { TTest } from "@/types/test";

type PageParams = Promise<{ id: string }>;

const TestDetailsPage = async ({ params }: { params: PageParams }) => {
  const { id } = await params;

  const test = testsData?.find(
    (item) => (item as Partial<TTest>)?.report_no === id
  ) as TTest | undefined;
  if (!test) return <h1>Data not found</h1>;

  return (
    <section className="grid gap-6">
      {/* Patient details section */}
      <Card className="shadow-none">
        <CardHeader>
          <h1 className="text-2xl font-medium text-primary">Patient:</h1>
        </CardHeader>
        <CardContent>
          <PatientCard bill={test} patient={test.patient} />
        </CardContent>
      </Card>
      {/* Test Details section */}
      <Card className="shadow-none">
        <CardHeader>
          <h1 className="text-2xl font-medium text-primary">Test Details:</h1>
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

              {/* Pathologist section */}
              <section>
                <PathologistSection test={test} />
              </section>

              {/* Billing */}
              <section>
                <BillingSection />
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

export default TestDetailsPage;
