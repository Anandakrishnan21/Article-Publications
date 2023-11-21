import React from "react";
import LogoImage from "./LogoImage";

const AuthPageTitle = ({ title }) => {
  return (
    <div className="w-10/12 md:w-4/12 lg:w-4/12">
      <div className="flex w-full justify-center">
        <LogoImage />
      </div>
      <h1 className="text-xl md:text-2xl font-bold leading-normal md:leading-relaxed">
        Welcome to Particles
      </h1>
      <span className="text-sm md:text-base leading-normal">
        {title} to continue
      </span>
    </div>
  );
};

export default AuthPageTitle;
