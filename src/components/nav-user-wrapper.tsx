import nexiosInstance, { ApiResponse } from "../../nexios.config";
import { NavUser } from "./nav-user";

const NavUserWrapper = async () => {
  const { data } = await nexiosInstance.get<ApiResponse>("/user/profile");

  return <NavUser user={data?.data} />;
};

export default NavUserWrapper;
