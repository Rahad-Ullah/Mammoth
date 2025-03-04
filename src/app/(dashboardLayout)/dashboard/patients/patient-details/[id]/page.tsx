import PatientCard from "@/components/page/billDetails/patientCard";
import AnatomyWrapper from "@/components/page/testDetails/anatomy/anatomyWrapper";
import DocumentSection from "@/components/page/testDetails/documentSection";
import GeneralTestDetails from "@/components/page/testDetails/generalTestDetails";
import NoteSection from "@/components/page/testDetails/noteSection";
import TestInfo from "@/components/page/testDetails/testInfo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { patientsData } from "@/constants/patients";
import { testsData } from "@/constants/tests";

type PageParams = Promise<{ id: string }>;

const PatientDetailsPage = async ({ params }: { params: PageParams }) => {
  const { id } = await params;

  const patient = patientsData.find((item) => item.id === Number(id));
  if (!patient) return <h1>Data not found</h1>;

  const tests = testsData.filter((item) => item.patient.id === patient.id);

  return (
    <section className="grid gap-4">
      <Card>
        <CardHeader>
          <h1 className="text-xl font-medium text-primary">Patient:</h1>
        </CardHeader>
        <CardContent>
          <PatientCard bill={patient} patient={patient} />
        </CardContent>
      </Card>
      <Accordion type="single" collapsible className="grid gap-4">
        {tests.map((test) => (
          <AccordionItem
            key={test.report_no}
            value={test.report_no}
            className="border-none bg-white p-4 px-6 rounded-xl"
          >
            <AccordionTrigger
              className={`hover:no-underline text-base font-normal flex-col lg:flex-row items-start gap-2`}
            >
              <p className="text-zinc-400 flex gap-4">
                Ordering Provider{" "}
                <span className="text-zinc-500">{test.ordering_provider}</span>
              </p>
              <p className="text-zinc-400 flex gap-4">
                Ordering Physician{" "}
                <span className="text-zinc-500">{test.ordering_physician}</span>
              </p>
              <p className="text-zinc-400 flex gap-4">
                Apply Date{" "}
                <span className="text-zinc-500">
                  {new Date(test.apply_date).toLocaleString()}
                </span>
              </p>
              <p className="text-primary">Collected</p>
            </AccordionTrigger>
            <AccordionContent className="grid gap-6">
              <Separator className="my-2" />
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default PatientDetailsPage;
