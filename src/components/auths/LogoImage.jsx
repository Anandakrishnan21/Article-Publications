"use client";
import Image from "next/image";
import React from "react";
import Logo from "../../../public/publication-logo.png";
import LogoDarkMode from "../../../public/publication-logo-white.png";
import { useTheme } from "next-themes";

const LogoImage = () => {
  const { theme } = useTheme();
  return (
    <>
      <Image
        src={theme == "dark" ? LogoDarkMode : Logo}
        height={100}
        width={100}
        alt="dark logo"
        priority
      />
      
    </>
  );
};

export default LogoImage;
