import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
  return (
    <Button variant="outline" className="flex items-center gap-4 py-4">
      <FcGoogle className="text-2xl" />
     <p className="dark:text-neutral-200">Continue with Google</p>
    </Button>
  );
};

export default GoogleButton;
