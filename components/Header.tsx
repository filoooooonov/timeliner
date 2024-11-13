import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="container mx-auto px-4 py-6">
      <nav className="flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          Timeliner.
        </Link>
        <div className="space-x-6">
          <Link
            href="/"
            className="hover:text-primary duration-300 text-zinc-400 p-2"
          >
            About
          </Link>
          <Link href="/" className="button-secondary">
            Log in
          </Link>
          <Link href="/" className="button-primary px-3 py-3">
            Create timeline
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
