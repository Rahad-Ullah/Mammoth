import AddFacilityForm from "@/components/page/addFacility/addFacilityForm";
import { myFetch } from "@/utils/myFetch";

const AddNewFacilityPage = async () => {
  const usersRes = await myFetch(`/user/users?role=Representative`, {
    tags: ["users"],
  });

  return (
    <>
      <AddFacilityForm representatives={usersRes?.data} />
    </>
  );
};

export default AddNewFacilityPage;
