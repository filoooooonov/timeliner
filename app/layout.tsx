import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import LoadingPage from "./[slug]/loading";
import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";
import Head from "next/head";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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
  const MEASUREMENT_ID = "G-P8J0Q1WGFK";
  const GTM_ID = "GTM-58NBRQJ7";

  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <GoogleAnalytics GA_MEASUREMENT_ID={MEASUREMENT_ID} />

      <Head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${MEASUREMENT_ID}');
            `,
          }}
        />
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
