import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create your timeline",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="relative bg-background">
        {children}
        <Link
          href="/"
          className="absolute top-16 left-16 flex items-center gap-2 font-semibold 
        text-neutral-500 hover:text-neutral-200  hover:bg-neutral-900 
        duration-200 px-4 py-3 rounded-full"
        >
          <ChevronLeft />
          Home
        </Link>
      </main>
    </>
  );
}
