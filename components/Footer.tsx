import Link from "next/link";
import React, { useEffect } from "react";

const Footer = () => {
  return (
    <footer className="max-w-3xl mx-auto text-text_secondary pt-12 pb-4">
      <h3 className="font-bold text-sm text-neutral-500 mb-2">LEGAL</h3>
      <ul className="mb-8 space-y-2">
        <li>
          <Link
            className="text-neutral-400 font-medium text-sm hover:text-neutral-200 duration-200"
            href="/legal/privacy-policy"
          >
            Privacy policy
          </Link>
        </li>
        <li>
          <Link
            className="text-neutral-400 font-medium text-sm hover:text-neutral-200 duration-200"
            href="/legal/terms-of-service"
          >
            Terms of service
          </Link>
        </li>
      </ul>
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs text-neutral-400">
          &copy; 2024 Timeliner. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
