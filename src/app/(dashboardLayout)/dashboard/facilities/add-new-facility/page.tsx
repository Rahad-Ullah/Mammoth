import AddFacilityForm from "@/components/page/addFacility/addFacilityForm";
import { myFetch } from "@/utils/myFetch";

const AddNewFacilityPage = async () => {
  const usersRes = await myFetch(`/user/users?role=Representative`, {
    tags: ["users"],
  });

  const dieasesRes = await myFetch(`/dieases`, {
    tags: ["dieases"],
  });

  const medicalDiagnosisRes = await myFetch(
    `/medical-terms?type=medical_diagnosis`,
    {
      tags: ["medical-diagnosis"],
    }
  );
  // console.log(medicalDiagnosis?.data);

  return (
    <>
      <AddFacilityForm
        representatives={usersRes?.data}
        dieases={dieasesRes?.data}
        medicalDiagnosis={medicalDiagnosisRes?.data}
      />
    </>
  );
};

export default AddNewFacilityPage;
