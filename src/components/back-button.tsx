"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <span
      onClick={() => router.back()}
      className="absolute left-4 top-4 p-2 text-zinc-400 hover:text-primary cursor-pointer"
    >
      <ChevronLeft />
    </span>
  );
};

export default BackButton;
