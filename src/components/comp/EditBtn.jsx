"use client";
import React from "react";
import { IoPencilOutline } from "react-icons/io5";

function EditBtn() {
  return (
    <button className="flex items-center justify-center gap-2 w-full bg-green-400 rounded p-2">
     Update <IoPencilOutline className="h-6 w-4" />
    </button>
  );
}

export default EditBtn;
