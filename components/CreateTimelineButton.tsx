"use client";

import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
}

const CreateTimelineButton = ({ className }: { className?: string }) => {
  const { data: session } = useSession();

  return (
    <Link
      href={session ? "/create-timeline" : "/register"}
      className={clsx("button-primary", className)}
    >
      Create timeline
    </Link>
  );
};

export default CreateTimelineButton;
