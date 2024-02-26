"use client";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function LineChart({ chartData, conferenceChart }) {
  const lineRef = useRef(null);

  useEffect(() => {
    if (chartData && conferenceChart) {
      if (lineRef.current) {
        lineRef.current.destroy();
      }

      const journalYearCountMap = {};
      chartData.forEach((paper) => {
        const year = paper.pubYear;
        journalYearCountMap[year] = (journalYearCountMap[year] || 0) + 1;
      });

      const conferenceYearCountMap = {};
      conferenceChart.forEach((paper) => {
        const year = paper.pubYear;
        conferenceYearCountMap[year] = (conferenceYearCountMap[year] || 0) + 1;
      });

      const allYears = Array.from(
        new Set([
          ...Object.keys(journalYearCountMap),
          ...Object.keys(conferenceYearCountMap),
        ])
      );
      const journalData = allYears.map(
        (year) => journalYearCountMap[year] || 0
      );
      const conferenceData = allYears.map(
        (year) => conferenceYearCountMap[year] || 0
      );

      const ctx = document.getElementById("line");
      const lineChartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: allYears,
          datasets: [
            {
              label: "Number of Journals",
              data: journalData,
              backgroundColor: "#9746D2",
              borderColor: "#9746D2",
              fill: false,
            },
            {
              label: "Number of Conferences",
              data: conferenceData,
              backgroundColor: "#33F4F9",
              borderColor: "#33F4F9",
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: "Year",
              },
              ticks: {
                font: {
                  weight: "600",
                },
              },
              grid: {
                display: false,
              },
            },
            y: {
              title: {
                display: true,
                text: "Number of Publications",
              },
              ticks: {
                font: {
                  weight: "600",
                },
              },
              grid:{
                display: false,
              }
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Publications over the Years",
            },
            legend: {
              position: "top",
            },
          },
        },
      });

      lineRef.current = lineChartInstance;
    }
  }, [chartData, conferenceChart]);

  return (
    <div className="lineChart">
      <canvas id="line"></canvas>
    </div>
  );
}

export default LineChart;
