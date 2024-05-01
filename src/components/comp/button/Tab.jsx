"use client";
import React from "react";
import { motion } from "framer-motion";

function Tab({ selectedTab, setSelectedTab, journal, conference }) {
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="w-full bg-neutral-100 dark:bg-neutral-950 flex justify-center lg:justify-start pt-5 px-4">
      <div className="w-full md:w-2/4 lg:w-1/4 flex items-center justify-center border bg-neutral-50 border-neutral-400 dark:border-neutral-600 dark:bg-neutral-900 rounded-md py-1 gap-2">
        <motion.div
          className={`${
            selectedTab === journal ? "text-neutral-50" : "text-neutral-800"
          } flex flex-col justify-center text-lg md:text-xl dark:border-neutral-700
          hover:dark:border-neutral-700 duration-500 px-4 rounded-sm text-neutral-800 dark:text-neutral-100 cursor-pointer p-1`}
          onClick={() => handleTabClick(journal)}
          whileHover={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          <p
            className={`${
              selectedTab === journal
                ? "font-semibold"
                : "font-medium text-neutral-500"
            }`}
          >
            Journals
          </p>
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
          } flex flex-col justify-center text-lg md:text-xl dark:border-neutral-700
          hover:dark:border-neutral-700 duration-500 px-4 rounded-sm text-neutral-800 dark:text-neutral-100 cursor-pointer p-1`}
          onClick={() => handleTabClick(conference)}
          whileHover={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          <p
            className={`${
              selectedTab === conference
                ? "font-semibold"
                : "font-medium text-neutral-500"
            }`}
          >
            Conferences
          </p>
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
