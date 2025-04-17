import TestsTable from "@/components/page/tests/TestsTable";
import { myFetch } from "@/utils/myFetch";

const TestPage = async ({ searchParams }) => {
  const { doctor, facility, status, page, searchTerm } = await searchParams;

  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(doctor && { doctor }),
    ...(facility && { facility }),
    ...(status && { status }),
    ...(searchTerm && { searchTerm }),
    ...(page && { page }),
  });

  const res = await myFetch(`/report?${queryParams.toString()}`, {
    tags: ["tests"],
  });

  const facilitiesRes = await myFetch(`/facility?status=Active`, {
    tags: ["facilities"],
  });

  return (
    <>
      <TestsTable
        tests={res?.data}
        meta={res?.pagination}
        filters={{ doctor, facility, status }}
        facilitiesData={facilitiesRes?.data}
      />
    </>
  );
};

export default TestPage;
