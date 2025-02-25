import { TUser } from "@/types/user";
import Image from "next/image";

const UserCard = ({ user }: { user: TUser }) => {
  return (
    <div className="flex gap-10">
      <figure className="p-2 col-span-1">
        <Image
          src={user.image}
          alt="user image"
          width={200}
          height={200}
          className="rounded-2xl"
        ></Image>
      </figure>
      <div className="">
        <h1 className="text-xl font-medium text-primary capitalize mb-4 py-2">
          {user.role}:
        </h1>
        <ul className="grid grid-cols-2 gap-6 h-fit">
          <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <span className="text-zinc-400">Name </span>
            <span>
              : {user.first_name} {user.last_name}
            </span>
          </li>
          <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <span className="text-zinc-400">Company </span>
            <span>: {user.company}</span>
          </li>
          <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <span className="text-zinc-400">Email </span>
            <span>: {user.email}</span>
          </li>
          <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <span className="text-zinc-400">Contact Number </span>
            <span>: {user.phone}</span>
          </li>
          <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <span className="text-zinc-400">Address</span>
            <span>: {user.address}</span>
          </li>
          {user.facility_location && (
            <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <span className="text-zinc-400">Facility Location</span>
              <span>: {user.facility_location}</span>
            </li>
          )}
          {user.apt_number && (
            <li className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <span className="text-zinc-400">APT Number</span>
              <span>: {user.apt_number}</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserCard;
