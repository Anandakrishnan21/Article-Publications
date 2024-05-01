"use client";
import Image from "next/image";
import React from "react";

const LogoImage = () => {
  return (
    <>
      <Image
        src="/img/logo.webp"
        width="100"
        height="100"
        alt="logo"
        className="flex md:hidden h-10 w-10"
      />
    </>
  );
};

export default LogoImage;
