import Footer from "@/components/Footer";
import HeaderMinimal from "@/components/HeaderMinimal";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Sign up · Timeline",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col justify-center items-center gap-12">
      <Toaster position="bottom-center" />
      <div>{children}</div>
      <Link
        href="/"
        className="absolute top-16 left-16 flex items-center gap-2 font-semibold 
        text-neutral-500 hover:text-neutral-200  hover:bg-neutral-900 
        duration-200 px-4 py-3 rounded-full"
      >
        <ChevronLeft />
        Home
      </Link>
    </div>
  );
}
