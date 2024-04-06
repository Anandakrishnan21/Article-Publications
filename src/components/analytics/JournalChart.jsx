"use client";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { Button } from "../ui/button";

function JournalChart({ chartData }) {
  const journalRef = useRef(null);
  const [yearCountMap, setYearCountMap] = useState({});

  useEffect(() => {
    if (chartData) {
      if (journalRef.current) {
        journalRef.current.destroy();
      }

      const counts = {};

      chartData.forEach((paper) => {
        const year = paper.pubYear;
        counts[year] = (counts[year] || 0) + 1;
      });

      setYearCountMap(counts);

      const ctx = document.getElementById("journal");
      const chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(counts),
          datasets: [
            {
              display: true,
              label: "Number of Journals",
              data: Object.values(counts),
              backgroundColor: "rgb(54, 162, 235)",
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
              barThickness: 0.2,
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
                text: "Number of Journals",
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
          },
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Journals published",
              font: {
                size: "20",
              },
            },
          },
        },
      });

      journalRef.current = chartInstance;
    }
  }, [chartData]);

  const handleDownloadCSV = () => {
    const csvData = Papa.unparse({
      fields: ["Year", "Number of Journals"],
      data: Object.entries(yearCountMap).map(([year, count]) => [year, count]),
    });

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "journal_data.csv");
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
      <canvas id="journal"></canvas>
    </div>
  );
}

export default JournalChart;
