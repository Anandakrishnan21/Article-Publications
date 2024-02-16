"use client";
import Loading from "@/app/home/loading";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ProfileUpdate } from "./ProfileUpdate";
import { Input } from "../ui/input";

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
          <div className="w-full md:w-4/5 rounded bg-neutral-50 dark:bg-neutral-900 p-4">
            <div className="h-32 bg-gradient-to-r from-green-200 via-violet-300 to-fuchsia-300 dark:from-green-900 dark:via-violet-900 dark:to-fuchsia-900 rounded"></div>
            <div className="translate-y-[-54px] md:translate-y-[-64px] md:translate-x-8 flex flex-col md:flex-row items-center md:items-end justify-center md:justify-start gap-2">
              <Image
                src={data.imgUrl}
                alt=""
                className="w-24 md:w-32 h-24 md:h-32 bg-black dark:bg-neutral-200 rounded-full"
              />
              <div className="text-center md:text-left">
                <p className="text-sm md:text-2xl font-extrabold">
                  {data.name}
                </p>
                <span>{data.dept}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 px-3 md:px-7 pb-3">
              <div className="flex flex-col md:flex-row gap-4 items-center text-center md:text-left md:justify-between">
                <div>
                  <h2 className="text-xl font-bold">Personal Information</h2>
                  <span className="text-sm text-neutral-400">
                    Information you provided are listed here
                  </span>
                </div>
                <ProfileUpdate user={userData} id={data._id} />
              </div>

              <div className="w-full text-xs md:text-sm flex flex-col gap-2 font-normal mt-5">
                <div className="ProfileReadonlyInputDiv">
                  <p className="w-[130px]">Email</p>
                  <Input
                    className="inputFields cursor-pointer"
                    value={data.email}
                    readOnly
                  />
                </div>

                <div className="ProfileReadonlyInputDiv">
                  <p className="w-[130px]">Department</p>
                  <Input
                    className="inputFields cursor-pointer"
                    value={data.dept}
                    readOnly
                  />
                </div>

                <div className="ProfileReadonlyInputDiv">
                  <p className="w-[130px]">Scholar ID</p>
                  <Input
                    className="inputFields cursor-pointer"
                    value={data.scholar}
                    readOnly
                  />
                </div>

                <div className="ProfileReadonlyInputDiv">
                  <p className="w-[130px]">Scopus</p>
                  <Input
                    className="inputFields cursor-pointer"
                    value={data.scopus}
                    readOnly
                  />
                </div>

                <div className="ProfileReadonlyInputDiv">
                  <p className="w-[130px]">Orcid</p>
                  <Input
                    className="inputFields cursor-pointer"
                    value={data.orcid}
                    readOnly
                  />
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
