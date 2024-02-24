"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { Button } from "../ui/button";
import Separator from "../auths/Separator";
import { useToast } from "../ui/use-toast";
import { depts } from "@/utils/constants";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RegisterForm() {
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [dept, setDept] = useState("");
  const [scholar, setScholar] = useState("");
  // const [scopus, setScopus] = useState("");
  // const [orcid, setOrcid] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !dept) {
      toast({
        variant: "destructive",
        title: "All Fields are neccessary.",
        description: "Fill in all required details and try again.",
      });
      return;
    }

    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        toast({
          variant: "destructive",
          title: "User already exists!",
          description:
            "An user with the same email already exist. Try using another email id.",
        });
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          dept,
          scholar,
          // scopus,
          // orcid,
        }),
      });

      if (res.ok) {
        const form = e.target;
        toast({
          variant: "success",
          title: "User registered successfully!",
          description: "Login to continue.",
        });
        form.reset();
        router.push("/");
      } else {
        toast({
          variant: "destructive",
          title: "User registration failed!",
          description: "Login to continue.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error during registration:",
        description: error,
      });
    }
  };

  const toggleVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-3/4 flex flex-col gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 mt-7 relative"
      >
        <div>
          <Input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            className="inputFields"
          />
        </div>
        <div>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="inputFields"
          />
        </div>
        <div>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="inputFields relative"
          />
          <Button
            variant="ghost"
            className="absolute right-3 top-[105px] cursor-pointer"
            onClick={toggleVisibility}
          >
            {showPassword ? (
              <FontAwesomeIcon
                icon={faEye}
                className="text-gray-500 hover:text-gray-700 duration-500"
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className="text-gray-500 hover:text-gray-700 duration-500"
              />
            )}
          </Button>
        </div>
        <div className="flex gap-2">
          <Select
            required
            onValueChange={(value) => setDept(value)}
            name="dept"
            id="dept"
            className="inputFields"
          >
            <SelectTrigger className="inputLabel dark:bg-neutral-900">
              <SelectValue placeholder="Choose month" />
            </SelectTrigger>
            <SelectContent>
              {depts.map((dept, index) => (
                <SelectItem key={index} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            onChange={(e) => setScholar(e.target.value)}
            type="text"
            placeholder="Google Scholar ID"
            className="inputFields"
          />
        </div>
        {/* <div className="flex gap-2">
          <Input
            onChange={(e) => setScopus(e.target.value)}
            type="number"
            placeholder="Scopus ID"
            className="inputFields"
          />
          <Input
            onChange={(e) => setOrcid(e.target.value)}
            type="number"
            placeholder="ORCid ID"
            className="inputFields"
          />
        </div> */}
        <Button>Register</Button>
      </form>
      <Separator url="/" linkName="Login" />
    </div>
  );
}
