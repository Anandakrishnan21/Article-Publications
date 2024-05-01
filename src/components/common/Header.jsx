"use client";
import React from "react";
// import Logo from "../../../public/publication-logo.png";
// import LogoDarkMode from "../../../public/publication-logo-white.png";
import Link from "next/link";
import { useSidebarContext } from "@/context/SidebarContext";
import { IoMenu } from "react-icons/io5";
import AvatarComp from "./AvatarComp";
import LogoImage from "./LogoImage";

function Header({ hidden = false }) {
  const { toggleSidebar } = useSidebarContext();

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 border-[1px] z-20 border-b-neutral-200 dark:border-b-neutral-800 w-full font-custom sticky top-0 p-1.5">
      <header className="header">
        <div
          className={`gap-4 items-center flex-shrink-0 ${
            hidden ? "hidden" : "flex"
          }`}
        >
          <IoMenu className="h-6 w-6" onClick={toggleSidebar} />
          <Link href="/home" className="hidden md:flex items-center gap-2">
            {/* {theme == "dark" ? (
              <Image src={LogoDarkMode} alt="" className="h-10 w-10" />
            ) : (
              <Image src={Logo} alt="" className="h-10 w-10" />
            )} */}
            <h1 className="textLogo">
              P<span className="md:text-lg font-medium">articles</span>
            </h1>
          </Link>
          <LogoImage />
        </div>
        <AvatarComp />
      </header>
    </div>
  );
}

export default Header;
