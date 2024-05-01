import React from "react";
import PdfExcelConfer from "../pdfExcel/PdfExcelConfer";
import ConferenceTableItem from "./ConferenceTableItem";

function ConferenceTable({ currentItems, setPapers, papers }) {
  return (
    <div className="TableMainDiv">
      <PdfExcelConfer papers={papers} />
      <div className="TableDiv">
        {currentItems.map((paper, index) => (
          <ConferenceTableItem
            key={index}
            paper={paper}
            setPapers={setPapers}
          />
        ))}
      </div>
    </div>
  );
}

export default ConferenceTable;
