"use client";
import React, { useState } from "react";
import DisplayAllPapers from "@/components/homePage/DisplayAllPapers";
import DisplayAllConference from "@/components/homePage/DisplayAllConference";
import Tab from "@/components/comp/Tab";
import { useSession } from "next-auth/react";
import { SpecialForm } from "@/components/comp/SpecialForm";

function HomePage() {
  const [selectedTab, setSelectedTab] = useState("journal");
  const { data: session } = useSession();

  return (
    <div>
      {session?.user?.scholar ? (
        <>
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
        </>
      ) : (
        <div>
          <SpecialForm />
        </div>
      )}
    </div>
  );
}

export default HomePage;
