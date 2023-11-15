"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { MenuIcon, XIcon, SearchIcon  } from "@heroicons/react/outline";
import {  useSession } from "next-auth/react";

function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleButton = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`w-full font-custom sticky top-0 z-[10] bg-stone-200 p-2 ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      <header className="max-w-7xl flex justify-between items-center p-1 mx-auto">
        <h1 className="text-xl font-bold">Particle</h1>
        <div className="hidden md:block">
          <ul className="flex items-center space-x-10">
            <li className="flex flex-row gap-2 items-center bg-stone-100 border-2 border-gray-200 hover:border-gray-300 duration-500 p-1.5 rounded-lg">
              <SearchIcon className="w-6 h-6 " />
              <input
                type="text"
                placeholder="Search here..."
                className="outline-none w-5/6 bg-stone-100"
              />
            </li>
            <li>
                <p className="text-center font-bold text-lg capitalize">{session?.user?.name}</p>
            </li>
          </ul>
        </div>
        <div className="flex md:hidden">
          <button onClick={toggleButton}>
            {isOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>
      {isOpen && (
        <ul className="flex flex-col space-y-5">
        <li className="flex flex-row gap-2 items-center bg-stone-300 border-2 border-gray-200 hover:border-gray-300 duration-500 p-1.5 rounded">
              <SearchIcon className="w-6 h-6 " />
              <input
                type="text"
                placeholder="Search here..."
                className="outline-none w-5/6 bg-stone-100"
              />
            </li>
            <li>
                <p className="text-center font-bold text-lg capitalize">{session?.user?.name}</p>
            </li>
        </ul>
      )}
    </div>
  );
}

export default Header;
