import Link from "next/link";
import React, { useEffect } from "react";

const Footer = () => {
  return (
    <footer className="max-w-3xl mx-auto text-text_secondary mt-16 pt-12 pb-4">
      {/* <ul className="mb-8 space-y-2">
        <li>
          <Link href="/">Privacy policy</Link>
        </li>
        <li>
          <Link href="/">Terms of services</Link>
        </li>
      </ul> */}
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs">&copy; 2024 Timeliner. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
