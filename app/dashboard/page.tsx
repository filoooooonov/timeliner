import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import SignOutButton from "@/components/SignOutButton";

const Dashboard = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <main className="px-5">
      <h1>Dashboard</h1>
      <SignOutButton text="Sign out" />
    </main>
  );
};

export default Dashboard;
