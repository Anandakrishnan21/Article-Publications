import Link from "next/link";
import React from "react";

function Tab({ selectedTab, setSelectedTab, journal, conference }) {
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  
  return (
    <div className="fixed flex justify-start p-6 pl-8 gap-2">
      <Link
        href=""
        className={`${
          selectedTab === journal
            ? "bg-neutral-800 dark:bg-neutral-800 text-neutral-50"
            : "bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100"
        } text-2xl border-[1px] border-neutral-900 dark:border-neutral-700
          hover:dark:border-neutral-700 duration-500 font-semibold px-4 rounded-sm p-1`}
        onClick={() => handleTabClick(journal)}
      >
        Journals
      </Link>
      <Link
        href=""
        className={`${
          selectedTab === conference
            ? "bg-neutral-800 dark:bg-neutral-800 text-neutral-50"
            : "bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100"
        } text-2xl border-[1px] border-neutral-900 dark:border-neutral-700
          hover:dark:border-neutral-700 duration-500 font-semibold px-4 rounded-sm p-1`}
        onClick={() => handleTabClick(conference)}
      >
        Conferences
      </Link>
    </div>
  );
}

export default Tab;
