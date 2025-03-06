import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { FormProvider } from "@/contexts/FormContext";
import { TestFormProvider } from "@/contexts/testFormContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mammoth",
  description: "CRM for Health Care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased bg-gradient-to-tl from-[#CEE9FF] to-[#E1E3EB] min-h-screen`}
      >
        <FormProvider>
          <TestFormProvider>{children}</TestFormProvider>
        </FormProvider>
      </body>
    </html>
  );
}
