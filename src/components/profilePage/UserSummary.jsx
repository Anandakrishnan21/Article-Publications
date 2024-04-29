"use client";
import React, { useEffect, useState } from "react";
import { PiNote, PiNotepad, PiScroll } from "react-icons/pi";

function UserSummary() {
  const [journal, setJournal] = useState("");
  const [conference, setConference] = useState("");
  const [error, setError] = useState("");

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
      bg: "bg-green-200",
      dark: "dark:bg-green-900",
      iconColor: "bg-green-400",
      length: journal?.length + conference?.length,
      text: "Total Papers",
    },
    {
      id: 2,
      icon: PiNote,
      bg: "bg-violet-200",
      dark: "dark:bg-violet-900",
      iconColor: "bg-violet-400",
      length: journal?.length,
      text: "Total Journals",
    },
    {
      id: 3,
      icon: PiNotepad,
      bg: "bg-fuchsia-300",
      dark: "dark:bg-fuchsia-900",
      iconColor: "bg-fuchsia-400",
      length: conference?.length,
      text: "Total Conferences",
    },
  ];
  return (
    <div className="cardDesign lg:h-2/5 p-2 md:p-4 py-6 gap-4">
      <div className="px-4 lg:px-6">
        <h1 className="text-xl font-semibold">Your History</h1>
        <p className="text-sm dark:text-neutral-400">
          Journals and conference you published in particles
        </p>
      </div>
      <div className="summaryDiv px-4 lg:px-6">
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
            <div className="text-base font-semibold pt-2">
              <p className="font-bold text-2xl">{item.length}</p>
              <p className="md:text-lg">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserSummary;
