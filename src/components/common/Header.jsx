"use client";
import React from "react";
import { SearchIcon } from "@heroicons/react/outline";
import Logo from "../../../public/publication-logo.png";
import LogoDarkMode from "../../../public/publication-logo-white.png";

import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";

function Header() {
  const { theme } = useTheme();
  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 border-[1px] border-b-neutral-200 dark:border-b-neutral-800 w-full font-custom sticky top-0 z-[10] p-1.5">
      <header className="mx-4 flex justify-between items-center p-1 ">
        <Link href="/home" className="flex items-center gap-2">
          {theme == "light" ? (
            <Image src={Logo} alt="" className="h-10 w-10" />
          ) : (
            <Image src={LogoDarkMode} alt="" className="h-10 w-10" />
          )}
          <h1 className="text-2xl font-bold">
            P<span className="text-lg font-medium">articles</span>
          </h1>
        </Link>
        <div className="block">
          <ul className="flex items-center space-x-10">
            <li className="w-full flex flex-row gap-2 items-center dark:bg-neutral-800 border-2 dark:border-neutral-700 duration-500 p-1.5 rounded-lg">
              <SearchIcon className="w-6 h-6 " />
              <input
                type="text"
                placeholder="Search papers"
                className="outline-none w-full dark:bg-neutral-800"
              />
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Header;
