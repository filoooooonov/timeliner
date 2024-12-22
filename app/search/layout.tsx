import HeaderMinimal from "@/components/HeaderMinimal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search · Timeline",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="bg-background">
        <div className="min-h-screen">
          <HeaderMinimal />
          {children}
        </div>
      </main>
    </>
  );
}
