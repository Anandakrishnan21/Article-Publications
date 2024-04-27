"use client";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { IoFilter } from "react-icons/io5";
import { FaFileExcel } from "react-icons/fa";

function JournalChart({ chartData }) {
  const journalRef = useRef(null);
  const [yearCountMap, setYearCountMap] = useState({});
  const [selectedStartYear, setSelectedStartYear] = useState("");
  const [selectedEndYear, setSelectedEndYear] = useState("");
  const [yearlyDifferences, setYearlyDifferences] = useState([]);

  useEffect(() => {
    if (chartData) {
      const counts = {};

      chartData.forEach((paper) => {
        const year = paper.pubYear;
        counts[year] = (counts[year] || 0) + 1;
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
      <div className="w-full flex justify-between items-center">
        {yearlyDifferences.length > 0 && (
          <div className="w-1/2 flex items-center text-sm gap-1">
            <p className="text-green-600">
              Progress from {selectedStartYear} to {selectedEndYear} is
            </p>
            {yearlyDifferences.map((item) => (
              <p key={item.year} className="text-2xl">
                {item.difference}
              </p>
            ))}
          </div>
        )}
        <div className="w-1/2 flex justify-end gap-2">
          <Select
            onValueChange={(value) => setSelectedStartYear(value)}
            id="startYear"
            value={selectedStartYear}
            className="inputFields"
          >
            <SelectTrigger className="inputLabel dark:bg-neutral-900 h-8">
              <SelectValue placeholder="Start year" />
            </SelectTrigger>
            <SelectContent>
              {[2018, 2019, 2020, 2021, 2022, 2023].map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => setSelectedEndYear(value)}
            id="endYear"
            value={selectedEndYear}
            className="inputFields"
          >
            <SelectTrigger className="inputLabel dark:bg-neutral-900 h-8">
              <SelectValue placeholder="End year" />
            </SelectTrigger>
            <SelectContent>
              {[2018, 2019, 2020, 2021, 2022, 2023].map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleFilterByYearRange} className="ExportBtn h-8">
            <IoFilter />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default JournalChart;
