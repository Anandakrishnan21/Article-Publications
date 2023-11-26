"use client";
import React from "react";
import { IoPencilOutline } from "react-icons/io5";

function EditBtn() {
  return (
    <button className="bg-green-500 p-1.5 text-white rounded">
      <IoPencilOutline />
    </button>
  );
}

export default EditBtn;
