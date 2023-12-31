import React from "react";
import EditBtn from "./EditBtn";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ConferenceDeleteBtn from "./ConferenceDeleteBtn";
import PdfExcelConfer from "./PdfExcelConfer";

function ConferenceTable({ currentItems, setPapers }) {
  const { data: session } = useSession();

  return (
    <div className="w-full flex flex-col gap-2 rounded">
      <PdfExcelConfer currentItems={currentItems} />
      <div className="mt-5 flex flex-col gap-2">
        {currentItems.map((paper) => (
          <div className="cardStyle" key={paper._id}>
            <div className="w-full md:w-10/12 flex flex-col capitalize p-2">
              <h1 className="text-2xl font-semibold">{paper.title}</h1>
              <div className="dark:text-neutral-400">
                <p className="text-sm md:text-base font-semibold">
                  Authors:{" "}
                  <span className="text-xs md:text-sm font-medium">
                    {paper.author1} {paper.author2} {paper.author3}{" "}
                    {paper.author4}
                  </span>
                </p>
                {/* dept & journal */}
                <div className="w-full flex justify-between">
                  <p className="text-sm md:text-base font-semibold">
                    Department:{" "}
                    <span className="text-xs md:text-sm font-medium">
                      {paper.dept}
                    </span>
                  </p>
                  <p className="text-sm md:text-base font-semibold">
                    Conference:{" "}
                    <span className="text-xs md:text-sm font-medium">
                      {paper.conference}
                    </span>
                  </p>
                </div>
                {/* issn & vol page year month */}
                <div className="w-full flex flex-col md:flex-row justify-between">
                  <p className="text-sm md:text-base font-semibold">
                    Isbn no:{" "}
                    <span className="text-xs md:text-sm font-medium">
                      {paper.isbn}
                    </span>
                  </p>
                  <div className="flex gap-1">
                    <p className="text-sm md:text-base font-semibold">
                      Year:{" "}
                      <span className="text-xs md:text-sm font-medium">
                        {paper.pubYear}
                      </span>
                    </p>
                    <p className="text-sm md:text-base font-semibold">
                      Month:{" "}
                      <span className="text-xs md:text-sm font-medium">
                        {paper.month}
                      </span>
                    </p>
                  </div>
                </div>
                {/* doi */}
                <p className="text-sm md:text-base font-semibold">
                  DOI:{" "}
                  <span className="text-xs md:text-sm font-medium">
                    <Link
                      href={paper.doi}
                      target="_blank"
                      className="text-blue-700 dark:text-blue-400 hover:underline"
                    >
                      click here
                    </Link>
                  </span>
                </p>
              </div>
            </div>
            {session?.user?.email === paper.email ? (
              <div className="w-full md:w-2/12 flex flex-row md:flex-col justify-center gap-2 p-2">
                <ConferenceDeleteBtn id={paper._id} setPapers={setPapers} />
                <Link
                  href={`/home/editConference/${paper._id}`}
                  className="w-full"
                >
                  <EditBtn />
                </Link>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConferenceTable;
