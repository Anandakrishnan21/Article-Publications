"use client"
import React, { useState } from "react";
import DisplayAllPapers from "@/components/homePage/DisplayAllPapers";
import DisplayAllConference from "@/components/homePage/DisplayAllConference";
import Tab from "@/components/comp/Tab";

function HomePage() {
  const [selectedTab, setSelectedTab] = useState("journal");

  return (
    <div className="p-4">
      <Tab selectedTab = {selectedTab} setSelectedTab={setSelectedTab} journal="journal" conference="conference" />
      {selectedTab === "journal" ? (
        <DisplayAllPapers />
      ) : (
        <DisplayAllConference />
      )}
    </div>
  );
}

export default HomePage;
