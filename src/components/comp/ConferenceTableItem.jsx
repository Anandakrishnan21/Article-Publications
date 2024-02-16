import Link from "next/link";
import React from "react";
import EditBtn from "./EditBtn";
import ConferenceDeleteBtn from "./ConferenceDeleteBtn";
import { useSession } from "next-auth/react";

const ConferenceTableItem = ({ paper, setPapers }) => {
  const { data: session } = useSession();
  return (
    <div className="cardStyle" key={paper._id}>
      <div className="TableItemDetailsDiv">
        <h1 className="TableItemH1">{paper.title}</h1>
        <div className="TableItemDetailsInnerDiv">
          <p className="TableItemDetailsTitle">
            Authors:
            <span className="TableOtherAuthors">
              {paper.author1} {paper.author2} {paper.author3}
              {paper.author4}
            </span>
          </p>
          {/* dept & journal */}
          <div className="Table-dept-journal">
            <p className="TableItemDetailsTitle">
              Department:
              <span className="TableDetailsSpan">{paper.dept}</span>
            </p>
            <p className="TableItemDetailsTitle">
              Conference:
              <span className="TableDetailsSpan">{paper.conference}</span>
            </p>
          </div>
          {/* issn & vol page year month */}
          <div className="Table-issn-vol">
            <p className="TableItemDetailsTitle">
              Isbn no:
              <span className="TableDetailsSpan">{paper.isbn}</span>
            </p>
            <div className="TableDetails-vol-page-year-month">
              <p className="TableItemDetailsTitle">
                Year:
                <span className="TableDetailsSpan">{paper.pubYear}</span>
              </p>
              <p className="TableItemDetailsTitle">
                Month:
                <span className="TableDetailsSpan">{paper.month}</span>
              </p>
            </div>
          </div>
          {/* doi */}
          <p className="TableItemDetailsTitle">
            DOI:
            <span className="TableDetailsSpan">
              <Link href={paper.doi} target="_blank" className="DOILink">
                click here
              </Link>
            </span>
          </p>
        </div>
      </div>
      {session?.user?.email === paper.email ? (
        <div className="TableCrudButtonsDiv">
          <Link href={`/home/editConference/${paper._id}`} className="w-full">
            <EditBtn />
          </Link>
          <ConferenceDeleteBtn id={paper._id} setPapers={setPapers} />
        </div>
      ) : (
        <div className="TableViewOnlyDiv">
          <p className="TableViewOnlyP">View Access Only</p>
        </div>
      )}
    </div>
  );
};

export default ConferenceTableItem;
