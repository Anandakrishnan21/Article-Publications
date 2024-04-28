"use client";
import React, { Suspense, useEffect, useState } from "react";
import History from "@/components/analytics/History";
import JournalChart from "@/components/analytics/JournalChart";
import ConferenceChart from "@/components/analytics/ConferenceChart";
import Loading from "../loading";
import Doughnut from "@/components/analytics/Doughnut";

function AnalyticsPage() {
  const [chartData, setChartData] = useState("");
  const [conferenceChart, setConferenceChart] = useState("");
  const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // await new Promise((resolve) => setTimeout(resolve, 2000))
        const res = await fetch("/api/addPublication", {
          cache: "no-store",
        });

        if (!res.ok) {
          setError("Failed to fetch data");
          return;
        }

        const data = await res.json();
        setChartData(data);
        // setIsLoading(false);
      } catch (error) {
        setError("Error fetching data: " + error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/addConference", {
          cache: "no-store",
        });

        const data = await res.json();
        setConferenceChart(data);
      } catch (error) {
        setError("Error fetching data: " + error.message);
      }
    };
    fetchData();
  }, []);

  // if (isLoading) {
  //   return <Loading />;
  // }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="h-full flex flex-col justify-center gap-2 box-border p-4">
        <div className="w-full lg:h-72 flex flex-col lg:flex-row gap-2">
          <History chartData={chartData} conferenceChart={conferenceChart} />
          <Doughnut chartData={chartData} conferenceChart={conferenceChart} />
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
          <JournalChart chartData={chartData} />
          <ConferenceChart conferenceChart={conferenceChart} />
        </div>
      </div>
    </Suspense>
  );
}

export default AnalyticsPage;
