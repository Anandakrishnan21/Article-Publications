"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { depts, months } from "@/utils/constants";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "../ui/use-toast";

const PublicationForm = () => {
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [author1, setAuthor1] = useState("");
  const [author2, setAuthor2] = useState("");
  const [author3, setAuthor3] = useState("");
  const [author4, setAuthor4] = useState("");
  const [author5, setAuthor5] = useState("");
  const [dept, setDept] = useState("");
  const [journal, setJournal] = useState("");
  const [pubYear, setPubyear] = useState("");
  const [issn, setIssn] = useState("");
  const [vol, setVol] = useState(0);
  const [issue, setIssue] = useState(0);
  const [pageno, setPageno] = useState(0);
  const [doi, setDoi] = useState("");
  const [month, setMonth] = useState("");

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
        toast({
          title: "Paper already exists!",
          description: "Paper with same title and ISSN number already exists.",
        });
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
        router.push("/home");
        toast({
          variant: "success",
          title: "Form submitted successfully!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Paper submission failed!",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error during registration!",
      });
    }
  };

  const handleYear = (e) => {
    const value = e.target.value;
    if (/^\d{4}$/.test(value) || value === "") {
      setPubyear(value);
    }
  };

  return (
    <div className="FormMainDiv">
      <div className="FormInnerDiv">
        <div className="FormTitleDiv">
          <p className="FormTitle">Publication Form</p>
          <p className="FormSubtitle">Add your paper here</p>
        </div>
        <form onSubmit={handleSubmit} className="FormStyle" autoComplete="off">
          {/* title */}
          <div>
            <Label htmlFor="title">Title of Paper</Label>
            <Input
              required
              onChange={(e) => setTitle(e.target.value)}
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
                onChange={(e) => setAuthor1(e.target.value)}
                type="text"
                id="author1"
                placeholder="Name of Author 1"
                className="inputFields"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="author2">Author 2</Label>
              <Input
                onChange={(e) => setAuthor2(e.target.value)}
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
                onChange={(e) => setAuthor3(e.target.value)}
                type="text"
                id="author3"
                placeholder="Name of Author 3"
                className="inputFields"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="author4">Author 4</Label>
              <Input
                onChange={(e) => setAuthor4(e.target.value)}
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
                onChange={(e) => setAuthor5(e.target.value)}
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
                onValueChange={(value) => setDept(value)}
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
                onChange={(e) => setJournal(e.target.value)}
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
                onValueChange={(value) => setMonth(value)}
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
                onChange={handleYear}
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
                onChange={(e) => setIssn(e.target.value)}
                type="text"
                id="issn"
                placeholder="ISSN Number (eg:1234-7890)"
                className="inputFields"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="vol">Volume</Label>
              <Input
                onChange={(e) => setVol(e.target.value)}
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
                onChange={(e) => setIssue(e.target.value)}
                type="number"
                id="issue"
                placeholder="Issue Number"
                className="inputFields"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="pageno">Page No.</Label>
              <Input
                onChange={(e) => setPageno(e.target.value)}
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
