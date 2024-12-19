import FeedBack from "@/components/FeedBack";
import HeaderHome from "@/components/HeaderHome";
import Hero from "@/components/hero";

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

      <div className="py-32 px-5 md:px-0 lg:grid lg:grid-cols-2 flex flex-col max-w-5xl mx-auto">
        <div>
          <h2>Here's how it works</h2>

          <div className="mt-12">
            <div className="border-b-4 border-primary py-5">
              <h3 className="text-2xl font-semibold text-neutral-300 text-primary">
                Add your company
              </h3>
              <p className="text-neutral-400 text-sm mt-2">
                Share what your company does, who founded it, how many years it
                is in business and other interesting info!
              </p>
            </div>
          </div>
          <div className="mt-12">
            <div className="border-b-4 border-neutral-800 py-5">
              <h3 className="text-2xl font-semibold text-neutral-300 text-neutral-300">
                Create your timeline
              </h3>
              <p className="text-neutral-400 text-sm mt-2">
                Add entries that each correspond to a period in your company's
                development and share what happened then
              </p>
            </div>
          </div>
          <div className="mt-12">
            <div className="border-b-4 border-neutral-800 py-5">
              <h3 className="text-2xl font-semibold text-neutral-300 text-neutral-300">
                Enjoy and share
              </h3>
              <p className="text-neutral-400 text-sm mt-2">
                Your story is engraved in stone, now you can edit it and share
                your timeline with others!
              </p>
            </div>
          </div>
        </div>
        <div className="w-[80%] lg:w-[60%] rounded-xl bg-neutral-900  h-[600px] mx-auto lg:ml-auto bg-gradient-to-tl from-primary/5 to-neutral-0900"></div>
      </div>

      <FeedBack />
    </>
  );
}
