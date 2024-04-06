"use client";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { Button } from "../ui/button";

function ConferenceChart({ conferenceChart }) {
  const conferenceRef = useRef(null);
  const [yearCountMap, setYearCountMap] = useState({});

  useEffect(() => {
    if (conferenceChart) {
      if (conferenceRef.current) {
        conferenceRef.current.destroy();
      }

      const counts = {};

      conferenceChart.forEach((paper) => {
        const year = paper.pubYear;
        counts[year] = (counts[year] || 0) + 1;
      });

      setYearCountMap(counts);

      const ctx = document.getElementById("conference");
      const chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(counts),
          datasets: [
            {
              display: true,
              label: "Number of Conferences",
              data: Object.values(counts),
              backgroundColor: "rgb(255, 99, 132)",
              barThickness: 20,
            },
          ],
        },

        options: {
          scales: {
            x: {
              type: "category",
              title: {
                display: true,
                text: "Year",
                font: {
                  size: "16",
                },
              },
              ticks: {
                font: {
                  weight: "600",
                },
              },
            },
            y: {
              beginAtZero: true,
              suggestedMin: 1,
              title: {
                display: true,
                text: "Number of Conferences",
                font: {
                  size: "16",
                },
              },
              ticks: {
                font: {
                  weight: "semibold",
                },
              },
            },
          },

          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Conference published",
              font: {
                size: "20",
              },
            },
          },
        },
      });

      conferenceRef.current = chartInstance;
    }
  }, [conferenceChart]);

  const handleDownloadCSV = () => {
    const csvData = Papa.unparse({
      fields: ["Year", "Number of Conference"],
      data: Object.entries(yearCountMap).map(([year, count]) => [year, count]),
    });

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "conference_data.csv");
  };
  return (
    <div className="Chart">
      <Button
        variant="outline"
        className="self-end ExportBtn"
        onClick={handleDownloadCSV}
      >
        Export CSV
      </Button>
      <canvas id="conference"></canvas>
    </div>
  );
}

export default ConferenceChart;
