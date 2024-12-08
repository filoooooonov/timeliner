import HeaderHome from "@/components/HeaderHome";
import Hero from "@/components/hero";

export default async function Index() {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center">
        <div className="flex-1 w-full flex flex-col gap-20 items-center dot-background">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

          <div className="flex z-20 flex-col gap-20 w-[75%] px-5 pb-5">
            <HeaderHome />
            <Hero />
          </div>
        </div>
      </main>

      <div className="z-10 bg-background h-[50vh]"></div>
    </>
  );
}
