import UsersTable from "@/components/page/users/UsersTable";
import { myFetch } from "@/utils/myFetch";

const UsersPage = async ({ searchParams }) => {
  const { role, searchTerm, page } = await searchParams;
  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(role && { role }),
    ...(searchTerm && { searchTerm }),
    ...(page && { page }),
  });

  const res = await myFetch(`/user/users?${queryParams.toString()}`, {
    tags: ["users"],
  });

  return (
    <>
      <UsersTable users={res?.data} meta={res?.pagination} filters={{ role }} />
    </>
  );
};

export default UsersPage;
