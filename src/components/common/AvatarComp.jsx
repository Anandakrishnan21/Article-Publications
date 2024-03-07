"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSession } from "next-auth/react";

const AvatarComp = () => {
  const { data: session } = useSession();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Avatar
            onClick={() => {
              location.assign("/home/profile");
            }}
            className="border-4 dark:border-2 border-fuchsia-700"
          >
            {session && <AvatarImage src={session?.user?.imgUrl || session?.user?.image} />}
            {session && (
              <AvatarFallback>{session?.user?.name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          <p>{session?.user?.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AvatarComp;
