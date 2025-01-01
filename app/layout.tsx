import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import LoadingPage from "./[slug]/loading";

import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";
import Head from "next/head";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Timeliner.",
  description:
    "Commemorate and share your startup's story with Timeliner. Let them know how it started.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <Head>
        <script src="https://www.google.com/recaptcha/enterprise.js?render=6LfrUqsqAAAAACeaP4W912fKNQlzSsaMMG3Tq4Pm"></script>
      </Head>

      <SessionProvider session={session}>
        <body className="relative bg-background text-foreground">
          <Suspense fallback={<LoadingPage />}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Footer />
            </ThemeProvider>
          </Suspense>
        </body>
      </SessionProvider>
    </html>
  );
}
