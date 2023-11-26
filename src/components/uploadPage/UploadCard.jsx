"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { Button } from "../ui/button";

function UploadCard() {
  const segment = useSelectedLayoutSegment();

  const CardContent = [
    {
      id: "1",
      title: "Upload Journal",
      content:
        "Exploring frontiers, our journal publication navigates insights, shaping tomorrow's knowledge landscape.",
      name: "Journal",
      href: "/home/upload/journal",
      icon: IoAddCircleOutline,
      current: `/${segment}` === "/journal" ? true : false,
    },
    {
      id: "2",
      title: "Upload Conference",
      content:
        "Revolutionizing industries through innovative research, showcased at global conferences, shaping tomorrow's advancements.",
      name: "Conference",
      href: "/home/upload/conference",
      icon: IoAddCircleOutline,
      current: `/${segment}` === "/conference" ? true : false,
    },
  ];
  return (
    <div className="md:h-screen box-content flex flex-col md:flex-row justify-center items-center md:items-start gap-2 md:p-4 py-10">
      {CardContent.map((card) => (
        <div
          key={card.id}
          className="w-3/4 h-64 flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-950 border-[1px]
           border-neutral-200 text-justify dark:border-neutral-800 p-5 gap-4 rounded-lg"
        >
          <h1 className="text-2xl md:text-3xl dark:text-neutral-50 font-semibold">{card.title}</h1>
          <p className="text-sm md:text-base dark:text-neutral-400">{card.content}</p>
          <Link href={card.href}>
            <Button>
              <card.icon className="h-6 w-6 mr-2" />
              Upload
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default UploadCard;
