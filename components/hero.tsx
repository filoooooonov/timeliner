import Link from "next/link";
import { ContainerScroll } from "./ui/container-scroll-animation";
import Image from "next/image";
import timelinerDemo from "@/public/placeholderDemo.webp";
import CreateTimelineButton from "./CreateTimelineButton";

export default function Home() {
  return (
    <div className="min-h-screen text-gray-100">
      <section className="mb-16">
        <div className="w-full rounded-lg relative">
          <div className="flex items-center justify-center">
            <ContainerScroll
              titleComponent={
                <>
                  <div className="text-center mb-24 md:mb-32">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                      Let them know{" "}
                      <span className="text-primary">how it started</span>
                    </h1>
                    <p className="text-lg text-text_secondary md:text-2xl mb-16 max-w-2xl mx-auto">
                      Commemorate and share your startup&apos;s story with
                      Timeliner.
                    </p>
                    <div className="flex flex-row lg:mt-32 gap-4 mx-auto w-max">
                      <div className="flex flex-col mt-0 ">
                        <CreateTimelineButton className="px-4 py-2 w-max mx-auto" />
                      </div>
                      <Link
                        href="/search"
                        className="button-secondary px-4 py-2"
                      >
                        Browse all companies
                      </Link>
                    </div>
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
