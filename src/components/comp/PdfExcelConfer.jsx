import React from "react";
import { Button } from "../ui/button";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";

function PdfExcelConfer({ currentItems }) {
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

      doc.rect(10, yOffset + 10, doc.internal.pageSize.width - 20, 40);

      doc.setFontSize(10);
      doc.text(`Title: ${paper.title}`.toUpperCase(), 15, yOffset + 15);
      doc.text(
        `Authors: ${paper.author1} ${paper.author2} ${paper.author3} ${paper.author4}`.toUpperCase(),
        15,
        yOffset + 21
      );
      doc.text(`Department: ${paper.dept}`.toUpperCase(), 15, yOffset + 27);
      doc.text(
        `Conference: ${paper.conference}`.toUpperCase(),
        15,
        yOffset + 33
      );
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
