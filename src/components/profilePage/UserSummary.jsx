"use client";
import React, { useEffect, useState } from "react";
import { PiNote, PiNotepad, PiScroll } from "react-icons/pi";

function UserSummary() {
  const [journal, setJournal] = useState(null);
  const [conference, setConference] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/userJournal", {
          cache: "no-store",
        });

        if (!res.ok) {
          setError("Failed to fetch data");
          return;
        }

        const data = await res.json();
        setJournal(data);
      } catch (error) {
        setError("Error fetching data: " + error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/userConference", {
          cache: "no-store",
        });

        if (!res.ok) {
          setError("Failed to fetch data");
          return;
        }

        const data = await res.json();
        setConference(data);
      } catch (error) {
        setError("Error fetching data: " + error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  const data = [
    {
      id: 1,
      icon: PiScroll,
      bg: "bg-purple-200",
      dark: "bg-purple-300",
      iconColor: "bg-purple-400",
      length: journal?.length + conference?.length,
      text: "Total Papers",
    },
    {
      id: 2,
      icon: PiNote,
      bg: "bg-green-200",
      dark: "bg-green-300",
      iconColor: "bg-green-400",
      length: journal?.length,
      text: "Total Journals",
    },
    {
      id: 3,
      icon: PiNotepad,
      bg: "bg-red-200",
      dark: "bg-red-300",
      iconColor: "bg-red-400",
      length: conference?.length,
      text: "Total Conferences",
    },
  ];
  return (
    <div className="cardDesign lg:h-2/5 p-2 md:p-4 py-6 gap-4">
      <div className="px-6">
        <h1 className="text-xl font-semibold">Your History</h1>
        <p className="text-sm font-light dark:text-neutral-400">
          Journals and conference you published in particles
        </p>
      </div>
      <div className="summaryDiv">
        {data.map((item) => (
          <div
            className={`w-[48%] lg:w-1/4 ${item.bg} dark:${item.dark} rounded-xl p-4`}
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

export default UserSummary;
