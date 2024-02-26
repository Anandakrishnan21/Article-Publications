"use client";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function ConferenceChart({ conferenceChart }) {
  const conferenceRef = useRef(null);

  useEffect(() => {
    if (conferenceChart) {
      if (conferenceRef.current) {
        conferenceRef.current.destroy();
      }

      const yearCountMap = {};

      conferenceChart.forEach((paper) => {
        const year = paper.pubYear;
        yearCountMap[year] = (yearCountMap[year] || 0) + 1;
      });

      const ctx = document.getElementById("conference");
      const chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(yearCountMap),
          datasets: [
            {
              display: true,
              label: "Number of Conferences",
              data: Object.values(yearCountMap),
              backgroundColor: "#33F4F9",
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
              },
              barThickness: 0.2,
              grid: {
                display: false,
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
              },
              ticks: {
                font: {
                  weight: "semibold",
                },
              },
              grid: {
                display: false,
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
                  weight: "700",
                },
            },
          },
        },
      });

      conferenceRef.current = chartInstance;
    }
  }, [conferenceChart]);
  return (
    <div className="Chart">
      <canvas id="conference"></canvas>
    </div>
  );
}

export default ConferenceChart;
