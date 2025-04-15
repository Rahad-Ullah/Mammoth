import TestsTable from "@/components/page/tests/TestsTable";
import { myFetch } from "@/utils/myFetch";

const TestPage = async ({ searchParams }) => {
  const { doctor, facility, status, page } = await searchParams;

  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(doctor && { doctor }),
    ...(facility && { facility }),
    ...(status && { status }),
    ...(page && { page }),
  });

  const res = await myFetch(`/report?${queryParams.toString()}`, {
    tags: ["tests"],
  });

  return (
    <>
      <TestsTable
        tests={res?.data}
        meta={res?.pagination}
        filters={{ doctor, facility, status }}
      />
    </>
  );
};

export default TestPage;
