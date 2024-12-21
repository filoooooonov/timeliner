import { Code, Code2, LinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const FeedBack = () => {
  return (
    <div className="w-full bg-black px-5 md:px-0">
      <div className="max-w-4xl py-32 mx-auto flex justify-center flex-col gap-6 text-center">
        <Code2 size={30} className="text-neutral-500 flex md:hidden mx-auto" />

        <h2 className="text-center flex items-center gap-4 mx-auto text-neutral-200">
          <Code2 size={30} className="text-neutral-500 hidden md:flex" />
          Timeliner is still in development{" "}
          <span className="hidden md:flex">. . .</span>
        </h2>
        <p>
          Below you can share any bugs, wishes and thoughts about
          <Link href="/" className="text-primary px-1">
            Timeliner.
          </Link>
          with me!
        </p>
        <a
          target="_blank"
          href="https://docs.google.com/forms/d/e/1FAIpQLSeqiq88c63NlRtbi1zT0kKvuQ7BaMGzq-G42Cn2xrIPPllXrg/viewform?usp=dialog"
        >
          <button className="button-primary px-4 py-2 w-max mx-auto mt-8">
            Leave feedback
          </button>
        </a>
      </div>
    </div>
  );
};

export default FeedBack;
