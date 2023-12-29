"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { Button } from "../ui/button";
import Separator from "../auths/Separator";
import { useToast } from "../ui/use-toast";
import { depts } from "@/utils/constants";

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
    <>
      <form onSubmit={handleSubmit} className="AuthForm">
        <div>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            className="inputFields"
          />
        </div>
        <div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="inputFields"
          />
        </div>
        <div>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="relative inputFields"
          />
          <button
            className="absolute right-2 top-[110px] cursor-pointer"
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
          </button>
        </div>
        <div className="flex gap-2">
          <select
            required
            onChange={(e) => setDept(e.target.value)}
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
          </select>
          <input
            onChange={(e) => setScholar(e.target.value)}
            type="text"
            placeholder="Google Scholar ID"
            className="inputFields"
          />
        </div>
        {/* <div className="flex gap-2">
          <input
            onChange={(e) => setScopus(e.target.value)}
            type="number"
            placeholder="Scopus ID"
            className="inputFields"
          />
          <input
            onChange={(e) => setOrcid(e.target.value)}
            type="number"
            placeholder="ORCid ID"
            className="inputFields"
          />
        </div> */}
        <Button>Register</Button>
        <Separator url="/" linkName="Login" />
      </form>
    </>
  );
}
