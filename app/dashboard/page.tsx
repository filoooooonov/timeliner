"use client";

import React, { Suspense } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import User from "@/models/user";
import { connectMongoDB } from "@/lib/mongo";
import { CompanyData } from "../[slug]/page";
import Dashboard from "@/app/dashboard/Dashboard";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session, status } = useSession();

  if (status !== "authenticated" && status !== "loading") {
    redirect("/");
  }

  if (!session?.user.id) {
    return <div>Loading...</div>;
  }

  return <Dashboard userId={session?.user.id} userName={session?.user.name} />;
};

export default Page;
