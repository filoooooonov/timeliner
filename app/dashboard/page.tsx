"use client";

import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import User from "@/models/user";
import { connectMongoDB } from "@/lib/mongo";
import { CompanyData } from "../timeline/[slug]/page";
import Dashboard from "@/app/dashboard/Dashboard";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session, status } = useSession();

  if (status !== "authenticated" || !session) {
    redirect("/");
  }

  return <Dashboard userId={session?.user.id} />;
};

export default Page;
