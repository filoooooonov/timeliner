import HeaderMinimal from "@/components/HeaderMinimal";
import { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Timeline",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="bg-background">
        <HeaderMinimal />
        <Toaster />
        {children}
      </main>
    </>
  );
}
