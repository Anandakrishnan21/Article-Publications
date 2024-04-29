"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { depts, months } from "@/utils/constants";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ConferenceForm = () => {
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [author1, setAuthor1] = useState("");
  const [author2, setAuthor2] = useState("");
  const [author3, setAuthor3] = useState("");
  const [author4, setAuthor4] = useState("");
  const [author5, setAuthor5] = useState("");
  const [dept, setDept] = useState("");
  const [conference, setConference] = useState("");
  const [pubYear, setPubyear] = useState("");
  const [isbn, setIsbn] = useState("");
  const [doi, setDoi] = useState("");
  const [month, setMonth] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resConExists = await fetch("/api/conferenceExists", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ title, isbn }),
      });

      const { conPaper } = await resConExists.json();

      if (conPaper) {
        toast({
          title: "Paper already exists!",
          description: "Paper with same title and ISBN number already exists.",
        });
        return;
      }

      const res = await fetch("/api/addConference", {
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
          conference,
          pubYear,
          isbn,
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
          <p className="FormTitle">Conference Form</p>
          <p className="FormSubtitle">Add your conference here</p>
        </div>

        <form onSubmit={handleSubmit} className="FormStyle" autoComplete="off">
          {/* title */}
          <div>
            <Label htmlFor="title">Title of Paper</Label>
            <Input
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter Title"
              className="inputFields"
              required
            />
          </div>
          {/* author 1&2 */}
          <div className="inputsDiv">
            <div className="w-full">
              <Label htmlFor="author1">Author 1</Label>
              <Input
                id="author1"
                onChange={(e) => setAuthor1(e.target.value)}
                type="text"
                placeholder="Name of Author 1"
                className="inputFields"
                required
              />
            </div>
            <div className="w-full">
              <Label htmlFor="author2">Author 2</Label>
              <Input
                id="author2"
                onChange={(e) => setAuthor2(e.target.value)}
                type="text"
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
                id="author3"
                onChange={(e) => setAuthor3(e.target.value)}
                type="text"
                placeholder="Name of Author 3"
                className="inputFields"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="author4">Author 4</Label>
              <Input
                id="author4"
                onChange={(e) => setAuthor4(e.target.value)}
                type="text"
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
                id="author5"
                onChange={(e) => setAuthor5(e.target.value)}
                type="text"
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
                id="dept"
                name="dept"
                onValueChange={(value) => setDept(value)}
                className="inputFields"
                required
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
              <Label htmlFor="conference">Conference Name</Label>
              <Input
                id="conference"
                onChange={(e) => setConference(e.target.value)}
                type="text"
                placeholder="Name of the Conference"
                className="inputFields"
                required
              />
            </div>
          </div>

          {/* month & year*/}
          <div className="inputsDiv">
            <div className="w-full">
              <Label htmlFor="month">Month</Label>

              <Select
                id="month"
                name="month"
                onValueChange={(value) => setMonth(value)}
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
                id="pubYear"
                onChange={handleYear}
                type="number"
                placeholder="Year of Publication"
                className="inputFields"
                required
              />
            </div>
          </div>

          {/* issn num & volume*/}
          <div className="inputsDiv">
            <div className="w-full">
              <Label htmlFor="isbn">ISBN Number</Label>
              <Input
                id="isbn"
                onChange={(e) => setIsbn(e.target.value)}
                type="text"
                // pattern="^[\d*\-]{10}|[\d*\-]{13}$"
                placeholder="ISBN Number (eg:1-23456-78)"
                className="inputFields"
              />
            </div>
          </div>

          {/* doi */}
          <div className="inputsDiv">
            <div className="w-full">
              <Label htmlFor="doi">Digital Object Identifier - DOI</Label>
              <Input
                id="doi"
                onChange={(e) => setDoi(e.target.value)}
                type="text"
                placeholder="DOI Website Link"
                className="inputFields"
                required
              />
            </div>
          </div>

          <Button type="submit">Add Paper</Button>
        </form>
      </div>
    </div>
  );
};

export default ConferenceForm;
