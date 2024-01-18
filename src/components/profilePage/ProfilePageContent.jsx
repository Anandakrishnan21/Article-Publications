"use client";
import Loading from "@/app/home/loading";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { ProfileUpdate } from "./ProfileUpdate";

function ProfilePageContent() {
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:3000/api/register", {
          cache: "no-store",
        });

        if (!res.ok) {
          setError("Error in fetching data");
          return;
        }

        const data = await res.json();

        setIsLoading(false);
        if (Array.isArray(data)) {
          setProfile(data);
        } else {
          setProfile([data]);
        }

        setUserData(data);
      } catch (err) {
        setError("Error fetching data " + err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {profile.map((data, index) => (
        <div key={index} className="box-border flex justify-center gap-2 p-6">
          <div className="w-full border-[1px] shadow-lg shadow-fuchsia-200 rounded-lg bg-neutral-50 p-4">
            <div className="h-32 bg-gradient-to-r from-green-200 via-violet-300 to-fuchsia-300 rounded-lg"></div>
            <div className="translate-y-[-54px] md:translate-y-[-64px] md:translate-x-8 flex flex-col md:flex-row items-center md:items-end justify-center md:justify-start gap-2">
              <Image
                src={data.imgUrl}
                alt=""
                className="w-24 md:w-32 h-24 md:h-32 bg-black rounded-full"
              />
              <div className="text-center md:text-left">
                <p className="text-sm md:text-2xl font-extrabold">
                  {data.name}
                </p>
                <span>{data.dept}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-base font-bold">
                      Personal Information
                    </h2>
                    <span className="text-xs">
                      Information you provided are listed here
                    </span>
                  </div>
                  <ProfileUpdate user={userData} id={data._id} />
                </div>
                <div className="flex gap-16">
                  <div className="hidden text-sm md:flex flex-col gap-2 font-semibold">
                    <p className="h-8">Email</p>
                    <p className="h-8">Department</p>
                    <p className="h-8">Scholar ID</p>
                    <p className="h-8">Scopus</p>
                    <p className="h-8">Orcid</p>
                  </div>
                  <div className="w-full text-xs md:text-sm flex flex-col gap-2 font-normal">
                    <p className="h-8 flex items-center border-[1px] border-fuchsia-600 rounded p-1">
                      {data.email}
                    </p>
                    <p className="h-8 flex items-center border-[1px] border-fuchsia-600 rounded p-1">
                      {data.dept}
                    </p>
                    <p className="h-8 flex items-center border-[1px] border-fuchsia-600 rounded p-1">
                      {data.scholar}
                    </p>
                    <p className="h-8 flex items-center border-[1px] border-fuchsia-600 rounded p-1">
                      {data.scopus}
                    </p>
                    <p className="h-8 flex items-center border-[1px] border-fuchsia-600 rounded p-1">
                      {data.orcid}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ProfilePageContent;
