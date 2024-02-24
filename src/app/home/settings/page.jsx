"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Legend,
  Tooltip
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title, Legend, Tooltip);

function SettingsPage() {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/addPublication", {
          cache: "no-store",
        });

        if (!res.ok) {
          setError("Failed to fetch data");
          return;
        }

        const data = await res.json();
        setChartData(data);
      } catch (error) {
        setError("Error fetching data: " + error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartData) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const yearCountMap = {};

      chartData.forEach((paper) => {
        const year = paper.pubYear;
        yearCountMap[year] = (yearCountMap[year] || 0) + 1;
      });

      const ctx = document.getElementById("myChart");
      const chartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(yearCountMap),
          datasets: [
            {
              display: true,
              label: "Number of Papers",
              data: Object.values(yearCountMap),
              barPercentage: 0.5,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
              barThickness: 20,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              suggestedMin: 1,
              title: {
                display: true,
                text: "Number of Papers",
              },
            },
            x: {
              type: "category",
              title: {
                display: true,
                text: "Year",
              },
              barThickness: 0.2,
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

      chartRef.current = chartInstance;
    }
  }, [chartData]);

  return (
    <div className="p-4">
      <div className="w-1/2 h-full flex justify-center items-center bg-white border-[1px] border-neutral-900 rounded-md  p-2">
        <canvas id="myChart"></canvas>
      </div>
    </div>
  );
}

export default SettingsPage;