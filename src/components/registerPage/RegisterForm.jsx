"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import GoogleButton from "./GoogleButton";
import { Button } from "../ui/button";
import Separator from "../auths/Separator";
// import PhoneInput from "react-phone-number-input";
// import 'react-phone-number-input/style.css'

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [affiliation, setAffiliation] = useState("");
  const [scholar, setScholar] = useState("");
  const [scopus, setScopus] = useState("");
  const [orcid, setOrcid] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !affiliation) {
      setError("All fields are necessary.");
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
        setError("user already exists");
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
          affiliation,
          scholar,
          scopus,
          orcid,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  const toggleVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="AuthForm"
    >
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
          className="inputFields"
        />
        <button
          className="absolute right-2 top-36 cursor-pointer"
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
      <div>
        <input
          onChange={(e) => setScholar(e.target.value)}
          type="text"
          placeholder="Google Scholar ID"
          className="inputFields"
        />
      </div>
      <div>
        <input
          onChange={(e) => setAffiliation(e.target.value)}
          type="text"
          placeholder="Affiliation"
          className="inputFields"
          required
        />
      </div>
      <div>
        <input
          onChange={(e) => setScopus(e.target.value)}
          type="number"
          placeholder="Scopus ID"
          className="inputFields"
        />
      </div>
      <div>
        <input
          onChange={(e) => setOrcid(e.target.value)}
          type="number"
          placeholder="ORCid ID"
          className="inputFields"
        />
      </div>
      <Button>Register</Button>

      {error && (
        <div className="bg-red-200 text-red-700 w-fit text-sm py-1 px-3 rounded mt-2">
          {error}
        </div>
      )}
      <Separator url="/" linkName="Login" />
      <GoogleButton />
    </form>
  );
}
