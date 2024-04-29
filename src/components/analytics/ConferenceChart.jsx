"use client";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { FaFileExcel } from "react-icons/fa";
import YearlyFilter from "./YearlyFilter";

function ConferenceChart({ conferenceChart }) {
  const conferenceRef = useRef(null);
  const [yearCountMap, setYearCountMap] = useState({});
  const [selectedStartYear, setSelectedStartYear] = useState("");
  const [selectedEndYear, setSelectedEndYear] = useState("");
  const [yearlyDifferences, setYearlyDifferences] = useState([]);
  const currentYear = new Date().getFullYear();
  const availableYears = [];
  for (let i = 0; i < 5; i++) {
    availableYears.push(currentYear - i);
  }

  useEffect(() => {
    if (conferenceChart) {
      const counts = {};

      conferenceChart.forEach((paper) => {
        const year = paper.pubYear;
        if (year >= currentYear - 4 && year <= currentYear) {
          counts[year] = (counts[year] || 0) + 1;
        }
      });

      setYearCountMap(counts);

      if (conferenceRef.current) {
        conferenceRef.current.destroy();
      }

      const ctx = document.getElementById("conference").getContext("2d");
      const chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(counts),
          datasets: [
            {
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
                  size: 16,
                },
              },
              ticks: {
                font: {
                  weight: "bold",
                },
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Number of Conferences",
                font: {
                  size: 16,
                },
              },
              ticks: {
                font: {
                  weight: "bold",
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
              text: "Conferences published",
              font: {
                size: 20,
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
      fields: ["Year", "Number of Conferences"],
      data: Object.entries(yearCountMap).map(([year, count]) => [year, count]),
    });

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "conference_data.csv");
  };

  const handleFilterByYearRange = () => {
    const start = parseInt(selectedStartYear);
    const end = parseInt(selectedEndYear);

    const filteredCounts = {};
    Object.entries(yearCountMap).forEach(([year, count]) => {
      if (year >= start && year <= end) {
        filteredCounts[year] = count;
      }
    });

    const startCount = filteredCounts[start] || 0;
    const endCount = filteredCounts[end] || 0;
    const difference = endCount - startCount;

    setYearlyDifferences([{ year: `${start} to ${end}`, difference }]);

    const ctx = document.getElementById("conference").getContext("2d");
    if (conferenceRef.current) {
      conferenceRef.current.destroy();
    }
    const filteredChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [`${start} to ${end}`],
        datasets: [
          {
            label: "Difference in Conferences",
            data: [difference],
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
              text: "Year Range",
              font: {
                size: 16,
              },
            },
            ticks: {
              font: {
                weight: "bold",
              },
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Difference in Conferences",
              font: {
                size: 16,
              },
            },
            ticks: {
              font: {
                weight: "bold",
              },
            },
          },
        },
        plugins: {
          legend: {
            Position: top,
          },
          title: {
            display: true,
            text: `Difference in Conferences (${start} to ${end})`,
            font: {
              size: 20,
            },
          },
        },
      },
    });

    conferenceRef.current = filteredChartInstance;
  };

  return (
    <div className="Chart">
      <Button
        variant="outline"
        onClick={handleDownloadCSV}
        className="ExportBtn self-end h-8"
      >
        <p className="text-xs">Export CSV</p>
        <FaFileExcel />
      </Button>
      <canvas id="conference"></canvas>
      <YearlyFilter
        yearlyDifferences={yearlyDifferences}
        selectedStartYear={selectedStartYear}
        selectedEndYear={selectedEndYear}
        availableYears={availableYears}
        handleFilterByYearRange={handleFilterByYearRange}
        setSelectedStartYear={setSelectedStartYear}
        setSelectedEndYear={setSelectedEndYear}
      />
    </div>
  );
}

export default ConferenceChart;
