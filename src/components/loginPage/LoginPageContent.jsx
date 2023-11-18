import React from "react";
import LoginForm from "./LoginForm";
import Image from "next/image";
import Logo from "../../../public/publication-logo.png";

function LoginPageContent() {
  return (
    <div className="font-custom flex flex-col justify-center items-center gap-6 text-center mt-10 mb-10">
      <div className="w-10/12 md:w-4/12 lg:w-4/12">
        <div className="flex w-full justify-center">
          <Image src={Logo} height={100} width={100} alt="" />
        </div>
        <h1 className="text-xl md:text-2xl font-bold leading-normal md:leading-relaxed">
          Welcome to Particles
        </h1>
        <span className="text-sm md:text-base leading-normal">
          Sign in to continue
        </span>
      </div>
      <LoginForm />
    </div>
  );
}

export default LoginPageContent;
