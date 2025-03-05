"use client";
import EditProfileModal from "@/components/page/profile/EditProfileModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ProfilePage = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <Tabs
      defaultValue={"profile-details"}
      className="flex flex-col gap-4 h-[calc(100vh-128px)] sticky top-32 bg-white p-6 rounded-xl"
    >
      <div className="border-b">
        <TabsList className="flex items-start gap-8 w-fit p-0">
          <TabsTrigger
            value={"profile-details"}
            key={"profile-details"}
            className="text-zinc-400 border-b-2 border-transparent rounded-none px-0 text-xl font-normal data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-primary"
          >
            Profile Details
          </TabsTrigger>
          <TabsTrigger
            value={"change-password"}
            key={"change-password"}
            className="text-zinc-400 border-b-2 border-transparent rounded-none px-0 text-xl font-normal data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-primary"
          >
            Change Password
          </TabsTrigger>
        </TabsList>
      </div>

      {/* tab content 1 */}
      <TabsContent
        value={"profile-details"}
        className="rounded-xl border-none p-0 overflow-y-scroll no-scrollbar"
      >
        {/* header */}
        <section className="flex justify-end items-center gap-2">
          <EditProfileModal />
        </section>
        {/* body */}
        <section className="flex gap-16">
          <div className="flex flex-col items-center gap-2">
            <Image
              src={
                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
              }
              alt="profile"
              width={250}
              height={250}
              className="rounded-2xl"
            />
            <h1 className="text-[#333333]">Md. Asadujjaman</h1>
            <p className="text-[#006EEE]">S.no. 2472</p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <p className="text-[#A1A1A1]">Name</p>
              <p className="text-[#5C5C5C]">Md. Asadujjaman</p>
            </div>
            <div className="grid gap-2">
              <p className="text-[#A1A1A1]">Position</p>
              <p className="text-primary">Admin</p>
            </div>
            <div className="grid gap-2">
              <p className="text-[#A1A1A1]">Email</p>
              <p className="text-[#5C5C5C]">me@example.com</p>
            </div>
            <div className="grid gap-2">
              <p className="text-[#A1A1A1]">Phone No</p>
              <p className="text-[#5C5C5C]">073 155 4568</p>
            </div>
            <div className="grid gap-2">
              <p className="text-[#A1A1A1]">Address</p>
              <p className="text-[#5C5C5C]">
                284 Daffodil Dr, Mount Frere, Eastern Cape -5088 South Africa
              </p>
            </div>
          </div>
        </section>
      </TabsContent>

      {/* tab content 2 */}
      <TabsContent
        value={"change-password"}
        className="rounded-xl border-none p-0 overflow-y-scroll no-scrollbar"
      >
        <section className="grid gap-8">
          <h1>Enter a new Password below to change your password</h1>
          <form>
            <div className="grid gap-6 px-0.5">
              <div className="grid gap-6">
                {/* old_password */}
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label
                      htmlFor="old_password"
                      className="text-[#414141] font-medium"
                    >
                      Old Password
                    </Label>
                  </div>
                  <div className="relative max-w-[600px]">
                    <Input
                      id="old_password"
                      type={`${isPasswordVisible ? "text" : "password"}`}
                      placeholder="Enter old password"
                      required
                    />
                    <span
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="text-slate-400 absolute right-3 top-3 cursor-pointer"
                    >
                      {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                    </span>
                  </div>
                </div>

                <p className="text-[#B6B6B6]">
                  Strong password required enter minimum 8 characters, <br /> Do
                  not include common words or names. <br /> Combine uppercase
                  letters, lowercase letters, numbers, and symbols.
                </p>

                {/* new_password */}
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label
                      htmlFor="new_password"
                      className="text-[#414141] font-medium"
                    >
                      New Password
                    </Label>
                  </div>
                  <div className="relative max-w-[600px]">
                    <Input
                      id="new_password"
                      type={`${isPasswordVisible ? "text" : "password"}`}
                      placeholder="Enter new password"
                      required
                    />
                    <span
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="text-slate-400 absolute right-3 top-3 cursor-pointer"
                    >
                      {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                    </span>
                  </div>
                </div>

                {/* confirm_password */}
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label
                      htmlFor="confirm_password"
                      className="text-[#414141] font-medium"
                    >
                      Confirm New Password
                    </Label>
                  </div>
                  <div className="relative max-w-[600px]">
                    <Input
                      id="confirm_password"
                      type={`${isPasswordVisible ? "text" : "password"}`}
                      placeholder="Enter new password again"
                      required
                    />
                    <span
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="text-slate-400 absolute right-3 top-3 cursor-pointer"
                    >
                      {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                    </span>
                  </div>
                </div>
                {/* submit button */}
                <div>
                  <Button type="submit" className="px-8">
                    Save & Change
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </section>
      </TabsContent>
    </Tabs>
  );
};

export default ProfilePage;
