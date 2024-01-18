"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { depts } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";

export async function ProfileUpdate({ user ,id}) {
  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newDept, setNewDept] = useState(user.dept);
  const [newImgUrl, setNewImgUrl] = useState(user.imgUrl);
  const [newScholar, setNewScholar] = useState(user.scholar);
  const [newScopus, setNewScopus] = useState(user.scopus);
  const [newOrcid, setNewOrcid] = useState(user.orcid);

  const router = useRouter();

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
          newImgUrl: newImgUrl,
          newScholar,
          newScopus,
          newOrcid,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update the paper");
      }
      router.refresh();
      router.push("/home/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="iconBtn">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="w-10/12 md:w-1/3 rounded-sm">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form  onSubmit={onHandleSubmit} className="grid gap-2">
          <div>
            <label htmlFor="name" className="inputLabel">
              Full Name
            </label>
            <input
              onChange={(e) => setNewName(e.target.value)}
              value={newName}
              className="inputFields"
            />
          </div>
          <div>
            <label htmlFor="email" className="inputLabel">
              Email
            </label>
            <input
              onChange={(e) => setNewEmail(e.target.value)}
              value={newEmail}
              className="inputFields"
            />
          </div>
          <div>
            <label htmlFor="img" className="inputLabel">
              Profile Image
            </label>
            <input
              type="file"
              onChange={(e) => setNewImgUrl(e.target.value)}
              value={newImgUrl}
              className="inputFields"
            />
          </div>
          <div className="flex gap-2">
            <div>
              <label htmlFor="dept" className="inputLabel">
                Department
              </label>
              {/* <select
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
              </select> */}
              <input
                onChange={(e) => setNewDept(e.target.value)}
                value={newDept}
                className="inputFields"
              />
            </div>
            <div>
              <label htmlFor="scholar" className="inputLabel">
                Scholar ID
              </label>
              <input
                onChange={(e) => setNewScholar(e.target.value)}
                value={newScholar}
                className="inputFields"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <label htmlFor="scopus" className="inputLabel">
                Scopus
              </label>
              <input
                type="number"
                onChange={(e) => setNewScopus(e.target.value)}
                value={newScopus}
                className="inputFields"
              />
            </div>
            <div>
              <label htmlFor="orcid" className="inputLabel">
                Orcid
              </label>
              <input
                type="number"
                onChange={(e) => setNewOrcid(e.target.value)}
                value={newOrcid}
                className="inputFields"
              />
            </div>
          </div>
            <Button type="submit" variant="downBtn">
              Save changes
            </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}