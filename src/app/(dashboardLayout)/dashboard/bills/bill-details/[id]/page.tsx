import PatientCard from "@/components/page/billDetails/patientCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { billingData } from "@/constants/billingData";

type PageParams = Promise<{ id: string }>;

const BillDetailsPage = async ({ params }: { params: PageParams }) => {
  const { id } = await params;

  const bill = billingData.find((item) => item.id === Number(id));
  if (!bill) return <h1>Bill not found</h1>;

  return (
    <section className="grid gap-6">
      <Card>
        <CardHeader>
          <h1 className="text-xl font-medium text-primary">Patient:</h1>
        </CardHeader>
        <CardContent>
          <PatientCard bill={bill} patient={bill.patient} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h1 className="text-xl font-medium text-primary">Test Details:</h1>
        </CardHeader>
        <CardContent>Test information goes here</CardContent>
      </Card>
    </section>
  );
};

export default BillDetailsPage;
