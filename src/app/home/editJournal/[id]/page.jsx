import EditJournalForm from "@/components/publicationForms/EditJournalForm";
import React from "react";

const getPaperById = async (id) => {
  try {
    const res = await fetch(`https://particles-omega-two.vercel.app/api/addPublication/${id}`, {
      catch: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch Paper");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

async function EditPage({ params }) {
  const { id } = params;
  const { paper } = await getPaperById(id);
  const {
    title,
    author1,
    author2,
    author3,
    author4,
    author5,
    dept,
    journal,
    month,
    pubYear,
    issn,
    vol,
    issue,
    pageno,
    doi,
  } = paper;
  return (
    <div>
      <EditJournalForm id={id} title={title} author1={author1} author2={author2} author3={author3} author4={author4}
       author5={author5} dept={dept} journal={journal} month={month} pubYear={pubYear} issn={issn} vol={vol} issue={issue} 
       pageno={pageno} doi={doi} />
    </div>
  );
}

export default EditPage;
