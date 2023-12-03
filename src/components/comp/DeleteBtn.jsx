"use client";
import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

function DeleteBtn({ id, setPapers }) {
  const router = useRouter();
  const deletePaper = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/addPublication?id=${id}`,
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
    <Button
      onClick={deletePaper} className="flex gap-2"
    >
     Delete <IoTrashOutline className="w-4 h-6" />
    </Button>
  );
}

export default DeleteBtn;
