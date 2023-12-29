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
    <div className="md:h-screen box-border flex flex-col md:flex-row justify-center items-center md:items-start gap-2 md:p-4 py-10">
      {CardContent.map((card) => (
        <div
          key={card.id}
          className="w-4/5 md:w-1/4 flex flex-col bg-neutral-50 dark:bg-neutral-950 border-[1px]
           border-neutral-800 text-justify dark:border-neutral-800 p-5 gap-4 rounded-lg"
        >
          <p className="text-2xl font-semibold">Free</p>
          <p className="text-4xl font-bold">
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
            <Button className="w-full">
              <card.icon className="h-6 w-6 mr-2" />
              {card.upload}
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default UploadCard;
