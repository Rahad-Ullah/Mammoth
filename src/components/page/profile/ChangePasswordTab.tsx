"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TUser } from "@/types/user";

const ChangePasswordTab = ({ user }: { user: TUser }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfPasswordVisible, setIsConfPasswordVisible] = useState(false);

  console.log(user);
  return (
    <>
      <section className="grid gap-8">
        <h1>Enter a new password below to change your password</h1>
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
                    type={`${isNewPasswordVisible ? "text" : "password"}`}
                    placeholder="Enter new password"
                    required
                  />
                  <span
                    onClick={() =>
                      setIsNewPasswordVisible(!isNewPasswordVisible)
                    }
                    className="text-slate-400 absolute right-3 top-3 cursor-pointer"
                  >
                    {isNewPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
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
                    type={`${isConfPasswordVisible ? "text" : "password"}`}
                    placeholder="Enter new password again"
                    required
                  />
                  <span
                    onClick={() =>
                      setIsConfPasswordVisible(!isConfPasswordVisible)
                    }
                    className="text-slate-400 absolute right-3 top-3 cursor-pointer"
                  >
                    {isConfPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
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
    </>
  );
};

export default ChangePasswordTab;
