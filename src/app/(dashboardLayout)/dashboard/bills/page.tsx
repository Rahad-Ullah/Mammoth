import BillsTable from "@/components/page/bills/BillsTable";
import { myFetch } from "@/utils/myFetch";

const BillsPage = async ({ searchParams }) => {
  const { searchTerm, page } = await searchParams;
  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(searchTerm && { searchTerm }),
    ...(page && { page }),
  });

  const res = await myFetch(`/bill?${queryParams.toString()}`, {
    tags: ["bills"],
  });

  return (
    <>
      <BillsTable bills={res?.data} meta={res?.pagination} />
    </>
  );
};

export default BillsPage;
