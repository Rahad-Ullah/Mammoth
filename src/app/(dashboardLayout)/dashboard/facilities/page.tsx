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

  return (
    <>
      <FacilitiesTable
        facilities={res?.data}
        meta={res?.pagination}
        filters={{ doctor, representative, status }}
      />
    </>
  );
};

export default FacilitiesPage;
