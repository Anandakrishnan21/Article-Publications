"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { SearchIcon  } from "@heroicons/react/outline";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

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
        <div className="block">
          <ul className="flex items-center space-x-10">
            <li className="w-full flex flex-row gap-2 items-center bg-slate-100 border-2 border-slate-200 hover:border-slate-300 duration-500 p-1.5 rounded-lg">
              <SearchIcon className="w-6 h-6 " />
              <input
                type="text"
                placeholder="Search here..."
                className="outline-none w-full bg-slate-100"
              />
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Header;
