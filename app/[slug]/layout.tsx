import FeedBack from "@/components/FeedBack";
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
        <div className="h-screen">
          <HeaderMinimal />
          <Toaster />
          {children}
        </div>
      </main>
    </>
  );
}
