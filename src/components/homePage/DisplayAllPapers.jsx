"use client";
import { tableHeader } from "@/utils/constants";
import { useState, useEffect } from "react";

const DisplayAllPapers = () => {
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/addPublication", {
          cache: "no-store",
        });

        if (!res.ok) {
          setError("Failed to fetch data");
          return;
        }

        const data = await res.json();
        setPapers(data);
      } catch (error) {
        setError("Error fetching papers: " + error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-center pt-6">
      <div className="w-11/12 h-full bg-neutral-50 dark:bg-neutral-950 border-[1px] border-neutral-200 dark:border-neutral-800 p-4 rounded overflow-auto">
        <p className="text-3xl dark:text-neutral-50 font-semibold pb-6">
          Latest Uploaded Papers
        </p>
        <table className="w-full">
          <thead>
            <tr>
              {tableHeader.map((header) => (
                <th key={header.id} className="dark:text-neutral-400 text-sm">{header.name}</th>
              ))}
            </tr>
          </thead>
          <tbody className="w-full dark:text-neutral-400 bg-neutral-200 dark:bg-neutral-900 text-sm tracking-wide leading-6 rounded">
            {papers.map((paper) => (
              <tr key={paper._id}>
                <td className="p-4 px-8">{paper.title}</td>
                <td className="p-4 px-8">{paper.author1}</td>
                <td className="p-4 px-8">{paper.dept}</td>
                <td className="p-4 px-8">{paper.journal}</td>
                <td className="p-4 px-8">{paper.month}</td>
                <td className="p-4 px-8">{paper.pubYear}</td>
                <td className="p-4 px-8">{paper.issn}</td>
                <td className="p-4 px-8">{paper.vol}</td>
                <td className="p-4 px-8">{paper.pageno}</td>
                <td className="p-4 px-8">{paper.doi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayAllPapers;
