import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-lime-400">
            Timeliner
          </Link>
          <div className="space-x-4">
            <Link
              href="#features"
              className="hover:text-lime-400 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="hover:text-lime-400 transition-colors"
            >
              About
            </Link>
            <button className="border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-gray-900">
              Sign Up
            </button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Let them know <span className="text-lime-400">how it started</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Commemorate and share your startup&apos;s story with Timeliner
          </p>
          <button className="bg-lime-400 text-gray-900 hover:bg-lime-500 px-8 py-3 text-lg">
            Get Started
          </button>
        </section>

        <section className="mb-16">
          <div className="bg-gray-900 rounded-lg p-4 aspect-video relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              <p className="text-2xl font-semibold">
                Your Dashboard Screenshot Here
              </p>
            </div>
          </div>
        </section>

        <section id="features" className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-lime-400">
              Easy Timeline Creation
            </h3>
            <p>
              Create beautiful, interactive timelines with just a few clicks.
              Showcase your startup&apos;s journey effortlessly.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-lime-400">
              Collaborative Editing
            </h3>
            <p>
              Invite team members to contribute and edit your timeline. Build
              your story together.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-lime-400">
              Customizable Design
            </h3>
            <p>
              Personalize your timeline with custom colors, fonts, and layouts
              to match your brand identity.
            </p>
          </div>
        </section>

        <section id="about" className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">About Timeliner</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Timeliner was born from the idea that every startup has a unique
            story worth sharing. Our platform makes it easy to create,
            customize, and share your journey with the world.
          </p>
        </section>

        <section className="bg-gray-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Stay Updated</h2>
          <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 text-gray-100 border-gray-600"
            />
            <button
              type="submit"
              className="bg-lime-400 text-gray-900 hover:bg-lime-500"
            >
              Subscribe
            </button>
          </form>
        </section>
      </main>

      <footer className="bg-gray-900 mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Timeliner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
