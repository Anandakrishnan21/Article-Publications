"use client";
import React, { Suspense, useState } from "react";
import DisplayAllPapers from "@/components/homePage/DisplayAllPapers";
import DisplayAllConference from "@/components/homePage/DisplayAllConference";
import Tab from "@/components/comp/Tab";
import { useSession } from "next-auth/react";
import Loading from "./loading";

function HomePage() {
  const [selectedTab, setSelectedTab] = useState("journal");
  const { data: session } = useSession();

  return (
    <div className="w-screen md:w-full">
      <>
        <Suspense fallback={<Loading />}>
          <Tab
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            journal="journal"
            conference="conference"
          />
          {selectedTab === "journal" ? (
            <DisplayAllPapers />
          ) : (
            <DisplayAllConference />
          )}
        </Suspense>
      </>
    </div>
  );
}

export default HomePage;
