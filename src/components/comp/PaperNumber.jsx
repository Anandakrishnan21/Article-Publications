import React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

function PaperNumber({
  journal,
  conferences,
  journalLength,
  conferenceLength,
}) {
  const segment = useSelectedLayoutSegment();
  return (
    <div className="w-11/12 flex ml-12 gap-2">
      <Link href="">
        <p
          className="text-sm md:text-2xl bg-neutral-200 dark:bg-neutral-900 border-[1px] dark:border-neutral-700
        hover:dark:border-neutral-700 duration-500 dark:text-white font-semibold p-2 px-4 rounded-full"
        >
          {journal}{" "}
          <span className="h-4 w-4 bg-neutral-50 text-neutral-900 p-2 rounded-full">
            {journalLength}
          </span>
        </p>
      </Link>
      <Link href="">
        <p
          className="text-sm md:text-2xl bg-neutral-200 dark:bg-neutral-900 border-[1px] dark:border-neutral-700
        hover:dark:border-neutral-700 duration-500 dark:text-white font-semibold p-2 px-4 rounded-full"
        >
          {conferences}{" "}
          <span className="h-4 w-4 bg-neutral-50 text-neutral-900 p-2 rounded-full">
            {conferenceLength}
          </span>
        </p>
      </Link>
    </div>
  );
}

export default PaperNumber;
