import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
  return (
    <Button variant="outline" onClick={() => signIn("google")} className="flex items-center gap-4 py-4">
      <FcGoogle className="text-2xl" />
     <p className="dark:text-neutral-200">Continue with Google</p>
    </Button>
  );
};

export default GoogleButton;
