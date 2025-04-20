import AddTestForm from "@/components/page/addTest/AddTestForm";
import { myFetch } from "@/utils/myFetch";

const AddTestPage = async ({ params }) => {
  const { id } = await params;

  const doctorsRes = await myFetch(`/user/users?role=Doctor`, {
    tags: ["users"],
  });
  const facilityRes = await myFetch(`/facility/${id}`, {
    tags: ["single-facility"],
  });

  // console.log(facilityRes?.data[0]);

  return (
    <div>
      <AddTestForm
        doctors={doctorsRes?.data}
        dieases={facilityRes?.data[0]?.disorders}
        medicalTerms={facilityRes?.data[0]?.reasons}
        clinicalSymptoms={facilityRes?.data[0]?.clinical_symptoms}
        facility={facilityRes?.data[0]}
      />
    </div>
  );
};

export default AddTestPage;
