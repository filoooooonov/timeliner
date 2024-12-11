import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { TiPlus } from "react-icons/ti";

import SignOutButton from "@/components/SignOutButton";
import { Plus } from "lucide-react";

const Dashboard = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <main className="px-5 max-w-5xl mx-auto pt-20">
      <div className="grid grid-cols-2 mb-32">
        <h1 className="text-5xl">Hello, {session.user?.name}</h1>
        <div className="ml-auto flex flex-col gap-4">
          <SignOutButton text="Sign out" />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="">Your companies</h2>
        <button className="button-secondary">
          <TiPlus size={15} />
          Add company
        </button>
      </div>

      <div className="mt-12 md:grid md:grid-cols-2 flex flex-col gap-8">
        <div className="p-6 bg-neutral-800/60 hover:bg-neutral-800/80 transition duration-200 rounded-lg shadow-md border-t-2 border-neutral-800 cursor-pointer flex flex-col">
          <div className="flex flex-row gap-4">
            <div className="bg-amber-300 rounded-full size-10"></div>
            <h2>Google</h2>
          </div>

          <div className="flex flex-col w-full">
            <p className="text-sm">
              Google, founded in 1998, is a global leader in internet services,
              known for its dominant search engine and products like Gmail,
              Google Maps, and Android. It excels in cloud computing, artificial
              intelligence, and ...
            </p>
          </div>
        </div>
        <div className="p-6 bg-neutral-800/60 hover:bg-neutral-800/80 transition duration-200 rounded-lg shadow-md border-t-2 border-neutral-800 cursor-pointer flex flex-col">
          <div className="flex flex-row gap-4">
            <div className="bg-purple-300 rounded-full size-10"></div>
            <h2>Vercel</h2>
          </div>

          <div className="flex flex-col w-full">
            <p className="text-sm">
              Google, founded in 1998, is a global leader in internet services,
              known for its dominant search engine and products like Gmail,
              Google Maps, and Android. It excels in cloud computing, artificial
              intelligence, and ...
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
