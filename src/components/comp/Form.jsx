import { tableHeader } from "@/utils/constants";
import React from "react";
import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";
import { useSession } from "next-auth/react";
import Link from "next/link";

function Form({ currentItems, setPapers }) {
  const { data: session } = useSession();
  return (
    <div className="w-11/12 bg-neutral-50 dark:bg-neutral-950 border-[1px] border-neutral-200 dark:border-neutral-800 p-4 rounded overflow-auto">
      <table className="w-full">
        <thead>
          <tr>
            {tableHeader.map((header) => (
              <th key={header.id} className="dark:text-neutral-400 text-sm">
                {header.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="w-full dark:text-neutral-400 bg-neutral-200 dark:bg-neutral-900 text-sm tracking-wide leading-6 rounded">
          {currentItems.map((paper) => (
            <tr key={paper._id}>
              <td className="p-3 px-8">{paper.title}</td>
              <td className="p-3 px-8">{paper.author1}</td>
              <td className="p-3 px-8">{paper.dept}</td>
              <td className="p-3 px-8">{paper.journal}</td>
              <td className="p-3 px-8">{paper.pubYear}</td>
              <td className="p-3 px-8">{paper.issn}</td>
              <td className="p-3 px-8">{paper.vol}</td>
              <td className="p-3 px-8">{paper.pageno}</td>
              <td className="p-3 px-8">{paper.doi}</td>
              {session?.user?.email === paper.email ? (
                <td className="p-3 px-5 flex gap-2">
                  <DeleteBtn id={paper._id} setPapers={setPapers} />
                  <Link href={`home/editJournal/${paper._id}`}>
                    <EditBtn />
                  </Link>
                </td>
              ) : (
                <td></td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Form;
