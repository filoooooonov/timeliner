import FeedBack from "@/components/FeedBack";
import HeaderHome from "@/components/HeaderHome";
import Hero from "@/components/hero";
import HowItWorks from "@/components/HowItWorks";

export default async function Index() {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center">
        <div className="flex-1 w-full flex flex-col gap-20 items-center dot-background">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

          <div className="flex z-20 flex-col gap-20 md:w-[75%] px-4 pb-4">
            <HeaderHome />
            <Hero />
          </div>
        </div>
      </main>

      {/* <div className="z-10 bg-background h-[50vh] max-w-5xl mx-auto pt-40">
        <div className="w-[30%] h-auto bg-neutral-900 rounded-lg flex flex-col  overflow-hidden">
          <div className="relative h-20 bg-neutral-800/50 flex justify-end p-6">
            <span className="text-stone-600 font-bold text-6xl">01</span>
          </div>
          <div className="p-6">
            <h2 className="text-neutral-400 text-2xl">Add your company</h2>
          </div>
        </div>
      </div> */}

      <HowItWorks />

      <FeedBack />
    </>
  );
}
