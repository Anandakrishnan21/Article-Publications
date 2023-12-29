import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { IoLogoGoogle } from "react-icons/io5";

const GoogleButton = () => {
  return (
    <Button variant="iconBtn" onClick={() => signIn("google")}>
      <IoLogoGoogle className="text-2xl" />
      Continue with Google
    </Button>
  );
};

export default GoogleButton;
