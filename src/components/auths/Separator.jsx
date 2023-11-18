import Link from "next/link";
import React from "react";

function Separator({url, linkName}) {
  return (
    <>
      <p className="text-slate-600 text-sm md:text-base leading-normal text-center">
        Don&apos;t have an account ? {""}
        <Link href={url} className="blueLink">
          {linkName}
        </Link>
      </p>
      <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
        <p className="mx-4 mb-0 text-center font-semibold text-neutral-500">
          or
        </p>
      </div>
    </>
  );
}

export default Separator;
