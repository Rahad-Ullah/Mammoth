import PatientsTable from "@/components/page/patients/PatientsTable";
import { myFetch } from "@/utils/myFetch";

const PatientsPage = async ({ searchParams }) => {
  const { insuranceCompany, searchTerm, page } = await searchParams;
  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(insuranceCompany && { insuranceCompany }),
    ...(searchTerm && { searchTerm }),
    ...(page && { page }),
  });

  const res = await myFetch(`/patient?${queryParams.toString()}`, {
    tags: ["patients"],
  });

  const insuranceRes = await myFetch(`/insurance?${queryParams.toString()}`, {
    tags: ["insurance"],
  });

  return (
    <>
      <PatientsTable
        patients={res?.data}
        meta={res?.pagination}
        filters={{ insuranceCompany }}
        insuranceData={insuranceRes?.data}
      />
    </>
  );
};

export default PatientsPage;
