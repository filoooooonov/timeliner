"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <main className="px-5">
      <h1>Dashboard</h1>
      {!session ? (
        <Link href="/log-in">Please, log in</Link>
      ) : (
        <>
          {/* <p>{session.user?.email}</p> */}
          {/* <button
            onClick={() => {
              signOut();
            }}
            className="button-primary mt-20 px-4 py-3 "
          >
            Sign out
          </button> */}
        </>
      )}
    </main>
  );
};

export default Dashboard;
