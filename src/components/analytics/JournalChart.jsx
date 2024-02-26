"use client";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function JournalChart({ chartData }) {
  const journalRef = useRef(null);
  useEffect(() => {
    if (chartData) {
      if (journalRef.current) {
        journalRef.current.destroy();
      }

      const yearCountMap = {};

      chartData.forEach((paper) => {
        const year = paper.pubYear;
        yearCountMap[year] = (yearCountMap[year] || 0) + 1;
      });

      const ctx = document.getElementById("journal");
      const chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(yearCountMap),
          datasets: [
            {
              display: true,
              label: "Number of Journals",
              data: Object.values(yearCountMap),
              backgroundColor: "#9746D2",
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
              ticks:{
                font: {
                    weight: '600'
                }
              }
            },
            y: {
              beginAtZero: true,
              suggestedMin: 1,
              title: {
                display: true,
                text: "Number of Journals",
              },
              ticks: {
                font: {
                  weight: '600'
                }
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
              text: "Journals published",
            },
          },
        },
      });

      journalRef.current = chartInstance;
    }
  }, [chartData]);
  return (
    <div className="Chart">
      <canvas id="journal" className="w-44"></canvas>
    </div>
  );
}

export default JournalChart;