"use client";
import React from "react";
import { IoPencilOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";

function EditBtn() {
  return (
    <Button variant="editBtn" className="w-full flex items-center gap-2 font-semibold">
     Update <IoPencilOutline className="h-6 w-4" />
    </Button>
  );
}

export default EditBtn;
