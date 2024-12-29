import { useSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/create-timeline") {
    // Check if the path is 'create-timeline'
    const { data: session, status } = useSession();
    const user = session?.user;

    // If user is not authenticated or not verified, redirect to login
    if (!user || !user.isVerified) {
      return NextResponse.redirect("/sign-in");
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}
