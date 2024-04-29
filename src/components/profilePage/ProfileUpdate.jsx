import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import ImageUpload from "./ImageUpload";
import { depts } from "@/utils/constants";

export function ProfileUpdate({ user, id }) {
  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newDept, setNewDept] = useState(user.dept);
  const [newScholar, setNewScholar] = useState(user.scholar);
  const [newScopus, setNewScopus] = useState(user.scopus);
  const [newOrcid, setNewOrcid] = useState(user.orcid);

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/register/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newName,
          newDept,
          newEmail,
          newScholar,
          newScopus,
          newOrcid,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update the paper");
      }
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="editBtn" className="p-2">
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="w-10/12 md:w-1/2 rounded-lg">
        <DialogHeader>
          <DialogTitle>Update your Profile</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={onHandleSubmit}
          className="grid gap-4"
          autoComplete="on"
        >
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              onChange={(e) => setNewName(e.target.value)}
              defaultValue={newName}
              className="inputFields"
              placeholder="Full Name"
              autoComplete="name"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              onChange={(e) => setNewEmail(e.target.value)}
              value={newEmail}
              className="inputFields"
              placeholder="Email"
              autoComplete="email"
            />
          </div>
          <div className="flex gap-3">
            <div className="w-full">
              <Label htmlFor="dept">Department</Label>
              <Select
                id="dept"
                onValueChange={(value) => setNewDept(value)}
                className="inputFields"
              >
                <SelectTrigger className="inputLabel dark:bg-neutral-900">
                  <SelectValue placeholder={newDept} />
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
              <Label htmlFor="scholar">Scholar ID</Label>
              <Input
                id="scholar"
                onChange={(e) => setNewScholar(e.target.value)}
                value={newScholar}
                className="inputFields"
                placeholder="Scholar ID"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-full">
              <Label htmlFor="scopus">Scopus ID</Label>
              <Input
                id="scopus"
                type="number"
                onChange={(e) => setNewScopus(e.target.value)}
                value={newScopus}
                className="inputFields"
                placeholder="Scopus ID"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="orcid">Orcid ID</Label>
              <Input
                id="orcid"
                type="number"
                onChange={(e) => setNewOrcid(e.target.value)}
                value={newOrcid}
                className="inputFields"
                placeholder="Orcid ID"
              />
            </div>
          </div>
          <ImageUpload id={id} />
          <Button type="submit" className="mt-3">
            Update
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
