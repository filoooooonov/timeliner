"use client";

import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import Dashboard from "@/app/dashboard/Dashboard";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session, status } = useSession();

  if (status !== "authenticated" && status !== "loading") {
    redirect("/");
  }

  if (!session?.user.id) {
    return <div className="text-center mt-80">Loading...</div>;
  }

  return <Dashboard userId={session?.user.id} userName={session?.user.name} />;
};

export default Page;
