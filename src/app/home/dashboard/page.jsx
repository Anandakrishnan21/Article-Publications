"use client"
import Tab from "@/components/comp/button/Tab";
import DisplayUserConference from "@/components/homePage/DisplayUserConference";
import DisplayUserJournal from "@/components/homePage/DisplayUserJournal";
import React, { useState } from "react";

function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState("journal");

  return (
    <div className="w-screen md:w-full">
      <Tab selectedTab= {selectedTab} setSelectedTab={setSelectedTab} journal="journal" conference="conference" />
      {selectedTab === "journal" ? (
        <DisplayUserJournal />
      ) : (
        <DisplayUserConference />
      )}
    </div>
  );
}

export default DashboardPage;
