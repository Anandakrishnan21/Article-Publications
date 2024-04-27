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

function ConferenceChart({ conferenceChart }) {
  const conferenceRef = useRef(null);
  const [yearCountMap, setYearCountMap] = useState({});
  const [selectedStartYear, setSelectedStartYear] = useState("");
  const [selectedEndYear, setSelectedEndYear] = useState("");
  const [yearlyDifferences, setYearlyDifferences] = useState([]);

  useEffect(() => {
    if (conferenceChart) {
      const counts = {};

      conferenceChart.forEach((paper) => {
        const year = paper.pubYear;
        counts[year] = (counts[year] || 0) + 1;
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
      <div className="w-full flex justify-between items-center mt-4">
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
            className="inputFields mr-2"
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

export default ConferenceChart;
