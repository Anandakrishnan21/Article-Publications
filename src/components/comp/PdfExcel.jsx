import React from "react";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import "jspdf-autotable";

function PdfExcel({ papers }) {
  const generatePDF = () => {
    const doc = new jsPDF();
    let yOffset = 10;

    doc.setFontSize(16);
    doc.text("Journals Published".toUpperCase(), 70, yOffset);

    const columns = [
      { header: "Title", dataKey: "title" },
      { header: "Authors", dataKey: "authors" },
      { header: "Department", dataKey: "dept" },
      { header: "Journal", dataKey: "journal" },
      { header: "Vol", dataKey: "vol" },
      { header: "Page No", dataKey: "pageno" },
      { header: "Year", dataKey: "pubYear" },
      { header: "Issn No", dataKey: "issn" },
    ];

    const rows = papers.map((paper) => ({
      title: paper.title,
      authors: `${paper.author1} ${paper.author2}`,
      dept: paper.dept,
      journal: paper.journal,
      issn: paper.issn,
      vol: paper.vol,
      pageno: paper.pageno,
      pubYear: paper.pubYear,
    }));

    doc.autoTable({
      startY: 20,
      head: [columns.map((col) => col.header)],
      body: rows.map((row) => columns.map((col) => row[col.dataKey])),
    });

    doc.save("Journal.pdf");
  };

  const generateExcel = () => {
    const data = papers.map((paper) => ({
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

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(dataBlob, "Journals.xlsx");
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

export default PdfExcel;
