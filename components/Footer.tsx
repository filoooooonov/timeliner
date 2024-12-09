import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" text-text_secondary mt-16 pt-12 pb-4">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs">
          &copy; {currentYear} Timeliner. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
