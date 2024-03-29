"use client";
import React from "react";
import { SearchIcon } from "@heroicons/react/outline";
// import Logo from "../../../public/publication-logo.png";
// import LogoDarkMode from "../../../public/publication-logo-white.png";
// import Image from "next/image";
import Link from "next/link";
import { useSidebarContext } from "@/context/SidebarContext";
import { IoMenu } from "react-icons/io5";
import AvatarComp from "./AvatarComp";

function Header({ hidden = false, session }) {
  const { toggleSidebar } = useSidebarContext();

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 border-[1px] z-20 border-b-neutral-200 dark:border-b-neutral-800 w-full font-custom sticky top-0 p-1.5">
      <header className="mx-4 flex justify-between items-center p-1">
        <div
          className={`gap-4 items-center flex-shrink-0 ${
            hidden ? "hidden" : "flex"
          }`}
        >
          <IoMenu className="h-6 w-6" onClick={toggleSidebar} />
          <Link href="/home" className="flex items-center gap-2">
            {/* {theme == "dark" ? (
              <Image src={LogoDarkMode} alt="" className="h-10 w-10" />
            ) : (
              <Image src={Logo} alt="" className="h-10 w-10" />
            )} */}
            <h1 className="flex items-center text-xl md:text-2xl font-extrabold bg-gradient-to-r from-green-200 via-violet-300 to-fuchsia-300 dark:from-green-900 dark:via-violet-900 dark:to-fuchsia-900 rounded p-1 px-6">
              P<span className="md:text-lg font-medium">articles</span>
            </h1>
          </Link>
        </div>
        {/* <div className="block">
          <ul className="flex items-center space-x-10">
            <li>{session.user.name}</li>
          </ul>
        </div> */}
        <AvatarComp />
      </header>
    </div>
  );
}

export default Header;
