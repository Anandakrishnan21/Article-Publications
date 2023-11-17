"use client";
import React from "react";
import { useSidebarContext } from "@/context/SidebarContext";
import { twMerge } from "tailwind-merge";
import {
  HiOutlineHome,
  HiOutlineLogout,
  HiOutlinePlus,
  HiOutlineViewGrid,
} from "react-icons/hi";
import {
  IoLayersOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { WiMoonAltWaningCrescent1 } from "react-icons/wi";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Button } from "../ui/button";

function classNames(...classes) {
  return classes.filter(Boolean).join("");
}
export function SideBar() {
  const { data: session } = useSession();
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();
  const segment = useSelectedLayoutSegment();

  const sidebarOptions = [
    {
      name: "Home",
      href: "/dashboard/home",
      icon: HiOutlineHome,
      current: `/${segment}` === "/home" ? true : false,
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: HiOutlineViewGrid,
      current: !segment ? true : false,
    },
    {
      name: "Group",
      href: "/dashboard/group",
      icon: IoLayersOutline,
      current: `/${segment}` === "/group" ? true : false,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: HiOutlineHome,
      current: `/${segment}` === "/settings" ? true : false,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: IoPersonOutline,
      current: `/${segment}` === "/profile" ? true : false,
    },
  ];
  const commonClasses = "flex flex-col overflow-y-auto scrollbar-hidden p-4";

  return (
    <>
      <aside
        className={`${commonClasses} bg-white sticky top-0 ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <ul className="flex flex-col gap-3 w-full">
          {sidebarOptions.map((option) => (
            <li key={option.name}>
              <Link
                href={option.href}
                className={classNames(
                  option.current
                    ? "bg-blue-100 text-white"
                    : "",
                  "group hover:bg-blue-50 duration-300 flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                )}
              >
                <option.icon className=" h-6 w-6 shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <aside
        className={`${commonClasses} flex flex-col justify-between w-56 bg-white lg:sticky absolute top-0 p-2 gap-2 ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <ul className="flex flex-col gap-3 w-full">
          {sidebarOptions.map((option) => (
            <li key={option.name}>
              <Link
                href={option.href}
                className={classNames(
                  option.current
                    ? "bg-blue-100 text-white"
                    : "",
                  "group hover:bg-blue-50 duration-300 flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                )}
              >
                <option.icon className=" h-6 w-6 shrink-0" />
                {option.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3 w-full">
          {/* <LargeSidebarItem
            IconOrImgUrl={WiMoonAltWaningCrescent1}
            title="Dark"
            url=""
          /> */}
          <p className="text-left text-sm bg-neutral-100 py-2 px-2 rounded">
            {session?.user?.name}
          </p>
          <Button onClick={() => signOut()}>
            <HiOutlineLogout className="w-6 h-6" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}

// export function SmallSidebarItem({ Icon, title }) {
//   const buttonStyles = { variant: "ghost" };

//   return (
//     <a
//       className={twMerge(
//         buttonStyles,
//         "py-4 px-1 flex flex-col items-center rounded-lg gap-1 cursor-pointer"
//       )}
//     >
//       <Icon className="w-6 h-6" />
//       <div className="text-sm">{title}</div>
//     </a>
//   );
// }

// export function LargeSidebarItem({ IconOrImgUrl, title }) {
//   return (
//     <a
//       className={twMerge(
//         buttonStyles,
//         "w-full flex items-center rounded-lg gap-4 p-1.5 "
//       )}
//     >
//       {typeof IconOrImgUrl === "string" ? (
//         <img src={IconOrImgUrl} className="w-6 h-6 rounded-full" alt={title} />
//       ) : (
//         <IconOrImgUrl className="w-6 h-6" />
//       )}
//       <div className="whitespace-nowrap overflow-hidden text-ellipsis">
//         {title}
//       </div>
//     </a>
//   );
// }
