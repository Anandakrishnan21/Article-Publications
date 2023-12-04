import React from "react";
import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";
import { useSession } from "next-auth/react";
import Link from "next/link";
import jsPDF from "jspdf";
import { Button } from "../ui/button";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ConferenceDeleteBtn from "./ConferenceDeleteBtn";

function ConferenceTable({ currentItems, setPapers }) {
  const { data: session } = useSession();
  const generatePDF = () => {
    const doc = new jsPDF();
    let yOffset = 10;

    doc.setFontSize(20);
    doc.text("Conference Published".toUpperCase(), 75, yOffset);

    currentItems.forEach((paper, index) => {
      if (yOffset + 50 >= doc.internal.pageSize.height - 10) {
        doc.addPage();
        yOffset = 45;
      }

      doc.rect(10, yOffset+10, doc.internal.pageSize.width - 20, 40);

      doc.setFontSize(10);
      doc.text(`Title: ${paper.title}`.toUpperCase(), 15, yOffset + 15);
      doc.text(
        `Authors: ${paper.author1} ${paper.author2} ${paper.author3} ${paper.author4}`.toUpperCase(),
        15,
        yOffset + 21
      );
      doc.text(`Department: ${paper.dept}`.toUpperCase(), 15, yOffset + 27);
      doc.text(`Conference: ${paper.conference}`.toUpperCase(), 15, yOffset + 33);
      doc.text(`Isbn No: ${paper.isbn}`.toUpperCase(), 15, yOffset + 39);
      doc.text(
        `Year: ${paper.pubYear} Month: ${paper.month}`.toUpperCase(),
        140,
        yOffset + 39
      );
      if (paper.doi) {
        doc.textWithLink(`Doi: ${paper.doi}`.toUpperCase(), 15, yOffset + 45, {
          url: paper.doi,
        });
      } else {
        doc.text("DOI Not Available", 15, yOffset + 39);
      }

      yOffset += 55;
    });

    doc.save("Conference.pdf");
  };

  const generateExcel = () => {
    const data = currentItems.map((paper) => ({
      Title: paper.title,
      Author1: paper.author1,
      Author2: paper.author2,
      Author3: paper.author3,
      Author4: paper.author4,
      Department: paper.dept,
      Conference: paper.conference,
      Isbn: paper.isbn,
      Year: paper.pubYear,
      Month: paper.month,
      Doi: paper.doi,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Journals");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(dataBlob, "Conference.xlsx");
  };

  return (
    <div className="w-full flex flex-col gap-2 p-4 rounded">
      <div className="flex flex-col justify-end md:flex-row gap-2">
        <Button onClick={generatePDF} className="flex-start">
          Convert to pdf
        </Button>
        <Button onClick={generateExcel} className="">
          Download Excel
        </Button>
      </div>
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
