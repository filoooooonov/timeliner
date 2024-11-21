import Link from "next/link";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function App() {
  return (
    <main className="max-w-[40%] mx-auto mt-40">
      <Link
        href="/"
        className="text-base mb-2 text-stone-500 flex items-center gap-2 hover:text-stone-300 duration-200"
      >
        <IoIosArrowBack /> Go back
      </Link>
      <h2>
        Create your <span className="text-primary">timeline</span>.
      </h2>
      <form className="flex flex-col gap-8">
        <input type="text" placeholder="Company name" />
        <input type="datetime" placeholder="Date of establishment" />
        <textarea placeholder="Description" />

        <input
          type="submit"
          value="Create the timeline"
          className="button-primary px-4 py-2 w-max"
        />
      </form>
    </main>
  );
}
