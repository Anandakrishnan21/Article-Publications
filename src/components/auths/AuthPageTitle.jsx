import React from "react";
// import LogoImage from "./LogoImage";

const AuthPageTitle = () => {
  return (
    <div className="w-3/4">
      {/* <div className="flex w-full justify-center">
        <LogoImage />
      </div> */}
      <h1 className="text-center lg:text-start text-xl md:text-2xl font-bold leading-normal md:leading-relaxed">
        Welcome to Particles
      </h1>
      <p className="text-center lg:text-start text-sm md:text-base leading-normal">
        Enter your information to continue
      </p>
    </div>
  );
};

export default AuthPageTitle;
