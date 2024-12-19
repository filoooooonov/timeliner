import Link from "next/link";
import { ContainerScroll } from "./ui/container-scroll-animation";
import Image from "next/image";
import timelinerDemo from "@/public/placeholderDemo.webp";
import CreateTimelineButton from "./CreateTimelineButton";
import { MdOpenInNew } from "react-icons/md";

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
                    <div className="mx-auto mb-6 bg-black w-max px-4 py-1 rounded-full border-2 border-neutral-900 flex flex-row">
                      👋 Built by{" "}
                      <a
                        href="https://filoooooonov.github.io"
                        target="_blank"
                        className="px-1 text-neutral-400 font-medium flex items-center gap-2 hover:font-bold duration-300"
                      >
                        Aleksei
                        <MdOpenInNew />
                      </a>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                      Let them know{" "}
                      <span className="text-primary">how it started</span>
                    </h1>
                    <p className="text-lg text-neutral-400 md:text-2xl mb-16 max-w-2xl mx-auto">
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
    </div>
  );
}
