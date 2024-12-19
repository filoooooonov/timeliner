import { Metadata } from "next";
import HeaderMinimal from "@/components/HeaderMinimal";
import FeedBack from "@/components/FeedBack";

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
      <main className="bg-background">
        <div className="h-screen">{children}</div>
        <FeedBack />
      </main>
    </>
  );
}
