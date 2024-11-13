import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen text-gray-100">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Let them know <span className="text-primary">how it started</span>
        </h1>
        <p className="text-lg text-text_secondary md:text-2xl mb-16 max-w-2xl mx-auto">
          Commemorate and share your startup&apos;s story with Timeliner.
        </p>
        <button className="button-primary px-4 py-3">Create timeline</button>
      </section>

      <section className="mb-16 mt-40">
        <div className="bg-zinc-900 w-full rounded-lg p-4 aspect-video relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <p className="text-2xl font-semibold">
              Your Dashboard Screenshot Here
            </p>
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
