"use client"
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function EditJournalForm({ id, title, author1 }) {
    const [newTitle, setNewTitle] = useState(title);
    const [newAuthor1, setNewAuthor1] = useState(author1);
    const router = useRouter();

    const onHandleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const res = await fetch(`http://localhost:3000/api/addPublication/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({newTitle, newAuthor1}),
            })

            if(!res.ok){
                throw new Error("Failed to update the paper");
            }

            router.refresh();
            router.push("/");

        }catch(error){
            console.log(error);
        }
    }

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
          <p className="text-lg dark:text-neutral-400">Update your paper here</p>
        </div>
        <form onSubmit={onHandleSubmit} className="w-10/12 md:w-4/12 lg:w-3/4 flex flex-col gap-6 relative">
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
                // onChange={(e) => setAuthor2(e.target.value)}
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
                // onChange={(e) => setAuthor3(e.target.value)}
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
                // onChange={(e) => setAuthor4(e.target.value)}
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
                // onChange={(e) => setAuthor5(e.target.value)}
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
                // onChange={(e) => setDept(e.target.value)}
                name="dept"
                id="dept"
                className="inputFields"
              >
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="journal" className="inputLabel">
                Journal name
              </label>
              <input
                required
                // onChange={(e) => setJournal(e.target.value)}
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
                // onChange={(e) => setMonth(e.target.value)}
                name="month"
                id="month"
                className="inputFields"
              >
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="pubYear" className="inputLabel">
                Publication year
              </label>
              <input
                required
                // onChange={(e) => setPubyear(e.target.value)}
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
              <label htmlFor="issn" className="inputLabel">
                ISSN Number
              </label>
              <input
                required
                // onChange={(e) => setIssn(e.target.value)}
                type="text"
                id="issn"
                pattern="\d{4}-\d{4}"
                placeholder="ISSN Number (eg:1234-7890)"
                className="inputFields"
              />
            </div>
            <div className="w-full">
              <label htmlFor="vol" className="inputLabel">
                Volume
              </label>
              <input
                // onChange={(e) => setVol(e.target.value)}
                type="number"
                id="vol"
                placeholder="Volume Number"
                className="inputFields"
              />
            </div>
          </div>

          {/* issue num & page*/}
          <div className="flex gap-5 justify-between">
            <div className="w-full">
              <label htmlFor="issue" className="inputLabel">
                Issue
              </label>
              <input
                // onChange={(e) => setIssue(e.target.value)}
                type="number"
                id="issue"
                placeholder="Issue Number"
                className="inputFields"
              />
            </div>
            <div className="w-full">
              <label htmlFor="pageno" className="inputLabel">
                Page No.
              </label>
              <input
                // onChange={(e) => setPageno(e.target.value)}
                type="text"
                id="pageno"
                placeholder="Page Numbers (eg: 34-99)"
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
                // onChange={(e) => setDoi(e.target.value)}
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

export default EditJournalForm;
