import React from "react";
import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";
import { useSession } from "next-auth/react";
import Link from "next/link";
import jsPDF from "jspdf";
import { Button } from "../ui/button";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Table({ currentItems, setPapers }) {
  const { data: session } = useSession();
  const generatePDF = () => {
    const doc = new jsPDF();
    let yOffset = 10;

    doc.setFontSize(20);
    doc.text("Journals Published".toUpperCase(), 75, yOffset);

    currentItems.forEach((paper, index) => {
      if (yOffset + 50 >= doc.internal.pageSize.height - 10) {
        doc.addPage();
        yOffset = 45;
      }

      doc.rect(10, yOffset + 5, doc.internal.pageSize.width - 20, 40);

      doc.setFontSize(10);
      doc.text(`Title: ${paper.title}`.toUpperCase(), 15, yOffset + 15);
      doc.text(
        `Authors: ${paper.author1} ${paper.author2} ${paper.author3} ${paper.author4}`.toUpperCase(),
        15,
        yOffset + 21
      );
      doc.text(`Department: ${paper.dept}`.toUpperCase(), 15, yOffset + 27);
      doc.text(`Journal: ${paper.journal}`.toUpperCase(), 165, yOffset + 27);
      doc.text(`Issn No: ${paper.issn}`.toUpperCase(), 15, yOffset + 33);
      doc.text(
        `Vol: ${paper.vol} Page No: ${paper.pageno} Year: ${paper.pubYear} Month: ${paper.month}`.toUpperCase(),
        110,
        yOffset + 33
      );
      doc.textWithLink(
        `Doi: ${paper.doi}`.toUpperCase(),
        15,
        yOffset + 39,
        (url = `${paper.doi}`)
      );

      yOffset += 55;
    });

    doc.save("Journal.pdf");
  };

  const generateExcel = () => {
    const data = currentItems.map((paper) => ({
      Title: paper.title,
      Author1: paper.author1,
      Author2: paper.author2,
      Author3: paper.author3,
      Author4: paper.author4,
      Department: paper.dept,
      Journal: paper.journal,
      Issn: paper.issn,
      Volume: paper.vol,
      Page: paper.pageno,
      Year: paper.pubYear,
      Month: paper.month,
      Doi: paper.doi,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Journals");
  
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
  
    saveAs(dataBlob, "Journals.xlsx");
  };

  return (
    <div className="w-full flex flex-col gap-2 p-4 rounded">
      <div className="flex flex-col md:flex-row gap-2">
        <Button onClick={generatePDF} className="flex-start">
          Convert to pdf
        </Button>
        <Button onClick={generateExcel} className="">
          Download Excel
        </Button>
      </div>
      {currentItems.map((paper) => (
        <div
          className="w-full flex flex-col md:flex-row border-2 bg-neutral-50 dark:bg-neutral-900 border-neutral-950 dark:border-neutral-700 hover:dark:border-neutral-700 duration-500"
          key={paper._id}
        >
          <div className="w-full md:w-10/12 flex flex-col bg-neutral-100 dark:bg-neutral-900 capitalize p-2">
            <h1 className="text-2xl font-semibold">{paper.title}</h1>
            <div className="dark:text-neutral-400">
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
                  <span className="text-xs md:text-sm font-medium">
                    {paper.dept}
                  </span>
                </p>
                <p className="text-sm md:text-base font-semibold">
                  Journal:{" "}
                  <span className="text-xs md:text-sm font-medium">
                    {paper.journal}
                  </span>
                </p>
              </div>
              <div className="w-full flex flex-col md:flex-row justify-between">
                <p className="text-sm md:text-base font-semibold">
                  Issn no:{" "}
                  <span className="text-xs md:text-sm font-medium">
                    {paper.issn}
                  </span>
                </p>
                <div className="flex gap-1">
                  <p className="text-sm md:text-base font-semibold">
                    Vol:{" "}
                    <span className="text-xs md:text-sm font-medium">
                      {paper.vol}
                    </span>
                  </p>
                  <p className="text-sm md:text-base font-semibold">
                    page no:{" "}
                    <span className="text-xs md:text-sm font-medium">
                      {paper.pageno}
                    </span>
                  </p>
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
              <p className="text-sm md:text-base font-semibold">
                Doi:{" "}
                <span className="text-xs md:text-sm font-medium">
                  {paper.doi}
                </span>
              </p>
            </div>
          </div>
          {session?.user?.email === paper.email ? (
            <div className="w-full md:w-2/12 bg-neutral-200 dark:bg-neutral-950 flex flex-row md:flex-col justify-center gap-1 p-2">
              <DeleteBtn id={paper._id} setPapers={setPapers} />
              <Link href={`/home/editJournal/${paper._id}`} className="w-full">
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
