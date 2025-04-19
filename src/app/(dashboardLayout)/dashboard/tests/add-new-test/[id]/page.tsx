import AddTestForm from "@/components/page/addTest/AddTestForm";
import { myFetch } from "@/utils/myFetch";

const AddTestPage = async () => {
  const doctorsRes = await myFetch(`/user/users?role=Doctor`, {
    tags: ["users"],
  });

  return (
    <div>
      <AddTestForm doctors={doctorsRes?.data}/>
    </div>
  );
};

export default AddTestPage;
