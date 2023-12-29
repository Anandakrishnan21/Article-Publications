"use client";
import React from "react";
import { SearchIcon } from "@heroicons/react/outline";
// import Logo from "../../../public/publication-logo.png";
// import LogoDarkMode from "../../../public/publication-logo-white.png";
// import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";
import Avatar from "./Avatar";
import { useSidebarContext } from "@/context/SidebarContext";
import { IoMenu } from "react-icons/io5";

function Header({hidden= false}) {
  const { theme } = useTheme();
  const { toggleSidebar} = useSidebarContext();

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 border-[1px] border-b-neutral-200 dark:border-b-neutral-800 w-full font-custom sticky top-0 z-[10] p-1.5">
      <header className="mx-4 flex justify-between items-center p-1">
        <div className={`gap-4 items-center flex-shrink-0 ${
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
            <h1 className="hidden lg:flex items-center text-2xl font-bold bg-gradient-to-r from-green-200 via-violet-300 to-fuchsia-300 border-[1px] border-neutral-800 rounded p-1 px-4">
              P<span className="text-base font-medium">articles</span>
            </h1>
          </Link>
        </div>
        <div className="block">
          <ul className="flex items-center space-x-10">
            <li className="w-full flex flex-row gap-2 items-center dark:bg-neutral-900 border-2 dark:border-neutral-700 duration-500 p-1.5 rounded-lg">
              <SearchIcon className="w-6 h-6" />
              <input
                type="text"
                placeholder="Search papers"
                className="outline-none w-full dark:bg-neutral-900"
              />
            </li>
          </ul>
        </div>
        <Avatar />
      </header>
    </div>
  );
}

export default Header;
