import React from "react";
import PdfExcel from "./PdfExcel";
import JournalTableItem from "./JournalTableItem";

function Table({ currentItems, setPapers, papers }) {
  return (
    <div className="TableMainDiv">
      <PdfExcel papers={papers} />
      <div className="TableDiv">
        {currentItems.map((paper, index) => (
          <JournalTableItem key={index} paper={paper} setPapers={setPapers} />
        ))}
      </div>
    </div>
  );
}

export default Table;
