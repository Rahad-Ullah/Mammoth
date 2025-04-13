import PatientCard from "@/components/page/billDetails/patientCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import pdfIcon from "@/assets/icons/pdf.svg";
import TestInfo from "@/components/page/testDetails/testInfo";
import GeneralTestDetails from "@/components/page/testDetails/generalTestDetails";
import DocumentSection from "@/components/page/testDetails/documentSection";
import BillingSection from "@/components/page/testDetails/billingSection";
import NoteSection from "@/components/page/testDetails/noteSection";
import AnatomyWrapper from "@/components/page/testDetails/anatomy/anatomyWrapper";
import { myFetch } from "@/utils/myFetch";

type PageParams = Promise<{ id: string }>;

const BillDetailsPage = async ({ params }: { params: PageParams }) => {
  const { id } = await params;

  const billResponse = await myFetch(`/bill/${id}`, {
    tags: ["single-bill"],
  });

  const bill = billResponse?.data;
  if (!bill) return <h1>Data not found</h1>;

  return (
    <section className="grid gap-6">
      <Card>
        <CardHeader>
          {/* PDF button */}
          <div className="flex justify-end">
            <Button className="bg-gradient-to-tl from-[#CEE9FF] to-[#E1E3EB] text-primary">
              <Image src={pdfIcon} alt="pdf" width={24} height={24} />
            </Button>
          </div>
          <h1 className="text-xl font-medium text-primary">Patient:</h1>
        </CardHeader>
        <CardContent>
          <PatientCard patient={bill?.patient} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h1 className="text-xl font-medium text-primary">Chart Details:</h1>
        </CardHeader>
        <CardContent className="grid gap-10">
          <TestInfo bill={bill} />
          <section className="flex flex-col-reverse lg:flex-row gap-8">
            {/* left section */}
            <section className="w-full lg:w-2/3 grid gap-8">
              <GeneralTestDetails test={bill?.report} />

              {/* Document */}
              <section>
                <DocumentSection test={bill?.report} />
              </section>

              {/* Billing */}
              <section>
                <BillingSection />
              </section>

              {/* Note */}
              <NoteSection bill={bill} />
            </section>
            {/* Anatomy Image section */}
            <section>
              <AnatomyWrapper testPoints={bill?.report?.biopsy_sample} />
            </section>
          </section>
        </CardContent>
      </Card>
    </section>
  );
};

export default BillDetailsPage;
