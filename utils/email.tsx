import {
  Html,
  Button,
  Container,
  Heading,
  Text,
  Head,
  Font,
  Img,
} from "@react-email/components";
import { Tailwind } from "@react-email/components";
import { GeistSans } from "geist/font/sans";
import BigLogo from "@/public/timeliner_big_logo.png";

interface EmailProps {
  url: string;
}

export const Email: React.FC<Readonly<EmailProps>> = ({ url }) => {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              primary: "#cef36f",
              background: "#0f0f0f",
            },
            fontFamily: {
              sans: [GeistSans.className, "sans-serif"], // Use GeistSans className here
            },
          },
        },
      }}
    >
      <Html
        lang="en"
        className={`w-full bg-background ${GeistSans.className} py-16`}
      >
        <Head>
          <Font
            fontFamily="Geist"
            fallbackFontFamily="Verdana"
            webFont={{
              url: "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap",
              format: "woff2",
            }}
            fontWeight={500}
            fontStyle="normal"
          />
        </Head>
        <Container>
          <Button
            href={process.env.NEXT_PUBLIC_PROD_URL}
            className="mb-12 font-bold text-3xl text-primary"
          >
            Timeliner.
          </Button>
          <Heading className=" text-4xl font-semibold text-white">
            Verify your email address
          </Heading>
          <Text className="mb-6 mt-16 text-neutral-200">
            Welcome to Timeliner!
          </Text>
          <Text className="leading-[24px] text-neutral-200">
            Click the link below to verify your email address and get started.
            If you did not create an account, you can safely ignore this email.
          </Text>
          <Button
            href={url}
            className="bg-primary text-black font-medium px-4 py-2 w-max mx-auto mt-8 rounded-md"
          >
            Verify email address
          </Button>
        </Container>
      </Html>
    </Tailwind>
  );
};
