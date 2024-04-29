import React from "react";
import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";
import Link from "next/link";
import { useSession } from "next-auth/react";

const JournalTableItem = ({ paper, setPapers }) => {
  const { data: session } = useSession();

  const truncateTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 8) {
      return words.slice(0, 8).join(" ") + "...";
    }
    return title;
  };

  return (
    <div className="cardStyle" key={paper._id}>
      {/* details */}
      <div className="TableItemDetailsDiv">
        <h1 className="TableItemH1 hidden md:flex">{paper.title}</h1>
        <h1 className="TableItemH1 flex md:hidden">
          {truncateTitle(paper.title)}
        </h1>
        <div className="TableItemDetailsInnerDiv">
          <p className="TableItemDetailsTitle">
            Authors:&nbsp;
            <span className="TableDetailsSpan">
              {paper.author1} {paper.author2} {paper.author3} {paper.author4}
            </span>
          </p>
          {/* dept & journal */}
          <div className="Table-dept-journal">
            <p className="TableItemDetailsTitle">
              Department: <span className="TableDetailsSpan">{paper.dept}</span>
            </p>
            <p className="TableItemDetailsTitle">
              Journal: <span className="TableDetailsSpan">{paper.journal}</span>
            </p>
          </div>
          {/* issn & vol page year month */}
          <div className="Table-issn-vol">
            {paper.issn ? (
              <p className="TableItemDetailsTitle">
                Issn no: <span className="TableDetailsSpan">{paper.issn}</span>
              </p>
            ) : null}
            <div className="TableDetails-vol-page-year-month">
              {paper.vol ? (
                <p className="TableItemDetailsTitle">
                  Vol: <span className="TableDetailsSpan">{paper.vol}</span>
                </p>
              ) : null}
              {paper.pageno ? (
                <p className="TableItemDetailsTitle">
                  page no:
                  <span className="TableDetailsSpan">{paper.pageno}</span>
                </p>
              ) : null}

              <p className="TableItemDetailsTitle">
                Year: <span className="TableDetailsSpan">{paper.pubYear}</span>
              </p>
              {paper.month ? (
                <p className="TableItemDetailsTitle">
                  Month: <span className="TableDetailsSpan">{paper.month}</span>
                </p>
              ) : null}
            </div>
          </div>
          {/* doi */}
          <p className="TableItemDetailsTitle">
            DOI:
            <span className="TableDetailsSpan">
              <Link href={paper.doi} target="_blank" className="DOILink">
                <span className="hidden">{paper.doi}</span>Click Here
              </Link>
            </span>
          </p>
        </div>
      </div>
      {/* buttons */}
      {session?.user?.email === paper.email ? (
        <div className="TableCrudButtonsDiv">
          <Link href={`/home/editJournal/${paper._id}`} className="w-full">
            <EditBtn />
          </Link>
          <DeleteBtn id={paper._id} setPapers={setPapers} />
        </div>
      ) : (
        <div className="TableViewOnlyDiv">
          <p className="TableViewOnlyP">View Access Only</p>
        </div>
      )}
    </div>
  );
};

export default JournalTableItem;
