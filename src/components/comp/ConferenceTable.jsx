import React from "react";
import PdfExcelConfer from "./PdfExcelConfer";
import ConferenceTableItem from "./ConferenceTableItem";

function ConferenceTable({ currentItems, setPapers }) {
  return (
    <div className="TableMainDiv">
      <PdfExcelConfer currentItems={currentItems} />
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
