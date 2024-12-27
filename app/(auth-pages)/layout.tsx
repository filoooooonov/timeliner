import Footer from "@/components/Footer";
import HeaderMinimal from "@/components/HeaderMinimal";
import { Metadata } from "next";
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
    <div className="flex min-h-screen flex-col justify-center items-center gap-12">
      <Toaster position="bottom-center" />
      <div>{children}</div>
    </div>
  );
}
