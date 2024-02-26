"use client";
import React, { useEffect, useState } from "react";
import History from "@/components/analytics/History";
import JournalChart from "@/components/analytics/JournalChart";
import ConferenceChart from "@/components/analytics/ConferenceChart";
import LineChart from "@/components/analytics/LineChart";
import Loading from "../loading";

function AnalyticsPage() {
  const [chartData, setChartData] = useState(null);
  const [conferenceChart, setConferenceChart] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const res = await fetch("/api/addPublication", {
          cache: "no-store",
        });

        if (!res.ok) {
          setError("Failed to fetch data");
          return;
        }

        const data = await res.json();
        setChartData(data);
        setLoading(false);
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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="h-full flex flex-col justify-center gap-4 box-border p-4">
      <div className="w-full h-2/5 flex flex-col lg:flex-row gap-4">
        <History chartData={chartData} conferenceChart={conferenceChart} />
        <LineChart chartData={chartData} conferenceChart={conferenceChart} />
      </div>
      <div className="h-1/2 flex flex-col lg:flex-row gap-4">
        <JournalChart chartData={chartData} />
        <ConferenceChart conferenceChart={conferenceChart} />
      </div>
    </div>
  );
}

export default AnalyticsPage;
