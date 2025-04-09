import PatientsTable from "@/components/page/patients/PatientsTable";
import { myFetch } from "@/utils/myFetch";

const PatientsPage = async ({ searchParams }) => {
  const { insurance, searchTerm, page } = await searchParams;
  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(insurance && { insurance }),
    ...(searchTerm && { searchTerm }),
    ...(page && { page }),
  });

  const res = await myFetch(`/patient?${queryParams.toString()}`, {
    tags: ["patients"],
  });

  return (
    <>
      <PatientsTable
        patients={res?.data}
        meta={res?.pagination}
        filters={{ insurance }}
      />
    </>
  );
};

export default PatientsPage;
