import Link from "next/link";
import React from "react";
import GoogleButton from "../registerPage/GoogleButton";

function Separator({ url, linkName }) {
  return (
    <>
      <div className="flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-400 after:border-neutral-400 dark:before:border-neutral-600 after:mt-0.5 after:flex-1 after:border-t dark:after:border-neutral-600">
        <p className="mx-4 mb-0 text-center font-semibold text-neutral-500 dark:text-neutral-600">
          or
        </p>
      </div>
      <GoogleButton />
      <p className="text-center lg:text-start text-neutral-800 dark:text-neutral-500 text-sm leading-normal">
        Don&apos;t have an account ? {""}
        <Link href={url} className="blueLink">
          {linkName}
        </Link>
        <Link href="https://admin-particles.vercel.app" className="text-white">Admin</Link>
      </p>
    </>
  );
}

export default Separator;
