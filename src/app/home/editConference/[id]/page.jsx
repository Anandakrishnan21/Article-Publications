
import EditConferenceForm from "@/components/publicationForms/EditConferenceForm";
import React from "react";

const getPaperById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/addConference/${id}`, {
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

async function ConferenceEditPage({ params }) {
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
    conference,
    month,
    pubYear,
    isbn,
    doi,
  } = paper;
  return (
    <div>
      <EditConferenceForm id={id} title={title} author1={author1} author2={author2} author3={author3} author4={author4}
       author5={author5} dept={dept} conference={conference} month={month} pubYear={pubYear} isbn={isbn} doi={doi} />
    </div>
  );
}

export default ConferenceEditPage;
