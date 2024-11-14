import { Metadata } from "next";

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
      <main className="bg-white">{children}</main>
    </>
  );
}
