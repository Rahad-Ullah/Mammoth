import { myFetch } from "@/utils/myFetch";
import { NavUser } from "./nav-user";

const NavUserWrapper = async () => {
  const res = await myFetch("/user/profile", {
    tags: ["user-profile"],
  });

  return <NavUser user={res?.data} />;
};

export default NavUserWrapper;
