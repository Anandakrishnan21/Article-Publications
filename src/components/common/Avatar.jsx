"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

function Avatar() {
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();

  const handleHover = () => {
    setShowModal(true);
  };

  const handleLeave = () => {
    setShowModal(false);
  };
  return (
    <div className="pl-2 lg:hidden">
      <p
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        className="h-10 w-10 flex items-center justify-center bg-neutral-200
           dark:bg-neutral-900 border-[1px] dark:border-neutral-700 hover:dark:border-neutral-700
            duration-500 rounded-full"
      >
        {session?.user?.name.charAt(0)}
      </p>
      {showModal && (
        <div className="fixed top-12 right-12 flex items-center justify-center z-10">
          <div
            className="bg-neutral-50 dark:bg-neutral-900 border-[1px] dark:border-neutral-700 hover:dark:border-neutral-700
                duration-500 rounded shadow-lg px-4 p-1.5"
          >
            <p>{session?.user?.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Avatar;
