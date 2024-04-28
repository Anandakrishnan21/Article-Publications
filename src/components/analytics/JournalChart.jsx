"use client";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { Button } from "../ui/button";
import { FaFileExcel } from "react-icons/fa";
import YearlyFilter from "./YearlyFilter";

function JournalChart({ chartData }) {
  const journalRef = useRef(null);
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
    if (chartData) {
      const counts = {};

      chartData.forEach((paper) => {
        const year = paper.pubYear;
        if (year >= currentYear - 4 && year <= currentYear) {
          counts[year] = (counts[year] || 0) + 1;
        }
      });

      setYearCountMap(counts);

      if (journalRef.current) {
        journalRef.current.destroy();
      }

      const ctx = document.getElementById("journal").getContext("2d");
      const chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(counts),
          datasets: [
            {
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
                text: "Number of Journals",
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
              text: "Journals published",
              font: {
                size: 20,
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

  const handleFilterByYearRange = () => {
    const start = parseInt(selectedStartYear);
    const end = parseInt(selectedEndYear);
    console.log(start, end);

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

    const ctx = document.getElementById("journal").getContext("2d");
    if (journalRef.current) {
      journalRef.current.destroy();
    }

    const filteredChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [`${start} to ${end}`],
        datasets: [
          {
            label: "Difference in Journals",
            data: [difference],
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
              text: "Difference in Journals",
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
            position: top,
          },
          title: {
            display: true,
            text: `Difference in Journals (${start} to ${end})`,
            font: {
              size: 20,
            },
          },
        },
      },
    });

    journalRef.current = filteredChartInstance;
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
      <canvas id="journal"></canvas>
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

export default JournalChart;
