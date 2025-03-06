import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="py-16">
      <div className="flex justify-center mb-6">
        <Image src="/logo.svg" alt="Mammoth Logo" width={200} height={100} />
      </div>

      <h1 className="text-3xl font-medium text-center mb-8">
        Welcome to <span className="text-primary-foreground">MAMMOTH</span>
      </h1>

      <section className="py-16">
        <h1 className="text-2xl font-medium text-center">
          Authentication Pages
        </h1>
        <div className="flex flex-col justify-center items-center gap-6 my-6">
          <Link href={"/login"}>
            <Button>Login</Button>
          </Link>
          <Link href={"/forgot-password"}>
            <Button>Forgot Password</Button>
          </Link>
          <Link href={"/reset-password"}>
            <Button>Reset Password</Button>
          </Link>
          <Link href={"/otp-verify"}>
            <Button>OTP Verify</Button>
          </Link>
          <h1 className="text-2xl font-medium text-center">Dashboard Pages</h1>
          <Link href={"/dashboard/tests"}>
            <Button>Dashboard</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
