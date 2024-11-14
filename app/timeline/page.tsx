import HeaderHome from "@/components/HeaderHome";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import React from "react";
import defaultImg from "@/public/google_logo.webp";

export default async function page() {
  return (
    <div className="bg-background">
      <Image
        src={defaultImg}
        alt="company logo"
        className="h-[30vh] object-cover"
      />
      <main className="w-[65%] mx-auto bg-background mt-10">
        <div className="grid grid-cols-2">
          <h1 className="text-5xl font-semibold">Company Name</h1>
          <div className="ml-auto flex items-center button-secondary">
            <p>Est. September 1998</p>
          </div>
          <div>
            <p className="mt-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae animi voluptatibus ducimus? Obcaecati cupiditate
              laborum placeat quod ipsa, dignissimos porro eius aliquam nostrum
              sequi est saepe nesciunt, explicabo sunt quam.
            </p>
          </div>
          <div className="ml-auto bg-zinc-900 rounded-md p-4 h-max min-w-[200px] mt-8">
            <h2 className="text-2xl font-semibold mb-2 text-zinc-300">
              Socials
            </h2>
            <ul>
              <li className="text-zinc-400">Facebook</li>
              <li className="text-zinc-400">Instagram</li>
            </ul>
          </div>
        </div>
      </main>

      {/* <main className="mx-auto">
        <section className="mx-auto bg-zinc-800 h-[30vh] w-full">
          <div className="relative px-5 pb-5 mx-auto  h-full">
            <h1 className="absolute bottom-8 text-5xl font-semibold">
              Company Name
            </h1>
          </div>
        </section>

        <section className="bg-background">
          <div className="bg-zinc-800 rounded-md px-3 py-2 w-max">Tag 1</div>
        </section>
      </main> */}
    </div>
  );
}
