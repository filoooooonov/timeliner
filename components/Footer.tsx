import Link from "next/link";
import React, { useEffect } from "react";
import { MdOutlineEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="max-w-7xl mx-auto text-text_secondary py-8 px-5 md:px-0">
      <ul className="flex gap-2 flex-col md:flex-row md:justify-between">
        <li className="space-x-4 flex justify-center">
          <Link
            className="text-neutral-400 font-medium hover:font-semibold hover:text-neutral-200 duration-200"
            href="/legal/privacy-policy"
          >
            Privacy
          </Link>
          <Link
            className="text-neutral-400 font-medium hover:font-semibold hover:text-neutral-200 duration-200"
            href="/legal/privacy-policy"
          >
            Terms
          </Link>
        </li>

        <li className="flex justify-center">
          <p className=" text-neutral-400 font-medium">
            &copy; 2024 Timeliner. All rights reserved.
          </p>
        </li>
        <li className="flex justify-center px-12">
          <Link
            className="text-neutral-400 font-medium hover:font-semibold hover:text-neutral-200 duration-200"
            href="mailto:alexfiloonov@gmail.com"
          >
            <MdOutlineEmail size={25} />
          </Link>
        </li>
      </ul>
      <div className="container mx-auto px-4 text-center"></div>
    </footer>
  );
};

export default Footer;
