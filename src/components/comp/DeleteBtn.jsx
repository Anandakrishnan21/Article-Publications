"use client";
import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

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
    <button
      onClick={deletePaper}
      className="bg-red-500 p-1.5 text-white rounded"
    >
      <IoTrashOutline />
    </button>
  );
}

export default DeleteBtn;
