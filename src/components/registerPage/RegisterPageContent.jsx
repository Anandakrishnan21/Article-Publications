import React from "react";
import Link from "next/link";
import RegisterForm from "./RegisterForm";

function RegistrationPageContent() {
  return (
    <div className="font-custom h-screen flex flex-col justify-center items-center gap-6 my-10">
      <div className="w-10/12 md:w-4/12 lg:w-3/12">
        <h1 className="text-2xl font-bold leading-normal md:leading-relaxed">
          Welcome to Article Analytics
        </h1>
        <span className="text-sm md:text-base leading-normal">
          Sign Up to continue
        </span>
      </div>
      <RegisterForm />
      <p className="text-slate-600 text-sm md:text-base leading-normal">
        Already have an account ? {""}
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 duration-500text-sm md:text-base leading-normal"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default RegistrationPageContent;