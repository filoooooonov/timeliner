import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const CreateTimelineButton = () => {
  const { data: session } = useSession();

  return (
    <Link
      href={session ? "/create-timeline" : "/register"}
      className="button-primary px-2 py-2"
    >
      Create timeline
    </Link>
  );
};

export default CreateTimelineButton;
