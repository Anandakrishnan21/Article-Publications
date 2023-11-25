import Link from "next/link";
import React from "react";

function Separator({ url, linkName }) {
  return (
    <>
      <p className="text-slate-600 dark:text-neutral-500 text-sm md:text-base leading-normal text-center">
        Don&apos;t have an account ? {""}
        <Link href={url} className="blueLink">
          {linkName}
        </Link>
      </p>
      <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 dark:before:border-neutral-600 after:mt-0.5 after:flex-1 after:border-t dark:after:border-neutral-600">
        <p className="mx-4 mb-0 text-center font-semibold text-neutral-500 dark:text-neutral-600">
          or
        </p>
      </div>
    </>
  );
}

export default Separator;
