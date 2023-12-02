import { tableHeader } from "@/utils/constants";
import React from "react";
import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";
import { useSession } from "next-auth/react";
import Link from "next/link";

function Table({ currentItems, setPapers }) {
  const { data: session } = useSession();
  return (
    <div className="w-full flex flex-col gap-2 p-4 rounded">
      {currentItems.map((paper) => (
        <div
          className="w-full flex flex-col md:flex-row border-2 bg-neutral-50 border-neutral-950"
          key={paper._id}
        >
          <div className="w-full md:w-10/12 flex flex-col bg-neutral-100 capitalize p-2">
            <h1 className="text-2xl font-semibold">{paper.title}</h1>
            <div>
              <p className="text-sm md:text-base font-semibold">
                Authors:{" "}
                <span className="text-xs md:text-sm font-medium">
                  {paper.author1} {paper.author2} {paper.author3}{" "}
                  {paper.author4}
                </span>
              </p>
              <div className="w-full flex justify-between">
                <p className="text-sm md:text-base font-semibold">
                  Department:{" "}
                  <span className="text-xs md:text-sm font-medium">{paper.dept}</span>
                </p>
                <p className="text-sm md:text-base font-semibold">
                  Name:{" "}
                  <span className="text-xs md:text-sm font-medium">{paper.journal}</span>
                </p>
              </div>
              <div className="w-full flex flex-col md:flex-row justify-between">
                <p className="text-sm md:text-base font-semibold">
                  Issn no:{" "}
                  <span className="text-xs md:text-sm font-medium">{paper.issn}</span>
                </p>
                <div className="flex gap-1">
                  <p className="text-sm md:text-base font-semibold">
                    Vol:{" "}
                    <span className="text-xs md:text-sm font-medium">{paper.vol}</span>
                  </p>
                  <p className="text-sm md:text-base font-semibold">
                    page no:{" "}
                    <span className="text-xs md:text-sm font-medium">{paper.pageno}</span>
                  </p>
                  <p className="text-sm md:text-base font-semibold">
                    Year:{" "}
                    <span className="text-xs md:text-sm font-medium">{paper.pubYear}</span>
                  </p>
                  <p className="text-sm md:text-base font-semibold">
                    Month:{" "}
                    <span className="text-xs md:text-sm font-medium">{paper.month}</span>
                  </p>
                </div>
              </div>
              <p className="text-sm md:text-base font-semibold">
                Doi: <span className="text-xs md:text-sm font-medium">{paper.doi}</span>
              </p>
            </div>
          </div>
          {session?.user?.email === paper.email ? (
            <div className="w-full md:w-2/12 bg-neutral-200 flex flex-row md:flex-col justify-center gap-1 p-2">
              <DeleteBtn id={paper._id} setPapers={setPapers} />
              <Link href={`home/editJournal/${paper._id}`} className="w-full">
                <EditBtn />
              </Link>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Table;
