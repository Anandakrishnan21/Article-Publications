"use client";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function Doughnut({ chartData, conferenceChart }) {
  const doughnutRef = useRef(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (chartData && conferenceChart) {
      if (doughnutRef.current) {
        doughnutRef.current.destroy();
      }

      const totalYearCountMap = {};

      chartData.forEach((paper) => {
        const year = paper.pubYear;
        if (year >= currentYear - 4 && year <= currentYear) {
          totalYearCountMap[year] = (totalYearCountMap[year] || 0) + 1;
        }
      });

      conferenceChart.forEach((paper) => {
        const year = paper.pubYear;
        if (year >= currentYear - 4 && year <= currentYear) {
          totalYearCountMap[year] = (totalYearCountMap[year] || 0) + 1;
        }
      });

      const allYears = Object.keys(totalYearCountMap);
      const totalData = allYears.map((year) => totalYearCountMap[year] || 0);

      const ctx = document.getElementById("doughnut");
      const doughnutChartInstance = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: allYears,
          datasets: [
            {
              label: "Publications",
              data: totalData,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "rgb(153, 102, 255)",
                "#4CAF50",
              ].slice(0, allYears.length),
              borderColor: "#fff",
              borderWidth: 2,
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: "Publications over the Years",
              font: {
                size: "20",
              },
            },
            legend: {
              position: "top",
            },
          },
        },
      });

      doughnutRef.current = doughnutChartInstance;
    }
  }, [chartData, conferenceChart]);

  return (
    <div className="lineChart">
      <canvas id="doughnut"></canvas>
    </div>
  );
}

export default Doughnut;
