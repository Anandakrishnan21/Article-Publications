import React from "react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import "jspdf-autotable";

function PdfExcelConfer({ papers }) {
  const generatePDF = () => {
    const doc = new jsPDF();
    let yOffset = 10;

    doc.setFontSize(16);
    doc.text("Conference Published".toUpperCase(), 70, yOffset);

    const columns = [
      { header: "Title", dataKey: "title" },
      { header: "Authors", dataKey: "authors" },
      { header: "Department", dataKey: "dept" },
      { header: "Conference", dataKey: "conference" },
      { header: "Vol", dataKey: "vol" },
      { header: "Page No", dataKey: "pageno" },
      { header: "Year", dataKey: "pubYear" },
      { header: "Isbn No", dataKey: "isbn" },
    ];

    const rows = papers.map((paper) => ({
      title: paper.title,
      authors: `${paper.author1} ${paper.author2}`,
      dept: paper.dept,
      conference: paper.conference.toLowerCase(),
      isbn: paper.isbn,
      vol: paper.vol,
      pubYear: paper.pubYear,
    }));

    doc.autoTable({
      startY: 20,
      startX: 0,
      head: [columns.map((col) => col.header)],
      body: rows.map((row) => columns.map((col) => row[col.dataKey])),
    });

    doc.save("Conference.pdf");
  };

  const generateExcel = () => {
    const data = papers.map((paper) => ({
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
    <div className="ExportBtnDiv">
      <Button variant="outline" onClick={generatePDF} className="ExportBtn">
        <p>Export PDF</p>
        <FaFilePdf />
      </Button>
      <Button variant="outline" onClick={generateExcel} className="ExportBtn">
        <p>Export Excel</p>
        <FaFileExcel />
      </Button>
    </div>
  );
}

export default PdfExcelConfer;
