"use client"
import React, { useState } from "react";
import Link from "next/link";
import DisplayAllPapers from "@/components/homePage/DisplayAllPapers";
import DisplayAllConference from "@/components/homePage/DisplayAllConference";

function HomePage() {
  const [selectedTab, setSelectedTab] = useState("journal");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <div className="flex justify-start p-6 gap-2">
        <Link href="">
          <p
            className={`${
              selectedTab === "journal" ? "bg-neutral-300 dark:bg-neutral-800" : "bg-neutral-200 dark:bg-neutral-900"
            } text-sm md:text-2xl bg-neutral-200 border-[1px] dark:border-neutral-700
        hover:dark:border-neutral-700 duration-500 dark:text-white font-semibold p-2 px-4 rounded-full`}
            onClick={() => handleTabClick("journal")}
          >
            Journals
          </p>
        </Link>
        <Link href="">
          <p
            className={`${
              selectedTab === "conference" ? "bg-neutral-300 dark:bg-neutral-800" : "bg-neutral-200 dark:bg-neutral-900"
            } p-2 text-sm md:text-2xl bg-neutral-200 border-[1px] dark:border-neutral-700
        hover:dark:border-neutral-700 duration-500 dark:text-white font-semibold px-4 rounded-full`}
            onClick={() => handleTabClick("conference")}
          >
            Conferences
          </p>
        </Link>
      </div>
      {selectedTab === "journal" ? <DisplayAllPapers /> : <DisplayAllConference />}
    </div>
  );
}

export default HomePage;
