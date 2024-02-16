"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { depts, months } from "@/utils/constants";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
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
  const [pubYear, setPubyear] = useState(0);
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

  return (
    <div className="FormMainDiv">
      <div className="FormInnerDiv">
        <div className="FormTitleDiv">
          <p className="FormTitle">Conference Form</p>
          <p className="FormSubtitle">Add your conference here</p>
        </div>

        <form onSubmit={handleSubmit} className="FormStyle">
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
              <Label htmlFor="conference">Conference Name</Label>
              <Input
                required
                onChange={(e) => setConference(e.target.value)}
                type="text"
                id="conference"
                placeholder="Name of the Conference"
                className="inputFields"
              />
            </div>
          </div>

          {/* month & year*/}
          <div className="inputsDiv">
            <div className="w-full">
              <Label htmlFor="month">Month</Label>

              <Select
                required
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
                onChange={(e) => setPubyear(e.target.value)}
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
              <Label htmlFor="isbn">ISBN Number</Label>
              <Input
                required
                onChange={(e) => setIsbn(e.target.value)}
                type="text"
                id="isbn"
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

export default ConferenceForm;
