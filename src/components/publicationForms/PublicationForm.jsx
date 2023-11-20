"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

const PublicationForm = () => {
  const [title, setTitle] = useState("");
  const [author1, setAuthor1] = useState("");
  const [author2, setAuthor2] = useState("");
  const [author3, setAuthor3] = useState("");
  const [author4, setAuthor4] = useState("");
  const [author5, setAuthor5] = useState("");
  const [dept, setDept] = useState("");
  const [journal, setJournal] = useState("");
  const [pubYear, setPubyear] = useState(0);
  const [issn, setIssn] = useState("");
  const [vol, setVol] = useState(0);
  const [issue, setIssue] = useState(0);
  const [pageno, setPageno] = useState(0);
  const [doi, setDoi] = useState("");
  const [month, setMonth] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resPubExists = await fetch("/api/publicationExists", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ title, issn }),
      });

      const { paper } = await resPubExists.json();

      if (paper) {
        setError("Paper with same title and ISSN number already exists.");
        return;
      }

      const res = await fetch("/api/addPublication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author1,
          author2,
          author3,
          author4,
          author5,
          dept,
          journal,
          pubYear,
          issn,
          vol,
          issue,
          pageno,
          doi,
          month,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        setSuccess("Form submitted successfully!");
      } else {
        console.log("Paper submission failed.");
        setError("Paper submission failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
      setError("Error during registration ");
    }
  };

  return (
    <div className="box-border flex flex-col justify-center items-center py-10">
      <div className="w-5/6 md:w-7/12 flex flex-col justify-center items-center
       bg-neutral-50 dark:bg-neutral-950 border-[1px] border-neutral-200 dark:border-neutral-800 p-5 rounded-lg">
        <div className="my-5 text-center">
          <p className="text-3xl dark:text-neutral-50 font-semibold">Publication Form</p>
          <p className="text-lg dark:text-neutral-400">Add your paper here</p>
        </div>
        {success && (
          <div className="mb-10">
            <p className=" text-green-700 bg-green-200 w-fit p-2 rounded">
              {success}
            </p>
          </div>
        )}
        {error && (
          <div className="mb-10">
            <p className="text-red-700 bg-red-200 w-fit p-2 rounded">{error}</p>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="w-10/12 md:w-4/12 lg:w-3/4 flex flex-col gap-6 relative"
        >
          {/* title */}
          <div>
            <label htmlFor="title" className="inputLabel">
              Title of Paper
            </label>
            <input
              required
              onChange={(e) => setTitle(e.target.value)}
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
                onChange={(e) => setAuthor1(e.target.value)}
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
                onChange={(e) => setAuthor2(e.target.value)}
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
                onChange={(e) => setAuthor3(e.target.value)}
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
                onChange={(e) => setAuthor4(e.target.value)}
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
                onChange={(e) => setAuthor5(e.target.value)}
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
                onChange={(e) => setDept(e.target.value)}
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
                onChange={(e) => setJournal(e.target.value)}
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
                onChange={(e) => setMonth(e.target.value)}
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
                onChange={(e) => setPubyear(e.target.value)}
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
                onChange={(e) => setIssn(e.target.value)}
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
                onChange={(e) => setVol(e.target.value)}
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
                onChange={(e) => setIssue(e.target.value)}
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
                onChange={(e) => setPageno(e.target.value)}
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
                onChange={(e) => setDoi(e.target.value)}
                type="text"
                id="doi"
                placeholder="DOI Website Link"
                className="inputFields"
              />
            </div>
          </div>

          <Button type="submit">Add Paper</Button>
        </form>
      </div>
    </div>
  );
};

export default PublicationForm;
