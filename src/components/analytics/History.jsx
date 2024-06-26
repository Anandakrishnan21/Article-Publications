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
      bg: "bg-green-200",
      dark: "dark:bg-green-900",
      iconColor: "bg-green-400",
      length: chartData?.length + conferenceChart?.length,
      text: "Total Papers",
    },
    {
      id: 2,
      icon: PiUsers,
      bg: "bg-yellow-200",
      dark: "dark:bg-yellow-700",
      iconColor: "bg-yellow-400",
      length: email,
      text: "Total Publishers",
    },
    {
      id: 3,
      icon: PiNote,
      bg: "bg-violet-200",
      dark: "dark:bg-violet-900",
      iconColor: "bg-violet-400",
      length: chartData?.length,
      text: "Total Journals",
    },
    {
      id: 4,
      icon: PiNotepad,
      bg: "bg-fuchsia-300",
      dark: "dark:bg-fuchsia-900",
      iconColor: "bg-fuchsia-400",
      length: conferenceChart?.length,
      text: "Total Conferences",
    },
  ];

  return (
    <div className="History">
      <div>
        <h1 className="text-xl font-semibold">Particles History</h1>
        <p className="text-sm dark:text-neutral-400">
          Papers and Users Summary
        </p>
      </div>
      <div className="analySummary">
        {data.map((item) => (
          <div
            key={item.id}
            className={`${item.bg} ${item.dark} dark:text-neutral-50 rounded-xl p-4`}
          >
            <div className="w-full flex justify-end">
              <item.icon
                size={24}
                className={`p-1 ${item.iconColor} text-black rounded-full`}
              />
            </div>
            <div className="text-base font-semibold py-2">
              <p className="font-bold text-2xl">{item.length}</p>
              <p className="md:text-lg">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
