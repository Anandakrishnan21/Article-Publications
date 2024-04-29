"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { depts, months } from "@/utils/constants";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function EditJournalForm({
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
  issn,
  issue,
  vol,
  pageno,
  doi,
}) {
  const { toast } = useToast();

  const [newTitle, setNewTitle] = useState(title);
  const [newAuthor1, setNewAuthor1] = useState(author1);
  const [newAuthor2, setNewAuthor2] = useState(author2);
  const [newAuthor3, setNewAuthor3] = useState(author3);
  const [newAuthor4, setNewAuthor4] = useState(author4);
  const [newAuthor5, setNewAuthor5] = useState(author5);
  const [newDept, setNewDept] = useState(dept);
  const [newJournal, setNewJournal] = useState(journal);
  const [newPubYear, setNewPubYear] = useState(pubYear);
  const [newIssn, setNewIssn] = useState(issn);
  const [newIssue, setNewIssue] = useState(issue);
  const [newMonth, setNewMonth] = useState(month);
  const [newVol, setNewVol] = useState(vol);
  const [newPageno, setNewPageno] = useState(pageno);
  const [newDoi, setNewDoi] = useState(doi);

  const router = useRouter();

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://particles-omega-two.vercel.app/api/addPublication/${id}`,
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
            newJournal,
            newDoi,
            newIssn,
            newIssue,
            newPubYear,
            newPageno,
            newMonth,
          }),
        }
      );

      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Failed to update the paper!",
        });
        throw new Error("Failed to update the paper");
      }

      router.refresh();
      toast({
        variant: "success",
        title: "Form updated successfully!",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="FormMainDiv">
      <div className="FormInnerDiv">
        <div className="FormTitleDiv">
          <p className="FormTitle">Publication Form</p>
          <p className="FormSubtitle">Update your paper here</p>
        </div>
        <form onSubmit={onHandleSubmit} className="FormStyle" autoComplete="off">
          {/* title */}
          <div>
            <Label htmlFor="title">Title of Paper</Label>
            <Input
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
          <div className="inputsDiv">
            <div className="w-full">
              <Label htmlFor="author1">Author 1</Label>
              <Input
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
              <Label htmlFor="author2">Author 2</Label>
              <Input
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
          <div className="inputsDiv">
            <div className="w-full">
              <Label htmlFor="author3">Author 3</Label>
              <Input
                onChange={(e) => setNewAuthor3(e.target.value)}
                value={newAuthor3}
                type="text"
                id="author3"
                placeholder="Name of Author 3"
                className="inputFields"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="author4">Author 4</Label>
              <Input
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
          <div className="inputsDiv">
            <div className="w-full">
              <Label htmlFor="author5">Author 5</Label>
              <Input
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
          <div className="inputsDiv">
            <div className="w-full">
              <Label htmlFor="dept">Department</Label>
              <Select
                required
                onValueChange={(value) => setNewDept(value)}
                name="dept"
                id="dept"
                className="inputFields"
              >
                <SelectTrigger className="inputLabel dark:bg-neutral-900">
                  <SelectValue placeholder="Choose department" />
                </SelectTrigger>
                <SelectContent>
                  {depts.map((dept, index) => (
                    <SelectItem key={index} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <Label htmlFor="journal">Journal name</Label>
              <Input
                required
                onChange={(e) => setNewJournal(e.target.value)}
                value={newJournal}
                type="text"
                id="journal"
                placeholder="Name of Journal"
                className="inputFields"
              />
            </div>
          </div>

          {/* month & year*/}
          <div className="inputsDiv">
            <div className="w-full">
              <Label htmlFor="month">Month</Label>
              <Select
                onValueChange={(value) => setNewMonth(value)}
                name="month"
                id="month"
                className="inputFields"
              >
                <SelectTrigger className="inputLabel dark:bg-neutral-900">
                  <SelectValue placeholder="Choose month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month, index) => (
                    <SelectItem key={index} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <Label htmlFor="pubYear">Publication year</Label>
              <Input
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
          <div className="inputsDiv">
            <div className="w-full">
              <Label htmlFor="issn">ISSN Number</Label>
              <Input
                onChange={(e) => setNewIssn(e.target.value)}
                value={newIssn}
                type="text"
                id="issn"
                placeholder="ISSN Number (eg:1234-7890)"
                className="inputFields"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="vol">Volume</Label>
              <Input
                onChange={(e) => setNewVol(e.target.value)}
                value={newVol}
                type="number"
                id="vol"
                placeholder="Volume Number"
                className="inputFields"
              />
            </div>
          </div>

          {/* issue num & page*/}
          <div className="inputsDiv">
            <div className="w-full">
              <Label htmlFor="issue">Issue</Label>
              <Input
                onChange={(e) => setNewIssue(e.target.value)}
                value={newIssue}
                type="number"
                id="issue"
                placeholder="Issue Number"
                className="inputFields"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="pageno">Page No.</Label>
              <Input
                onChange={(e) => setNewPageno(e.target.value)}
                value={newPageno}
                type="text"
                id="pageno"
                placeholder="Page Numbers (eg: 34-99)"
                className="inputFields"
              />
            </div>
          </div>

          {/* doi */}
          <div className="inputsDiv">
            <div className="w-full">
              <Label htmlFor="doi">Digital Object Identifier - DOI</Label>
              <Input
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

export default EditJournalForm;
