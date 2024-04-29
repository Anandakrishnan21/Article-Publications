"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function UploadBtn({ href, handleSubscription, upload }) {
  const [profileData, setProfileData] = useState([]);
  const [daysSinceCreation, setDaysSinceCreation] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/register", {
          cache: "no-store",
        });
        if (!res.ok) {
          setError("error");
        }
        const data = await res.json();
        setProfileData(data);
      } catch (e) {
        setError("error in fetching data");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const createdDate = new Date(profileData.createdAt);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - createdDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    setDaysSinceCreation(differenceInDays);
  }, [profileData.createdAt]);

  return (
    <>
      {daysSinceCreation > 365 ? (
        <Button
          className="bg-green-600 hover:bg-green-500 dark:bg-green-800 dark:hover:bg-green-700 dark:text-white duration-500"
          onClick={handleSubscription}
        >
          Subscribe
        </Button>
      ) : (
        <Link href={href}>
          <Button className="w-full flex gap-3 items-center">{upload}</Button>
        </Link>
      )}
    </>
  );
}

export default UploadBtn;
