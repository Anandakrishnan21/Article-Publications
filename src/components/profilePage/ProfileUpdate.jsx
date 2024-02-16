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
import { MdOutlineEdit } from "react-icons/md";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export async function ProfileUpdate({ user, id }) {
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
        <Button className="flex items-center gap-3 px-4">
          Edit Profile
          <MdOutlineEdit className="h-5 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-10/12 md:w-1/2">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onHandleSubmit} className="grid gap-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              onChange={(e) => setNewName(e.target.value)}
              defaultValue={newName}
              className="inputFields"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              onChange={(e) => setNewEmail(e.target.value)}
              value={newEmail}
              className="inputFields"
            />
          </div>
          <div>
            <Label htmlFor="img">Profile Image</Label>
            <Input
              type="file"
              onChange={(e) => setNewImgUrl(e.target.value)}
              value={newImgUrl}
              className="inputFields"
            />
          </div>
          <div className="flex gap-3">
            <div className="w-full">
              <Label htmlFor="dept">Department</Label>

              {/* <Select
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
              </Select> */}

              <Input
                onChange={(e) => setNewDept(e.target.value)}
                value={newDept}
                className="inputFields"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="scholar">Scholar ID</Label>
              <Input
                onChange={(e) => setNewScholar(e.target.value)}
                value={newScholar}
                className="inputFields"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-full">
              <Label htmlFor="scopus">Scopus</Label>
              <Input
                type="number"
                onChange={(e) => setNewScopus(e.target.value)}
                value={newScopus}
                className="inputFields"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="orcid">Orcid</Label>
              <Input
                type="number"
                onChange={(e) => setNewOrcid(e.target.value)}
                value={newOrcid}
                className="inputFields"
              />
            </div>
          </div>
          <Button type="submit" className="mt-3">
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
