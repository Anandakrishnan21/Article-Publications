"use client";
import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function ConferenceDeleteBtn({ id, setPapers }) {
  const router = useRouter();
  const deleteConferencePaper = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/addConference?id=${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setPapers((prevPapers) => prevPapers.filter((paper) => paper._id !== id));
      }
    } catch (error) {
      console.error("Error deleting paper", error);
    }
  };
  return (
    <Button variant="DeleteBtn"
      onClick={deleteConferencePaper} className="w-full flex gap-2 font-semibold"
    >
     Delete <IoTrashOutline className="w-4 h-6" />
    </Button>
  );
}

export default ConferenceDeleteBtn;
