import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const GoogleButton = () => {
  return (
    <Button variant="iconBtn" onClick={() => signIn("google")}>
      <FcGoogle className="text-2xl" />
      Continue with Google
    </Button>
  );
};

export default GoogleButton;
