import React from "react";
import RegisterForm from "./RegisterForm";
import Image from "next/image";
import Logo from "../../../public/publication-logo.png";

function RegistrationPageContent() {
  return (
    <div className="font-custom box-border h-screen flex flex-col justify-center items-center gap-6">
      <div className="w-10/12 md:w-4/12 lg:w-3/12">
        <div className="flex w-full justify-center">
          <Image src={Logo} height={150} width={150} alt="" />
        </div>
        <h1 className="text-2xl font-bold leading-normal md:leading-relaxed">
          Welcome to Article Analytics
        </h1>
        <span className="text-sm md:text-base leading-normal">
          Sign Up to continue
        </span>
      </div>
      <RegisterForm />
    </div>
  );
}

export default RegistrationPageContent;
