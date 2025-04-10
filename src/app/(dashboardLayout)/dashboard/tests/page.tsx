import TestsTable from "@/components/page/tests/TestsTable";
import { myFetch } from "@/utils/myFetch";

const TestPage = async ({ searchParams }) => {
  const { doctor, facility, status } = await searchParams;

  const res = await myFetch("/report", { tags: ["tests"] });

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
