import React from "react";
import LoginForm from "./LoginForm";
import Link from "next/link";

function LoginPageContent() {
  return (
    <div className="font-custom box-border h-screen flex flex-col justify-center items-center gap-6 ">
      <div className="w-10/12 md:w-4/12 lg:w-3/12">
        <h1 className="text-2xl font-bold leading-normal md:leading-relaxed">
          Welcome to Article Analytics
        </h1>
        <span className="text-sm md:text-base leading-normal">
          Sign in to continue
        </span>
      </div>
      <LoginForm />
      <p className="text-slate-600 text-sm md:text-base leading-normal">
        Don't have an account ? {''}
        <Link href="/register" className="text-blue-600 hover:text-blue-800 duration-500text-sm md:text-base leading-normal">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default LoginPageContent;