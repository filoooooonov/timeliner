import { Metadata } from "next";
import HeaderMinimal from "@/components/HeaderMinimal";

export const metadata: Metadata = {
  title: "Dashboard · Timeline",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderMinimal />
      <main className="bg-background max-w-3xl mx-auto">{children}</main>
    </>
  );
}
