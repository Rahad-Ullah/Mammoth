import PatientCard from "@/components/page/billDetails/patientCard";
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

  const test = testsData.find((item: TTest) => item.report_no === id);
  if (!test) return <h1>Bill not found</h1>;

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
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* left section */}
            <section className="col-span-2 grid gap-8">
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
            <section></section>
          </section>
        </CardContent>
      </Card>
    </section>
  );
};

export default TestDetailsPage;
