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
      url: "/dashboard/user-details",
      icon: UsersRound,
    },
    {
      title: "Bill Details",
      url: "/dashboard/bill-details",
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
    "https://s3-alpha-sig.figma.com/img/e632/dc20/86efa3df337e8c215dd8095476bb6513?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=WYL8~jvcgEMAxObUvAOOVxwTjtwLtbSaQuUHyzQAHUZ8vsoryajL-3T9XsEDVWexBiys0D4Vd9QtQLP75FU~Dj4hRQyozFAhhOZPfdD-xV7byFLqsOLEFCcgNqOwa18WAqq9119xO-vvRuj8uy4-OChvZQ-uJM75A96r40Id6ZrUlHPzPoiQ9wgC8P7hrvJ3W3nQH685eP-3S~a-JtavA3K8KRAF4FNZpySdfeGpcGwzn0-rYUwhSHmxiVsNX6bVGZkIbHIGCbWkb57Bdw4nhHMDtFceMYlJcBoh6tB3cDnKVO~2mJOzNC36wVzb8lelhYfYYUs9QmlC9ZCg~ay-iQ__",
};
