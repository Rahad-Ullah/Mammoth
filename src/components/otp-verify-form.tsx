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
import Image from "next/image";
import Link from "next/link";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export function OtpVerifyForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="p-4 md:px-20 md:py-12 shadow-none border-none bg-white/60 backdrop-blur-xl">
        <CardHeader className="text-center">
          <figure className="flex justify-center pb-4">
            <Image src={"/logo.png"} alt="logo" width={180} height={100} />
          </figure>
          <CardTitle className="text-2xl">Verification code</CardTitle>
          <CardDescription className="pt-2 text-primary-foreground">
            We sent a reset link to contact@dscode...com. Enter 5 digit code
            that is mentioned in the email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                {/* email */}
                <div className="grid gap-2 mt-2">
                  <InputOTP maxLength={5} pattern={REGEXP_ONLY_DIGITS}>
                    <InputOTPGroup className="w-full justify-center gap-2 md:gap-6">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                {/* submit button */}
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </div>
              {/* link to sign up */}
              <div className="text-center text-sm mt-6">
                You have not received the email?{" "}
                <Link
                  href=""
                  className="font-medium text-primary-foreground hover:underline underline-offset-4"
                >
                  Resend
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
