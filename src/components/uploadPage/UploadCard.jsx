"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { BadgeCheck } from "lucide-react";
import { Label } from "../ui/label";

function UploadCard() {
  const segment = useSelectedLayoutSegment();

  const CardContent = [
    {
      id: "1",
      name: "Journal",
      href: "/home/upload/journal",
      upload: "Upload Journal",
      current: `/${segment}` === "/journal" ? true : false,
    },
    {
      id: "2",
      name: "Conference",
      href: "/home/upload/conference",
      upload: "Upload Conference",
      current: `/${segment}` === "/conference" ? true : false,
    },
  ];

  const offers = [
    {
      id: 1,
      label: "Unlimited Publishing",
    },
    {
      id: 2,
      label: "Unlimited View Access",
    },
    {
      id: 3,
      label: "Unlimited Data Access",
    },
    {
      id: 4,
      label: "Access to data in PDF format",
    },
    {
      id: 5,
      label: "Access to data in Excel format",
    },
    {
      id: 6,
      label: "Core Platform Features",
    },
  ];
  return (
    <div className="flex flex-col md:flex-row md:justify-center items-center md:items-start gap-4 md:p-4 py-10">
      {CardContent.map((card) => (
        <div
          key={card.id}
          className="cardDesign h-[550px] justify-around w-4/5 md:w-1/3 lg:w-1/4 p-5 gap-4 py-10"
        >
          <div className="flex flex-col gap-2 font-semibold">
            <span className="uploadCard w-16 justify-center items-center p-0.5 rounded px-4">
              Basic
            </span>
            <div className="flex items-center">
              <h1 className="text-3xl">
                Free
                <span className="px-2 text-base font-light">for 2 months</span>
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p>Available Features</p>
            <div className="uploadCard flex-col gap-4 p-4 rounded-lg">
              {offers.map((offer) => (
                <div className="flex items-center gap-2" key={offer.id}>
                  <BadgeCheck size={20} />
                  <Label>{offer.label}</Label>
                </div>
              ))}
            </div>
          </div>
          <Link href={card.href}>
            <Button className="w-full flex gap-3 items-center">
              {card.upload}
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default UploadCard;
