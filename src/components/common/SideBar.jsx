"use client";
import React from "react";
import { useSidebarContext } from "@/context/SidebarContext";
import { HiOutlineLogout } from "react-icons/hi";
import {
  IoBarChart,
  IoCloudUpload,
  IoGrid,
  IoHome,
  IoLogOutOutline,
  IoPerson,
} from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Button } from "@/components/ui/button";
import Pung from "@/components/ui/Pung";
import { ModeToggle } from "../mode-toggle";
import { VscColorMode } from "react-icons/vsc";
import { X } from "lucide-react";
import LogoImage from "./LogoImage";

function classNames(...classes) {
  return classes.filter(Boolean).join("");
}
export function SideBar() {
  const { toggleSidebar } = useSidebarContext();
  const { data: session } = useSession();
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();
  const segment = useSelectedLayoutSegment();

  const sidebarOptions = [
    {
      name: "Home",
      href: "/home",
      icon: IoHome,
      current: !segment ? true : false,
    },
    {
      name: "Dashboard",
      href: "/home/dashboard",
      icon: IoGrid,
      current: `/${segment}` === "/dashboard" ? true : false,
    },
    {
      name: "Profile",
      href: "/home/profile",
      icon: IoPerson,
      current: `/${segment}` === "/profile" ? true : false,
    },
    {
      name: "Analytics",
      href: "/home/analytics",
      icon: IoBarChart,
      current: `/${segment}` === "/analytics" ? true : false,
    },
    {
      name: "Upload",
      href: "/home/upload",
      icon: IoCloudUpload,
      current: `/${segment}` === "/upload" ? true : false,
    },
  ];
  const commonClasses =
    "flex flex-col overflow-y-auto scrollbar-hidden bg-neutral-50 dark:bg-neutral-950 dark:border-r-neutral-800 dark:border-[1px] p-4";
  const commonClasses1 =
    "bg-neutral-200 dark:bg-neutral-900 border-[1px] border-neutral-200 dark:border-neutral-700 hover:dark:border-neutral-700 duration-500 dark:text-white font-bold text-sm";
  const commonClasses2 =
    "border-[1px] border-neutral-50 dark:border-neutral-950 hover:bg-neutral-200 hover:dark:bg-neutral-900 dark:text-neutral-400 duration-200 font-normal";

  return (
    <>
      <aside
        className={`${commonClasses} hidden md:flex sticky top-0 justify-between z-10 shadow-md shadow-fuchsia-300 dark:shadow-neutral-800 ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <ul className="flex flex-col gap-3 w-full">
          {sidebarOptions.map((option) => (
            <li key={option.name}>
              <Link
                href={option.href}
                className={classNames(
                  option.current ? `${commonClasses1}` : `${commonClasses2}`,
                  "group flex items-center justify-center gap-x-3 rounded-md p-2 text-sm tracking-wide leading-6"
                )}
              >
                <option.icon
                  className={
                    option.current
                      ? "text-fuchsia-600 h-5 w-5 shrink-0"
                      : "text-neutral-800 dark:text-neutral-600 h-5 w-5 shrink-0"
                  }
                />
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-3">
          <li>
            <p className="flex items-center justify-center dark:border-[1px] dark:hover:border-neutral-700 duration-200 text-sm font-normal gap-7 rounded">
              <ModeToggle />
            </p>
          </li>

          <Link
            href=""
            onClick={() => signOut()}
            className="group flex justify-center gap-x-3 rounded-md p-2 text-sm tracking-wide leading-6 bg-neutral-800 text-white"
          >
            <HiOutlineLogout className="w-5 h-5" />
          </Link>
        </ul>
      </aside>
      <aside
        className={`${commonClasses} flex flex-col justify-between z-20 md:z-10 w-56 transition-width duration-300 shadow-md shadow-fuchsia-300 dark:shadow-neutral-800 lg:sticky absolute top-0 p-2 gap-2 ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${
          isSmallOpen
            ? "flex h-screen bg-neutral-50 dark:bg-neutral-950 max-h-screen pt-0 md:pt-[72px]"
            : "hidden"
        }`}
      >
        <ul className="flex flex-col gap-3 w-full">
          <div className="logoDiv">
            <LogoImage />
            <X className="closeBtn" onClick={toggleSidebar} />
          </div>
          {sidebarOptions.map((option) => (
            <li key={option.name}>
              <Link
                href={option.href}
                className={classNames(
                  option.current ? `${commonClasses1}` : `${commonClasses2}`,
                  "group flex items-center gap-x-3 rounded-md p-2 text-sm tracking-wide leading-6"
                )}
              >
                <option.icon
                  className={
                    option.current
                      ? "text-fuchsia-600 h-5 w-5 shrink-0"
                      : "text-neutral-800 dark:text-neutral-600 h-5 w-5 shrink-0"
                  }
                />
                {option.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-3">
          <li>
            <p className="flex items-center justify-center dark:border-[1px] dark:hover:border-neutral-700 duration-200 text-sm font-normal gap-7 rounded">
              <VscColorMode />
              Theme
              <ModeToggle />
            </p>
          </li>
          <li>
            <p className="flex items-center justify-center text-sm bg-neutral-200 border-neutral-200 dark:bg-neutral-900 duration-200 font-bold capitalize py-2 px-2 gap-2 rounded">
              {session?.user?.name}
              <Pung />
            </p>
          </li>
          <Button onClick={() => signOut()}>
            <IoLogOutOutline className="w-6 h-6 mr-2" />
            Logout
          </Button>
        </ul>
      </aside>
    </>
  );
}
