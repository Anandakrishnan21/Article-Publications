"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { BadgeCheck } from "lucide-react";

function UploadCard() {
  const segment = useSelectedLayoutSegment();

  const CardContent = [
    {
      id: "1",
      name: "Journal",
      href: "/home/upload/journal",
      upload: "Journal",
      icon: IoAddCircleOutline,
      current: `/${segment}` === "/journal" ? true : false,
    },
    {
      id: "2",
      name: "Conference",
      href: "/home/upload/conference",
      upload: "Conferences",
      icon: IoAddCircleOutline,
      current: `/${segment}` === "/conference" ? true : false,
    },
  ];
  return (
    <div className="flex flex-col md:flex-row md:justify-center items-center md:items-start gap-4 md:p-4 py-10">
      {CardContent.map((card) => (
        <div key={card.id} className="uploadCard" >
          <p className="text-2xl font-semibold">Free</p>
          <p className="text-3xl font-bold">
            ₹0/<span className="text-2xl">mon</span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeCheck color="#3c9f48" strokeWidth={2.25} />
            <label>Unlimited uploading</label>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BadgeCheck color="#3c9f48" strokeWidth={2.25} />
            <label>Unlimited view access</label>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <BadgeCheck color="#3c9f48" strokeWidth={2.25} />
            <label>Core platform features</label>
          </div>
          <Link href={card.href}>
            <Button variant="downBtn" className="w-full flex gap-3 items-center">
              <card.icon className="h-6 w-6" />
              {card.upload}
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default UploadCard;
