import AddNewUserForm from "@/components/page/addUser/AddUserForm";
import { myFetch } from "@/utils/myFetch";

const AddUserPage = async () => {
  const facilitiesRes = await myFetch("/facility?status=Active", {
    tags: ["facilities"],
  });

  return <AddNewUserForm facilities={facilitiesRes?.data} />;
};

export default AddUserPage;
