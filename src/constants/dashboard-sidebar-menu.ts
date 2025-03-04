import {
  FlaskConical,
  MapPinned,
  Settings,
  Users,
  UsersRound,
  Wrench,
} from "lucide-react";

export const sidebarMenu = {
  navMain: [
    {
      title: "Tests",
      url: "/dashboard/tests",
      icon: FlaskConical,
      isActive: true,
    },
    {
      title: "Patients",
      url: "/dashboard/patients",
      icon: Users,
    },
    {
      title: "User Details",
      url: "/dashboard/users",
      icon: UsersRound,
    },
    {
      title: "Bill Details",
      url: "/dashboard/bills",
      icon: Settings,
    },
  ],
  settings: [
    {
      name: "Facilities",
      url: "/dashboard/facilities",
      icon: MapPinned,
    },
    {
      name: "Toolbox",
      url: "/dashboard/toolbox",
      icon: Wrench,
    },
  ],
};

export const userData = {
  name: "Md. Asadujjaman",
  email: "me@example.com",
  role: "Admin",
  avatar:
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
};
