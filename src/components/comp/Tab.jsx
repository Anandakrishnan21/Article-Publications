"use client";
import React from "react";
import { motion } from "framer-motion";

function Tab({ selectedTab, setSelectedTab, journal, conference }) {
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="w-full bg-neutral-100 dark:bg-neutral-950 fixed flex pt-2 pl-4">
      <div className="w-3/4 lg:w-1/4 flex items-center justify-center border-[1px] bg-neutral-50 border-neutral-500 dark:bg-neutral-900 rounded-lg p-6 gap-2">
        <motion.div
          className={`${
            selectedTab === journal ? "text-neutral-50" : "text-neutral-800"
          } flex flex-col justify-center text-lg md:text-2xl dark:border-neutral-700
          hover:dark:border-neutral-700 duration-500 px-4 rounded-sm text-neutral-800 dark:text-neutral-100 cursor-pointer p-1`}
          onClick={() => handleTabClick(journal)}
          whileHover={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="font-extrabold">Journals</p>
          <motion.span
            className={`${
              selectedTab === journal
                ? "transition ease-out bg-fuchsia-500 delay-300"
                : ""
            } h-1 rounded-md w-full`}
            initial={{ width: 0 }}
            animate={{
              width: selectedTab === journal ? "100%" : "0%",
            }}
            transition={{ duration: 1 }}
          ></motion.span>
        </motion.div>
        <motion.div
          className={`${
            selectedTab === conference
              ? "text-neutral-50"
              : "text-neutral-800 dark:text-neutral-100"
          } flex flex-col justify-center text-lg md:text-2xl dark:border-neutral-700
          hover:dark:border-neutral-700 duration-500 px-4 text-neutral-800 dark:text-neutral-100 rounded-sm cursor-pointer p-1`}
          onClick={() => handleTabClick(conference)}
          whileHover={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="font-bold">Conferences</p>
          <motion.span
            className={`${
              selectedTab === conference
                ? "transition ease-out bg-fuchsia-500 delay-300"
                : ""
            } h-1 rounded-md w-full`}
            initial={{ width: 0 }}
            animate={{
              width: selectedTab === conference ? "100%" : "0%",
            }}
            transition={{ duration: 1 }}
          ></motion.span>
        </motion.div>
      </div>
    </div>
  );
}

export default Tab;
