"use client";
import React, { useEffect, useState } from "react";
import CardProfile from "./CardProfile";
import UserSummary from "./UserSummary";
import ScholarID from "./ScholarID";

function ProfilePageContent() {
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        const res = await fetch("/api/register", {
          cache: "no-store",
        });

        if (!res.ok) {
          setError("Error in fetching data");
          return;
        }

        const data = await res.json();
        // setIsLoading(false);

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

  // if (isLoading) {
  //   return <Loading />;
  // }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {profile.map((data, index) => (
        <div
          key={index}
          className="w-full box-border flex justify-center"
        >
          <div className="w-screen h-full flex flex-col lg:flex-row gap-2 p-4">
            <CardProfile data={data} user={userData} />
            <div className="w-full lg:w-2/3 flex flex-col gap-2">
              <UserSummary />
              <ScholarID data={data} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ProfilePageContent;
