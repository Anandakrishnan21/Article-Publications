"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { depts, months } from "@/utils/constants";

function EditConferenceForm({
  id,
  title,
  author1,
  author2,
  author3,
  author4,
  author5,
  dept,
  journal,
  pubYear,
  month,
  isbn,
  doi,
}) {
  const [newTitle, setNewTitle] = useState(title);
  const [newAuthor1, setNewAuthor1] = useState(author1);
  const [newAuthor2, setNewAuthor2] = useState(author2);
  const [newAuthor3, setNewAuthor3] = useState(author3);
  const [newAuthor4, setNewAuthor4] = useState(author4);
  const [newAuthor5, setNewAuthor5] = useState(author5);
  const [newDept, setNewDept] = useState(dept);
  const [newConference, setNewConference] = useState(journal);
  const [newPubYear, setNewPubYear] = useState(pubYear);
  const [newIsbn, setNewIsbn] = useState(isbn);
  const [newMonth, setNewMonth] = useState(month);
  const [newDoi, setNewDoi] = useState(doi);

  const router = useRouter();

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3000/api/addConference/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            newTitle,
            newAuthor1,
            newAuthor2,
            newAuthor3,
            newAuthor4,
            newAuthor5,
            newDept,
            newConference,
            newDoi,
            newIsbn,
            newMonth
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update the paper");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="box-border flex flex-col justify-center items-center py-10">
      <div
        className="w-5/6 md:w-7/12 flex flex-col justify-center items-center
       bg-neutral-50 dark:bg-neutral-950 border-[1px] border-neutral-200 dark:border-neutral-800 p-5 rounded-lg"
      >
        <div className="my-5 text-center">
          <p className="text-3xl dark:text-neutral-50 font-semibold">
            Publication Form
          </p>
          <p className="text-lg dark:text-neutral-400">
            Update your paper here
          </p>
        </div>
        <form
          onSubmit={onHandleSubmit}
          className="w-10/12 md:w-4/12 lg:w-3/4 flex flex-col gap-6 relative"
        >
          {/* title */}
          <div>
            <label htmlFor="title" className="inputLabel">
              Title of Paper
            </label>
            <input
              required
              onChange={(e) => setNewTitle(e.target.value)}
              value={newTitle}
              type="text"
              id="title"
              placeholder="Enter Title"
              className="inputFields"
            />
          </div>
          {/* author 1&2 */}
          <div className="flex gap-5 justify-between">
            <div className="w-full">
              <label htmlFor="author1" className="inputLabel">
                Author 1
              </label>
              <input
                required
                onChange={(e) => setNewAuthor1(e.target.value)}
                value={newAuthor1}
                type="text"
                id="author1"
                placeholder="Name of Author 1"
                className="inputFields"
              />
            </div>
            <div className="w-full">
              <label htmlFor="author2" className="inputLabel">
                Author 2
              </label>
              <input
                onChange={(e) => setNewAuthor2(e.target.value)}
                value={newAuthor2}
                type="text"
                id="author2"
                placeholder="Name of Author 2"
                className="inputFields"
              />
            </div>
          </div>

          {/* author 3&4 */}
          <div className="flex gap-5 justify-between">
            <div className="w-full">
              <label htmlFor="author3" className="inputLabel">
                Author 3
              </label>
              <input
                onChange={(e) => setNewAuthor3(e.target.value)}
                value={newAuthor3}
                type="text"
                id="author3"
                placeholder="Name of Author 3"
                className="inputFields"
              />
            </div>
            <div className="w-full">
              <label htmlFor="author4" className="inputLabel">
                Author 4
              </label>
              <input
                onChange={(e) => setNewAuthor4(e.target.value)}
                value={newAuthor4}
                type="text"
                id="author4"
                placeholder="Name of Author 4"
                className="inputFields"
              />
            </div>
          </div>

          {/* author 5*/}
          <div className="flex gap-5 justify-between">
            <div className="w-full">
              <label htmlFor="author5" className="inputLabel">
                Author 5
              </label>
              <input
                onChange={(e) => setNewAuthor5(e.target.value)}
                value={newAuthor5}
                type="text"
                id="author5"
                placeholder="Name of Author 5"
                className="inputFields"
              />
            </div>
          </div>

          {/* Department & nameofjournal*/}
          <div className="flex gap-5 justify-between">
            <div className="w-full">
              <label htmlFor="dept" className="inputLabel">
                Department
              </label>
              <select
                required
                onChange={(e) => setNewDept(e.target.value)}
                name="dept"
                id="dept"
                className="inputFields"
              >
                <option value="">Choose department</option>
                {depts.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="journal" className="inputLabel">
                Journal name
              </label>
              <input
                required
                onChange={(e) => setNewConference(e.target.value)}
                value={newConference}
                type="text"
                id="journal"
                placeholder="Name of Journal"
                className="inputFields"
              />
            </div>
          </div>

          {/* month & year*/}
          <div className="flex gap-5 justify-between">
            <div className="w-full">
              <label htmlFor="month" className="inputLabel">
                Month
              </label>
              <select
                required
                onChange={(e) => setNewMonth(e.target.value)}
                name="month"
                id="month"
                className="inputFields"
              >
                <option value="">Choose month</option>
                {months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="pubYear" className="inputLabel">
                Publication year
              </label>
              <input
                required
                onChange={(e) => setNewPubYear(e.target.value)}
                value={newPubYear}
                type="number"
                id="pubYear"
                placeholder="Year of Publication"
                className="inputFields"
              />
            </div>
          </div>

          {/* issn num & volume*/}
          <div className="flex gap-5 justify-between">
            <div className="w-full">
              <label htmlFor="isbn" className="inputLabel">
                ISBN Number
              </label>
              <input
                required
                onChange={(e) => setNewIsbn(e.target.value)}
                value={newIsbn}
                type="text"
                id="isbn"
                // pattern="\d{4}-\d{4}"
                placeholder="ISBN Number"
                className="inputFields"
              />
            </div>
          </div>

          {/* doi */}
          <div className="flex gap-5 justify-between">
            <div className="w-full">
              <label htmlFor="doi" className="inputLabel">
                Digital Object Identifier - DOI
              </label>
              <input
                required
                onChange={(e) => setNewDoi(e.target.value)}
                value={newDoi}
                type="text"
                id="doi"
                placeholder="DOI Website Link"
                className="inputFields"
              />
            </div>
          </div>

          <Button>Edit Paper</Button>
        </form>
      </div>
    </div>
  );
}

export default EditConferenceForm;
