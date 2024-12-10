import { Metadata } from "next";
import HeaderMinimal from "@/components/HeaderMinimal";

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
      <HeaderMinimal />
      <main className="bg-background">{children}</main>
    </>
  );
}
