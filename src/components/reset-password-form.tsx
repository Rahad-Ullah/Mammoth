"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfPasswordVisible, setIsConfPasswordVisible] = useState(false);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="p-4 md:px-20 md:py-12 shadow-none border-none bg-white/60 backdrop-blur-xl">
        <CardHeader className="text-center">
          <figure className="flex justify-center mb-4">
            <Image src={"/logo.png"} alt="logo" width={180} height={100} />
          </figure>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription className="pt-2 text-primary-foreground">
            Please enter your new password to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                {/* new password */}
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">New Password</Label>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={`${isPasswordVisible ? "text" : "password"}`}
                      placeholder="Enter password"
                      required
                      className="bg-white border-none shadow-none"
                    />
                    <span
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="text-slate-400 absolute right-3 top-3 cursor-pointer"
                    >
                      {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                    </span>
                  </div>
                </div>
                {/* confirm new password */}
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="conf-password">Confirm Password</Label>
                  </div>
                  <div className="relative">
                    <Input
                      id="conf-password"
                      type={`${isConfPasswordVisible ? "text" : "password"}`}
                      placeholder="Enter password"
                      required
                      className="bg-white border-none shadow-none"
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
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
