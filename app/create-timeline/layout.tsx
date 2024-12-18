import { Metadata } from "next";

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
      <main className="bg-background">{children}</main>
    </>
  );
}
