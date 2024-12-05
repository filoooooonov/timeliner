import Link from "next/link";
import { ContainerScroll } from "./ui/container-scroll-animation";
import Image from "next/image";
import timelinerDemo from "@/public/placeholderDemo.webp";

export default function Home() {
  const placeholders = ["start-ups", "companies", "projects"];

  return (
    <div className="min-h-screen text-gray-100 mt-32">
      <section className="mb-16 mt-40">
        <div className="w-full rounded-lg p-4  relative">
          <div className="absolute inset-0 flex items-center justify-center mt-60">
            <ContainerScroll
              titleComponent={
                <>
                  <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                      Let them know{" "}
                      <span className="text-primary">how it started</span>
                    </h1>
                    <p className="text-lg text-text_secondary md:text-2xl mb-16 max-w-2xl mx-auto">
                      Commemorate and share your startup&apos;s story with
                      Timeliner.
                    </p>
                    <button className="button-primary px-4 py-3">
                      Create timeline
                    </button>
                  </div>
                </>
              }
            >
              <Image
                src={timelinerDemo}
                alt="timeliner demo image"
                height={720}
                width={1400}
                className="mx-auto rounded-2xl object-cover h-full object-left-top"
                draggable={false}
              />
            </ContainerScroll>
          </div>
        </div>
      </section>

      {/* <section className="bg-gray-900 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Stay Updated</h2>
        <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-gray-800 text-gray-100 border-gray-600"
          />
          <button
            type="submit"
            className="bg-primary text-gray-900 hover:bg-lime-500"
          >
            Subscribe
          </button>
        </form>
      </section> */}
    </div>
  );
}
