"use client";
import React, { useEffect, useState } from "react";
import { PiNote, PiNotepad, PiScroll, PiUsers } from "react-icons/pi";

function History({ chartData, conferenceChart }) {
  const [email, setEmail] = useState(0);

  useEffect(() => {
    if (chartData && conferenceChart) {
      const combinedData = [...chartData, ...conferenceChart];
      const uniqueEmails = new Set();
      combinedData.forEach((item) => uniqueEmails.add(item.email));
      setEmail(uniqueEmails.size);
    }
  }, [chartData, conferenceChart]);

  const data = [
    {
      id: 1,
      icon: PiScroll,
      bg: "bg-purple-200",
      dark: "bg-purple-300",
      iconColor: "bg-purple-400",
      length: chartData?.length + conferenceChart?.length,
      text: "Total Papers",
    },
    {
      id: 2,
      icon: PiUsers,
      bg: "bg-yellow-200",
      dark: "bg-yellow-300",
      iconColor: "bg-yellow-400",
      length: email,
      text: "Total Publishers",
    },
    {
      id: 3,
      icon: PiNote,
      bg: "bg-green-200",
      dark: "bg-green-300",
      iconColor: "bg-green-400",
      length: chartData?.length,
      text: "Total Journals",
    },
    {
      id: 4,
      icon: PiNotepad,
      bg: "bg-red-200",
      dark: "bg-red-300",
      iconColor: "bg-red-400",
      length: conferenceChart?.length,
      text: "Total Conferences",
    },
  ];

  return (
    <div className="History">
      <div className="px-5">
        <h1 className="text-xl font-semibold">Particles History</h1>
        <p className="text-sm font-light dark:text-neutral-400">
          Papers and Users Summary
        </p>
      </div>
      <div className="summaryDiv">
        {data.map((item) => (
          <div
            className={`w-[45%] md:w-1/5 ${item.bg} dark:${item.dark} rounded-xl p-4`}
          >
            <div className="w-full flex justify-end">
              <item.icon
                size={24}
                className={`p-1 ${item.iconColor} rounded-full`}
              />
            </div>
            <div className="text-sm font-semibold py-2">
              <p>{item.length}</p>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
