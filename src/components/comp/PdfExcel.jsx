import React from "react";
import jsPDF from "jspdf";
import { Button } from "../ui/button";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function PdfExcel({ currentItems}) {

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
      if (paper.doi) {
        doc.textWithLink(`Doi: ${paper.doi}`.toUpperCase(), 15, yOffset + 39, {
          url: paper.doi,
        });
      } else {
        doc.text("DOI Not Available", 15, yOffset + 39);
      }

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
    <div className="flex flex-col justify-end md:flex-row gap-2">
      <Button variant="downBtn" onClick={generatePDF} className="flex-start">
        Convert to pdf
      </Button>
      <Button variant="downBtn" onClick={generateExcel}>
        Download Excel
      </Button>
    </div>
  );
}

export default PdfExcel;
