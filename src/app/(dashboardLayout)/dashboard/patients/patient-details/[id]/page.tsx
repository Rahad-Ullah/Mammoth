import PatientCard from "@/components/page/billDetails/patientCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { patientsData } from "@/constants/patients";

type PageParams = Promise<{ id: string }>;

const PatientDetailsPage = async ({ params }: { params: PageParams }) => {
  const { id } = await params;

  const patient = patientsData.find((item) => item.id === Number(id));
  if (!patient) return <h1>Data not found</h1>;

  return (
    <section className="grid gap-6">
      <Card>
        <CardHeader>
          <h1 className="text-xl font-medium text-primary">Patient:</h1>
        </CardHeader>
        <CardContent>
          <PatientCard bill={patient} patient={patient} />
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

export default PatientDetailsPage;
