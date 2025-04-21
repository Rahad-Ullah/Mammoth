import FacilitiesTable from "@/components/page/facilities/FacilitiesTable";
import { myFetch } from "@/utils/myFetch";

const FacilitiesPage = async ({ searchParams }) => {
  const { doctor, representative, status, searchTerm, page } =
    await searchParams;
  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(doctor && { doctor }),
    ...(representative && { representative }),
    ...(status && { status }),
    ...(searchTerm && { searchTerm }),
    ...(page && { page }),
  });

  const res = await myFetch(`/facility?${queryParams.toString()}`, {
    tags: ["facilities"],
  });

  const doctorsRes = await myFetch(`/user/users?role=Doctor&limit=1000000`, {
    tags: ["users"],
  });

  const representativeRes = await myFetch(
    `/user/users?role=Representative&limit=1000000`,
    {
      tags: ["users"],
    }
  );

  return (
    <>
      <FacilitiesTable
        facilities={res?.data}
        meta={res?.pagination}
        filters={{ doctor, representative, status }}
        doctorsData={doctorsRes?.data}
        representativeData={representativeRes?.data}
      />
    </>
  );
};

export default FacilitiesPage;
