"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-10/12 md:w-4/12 lg:w-3/12 flex flex-col gap-6 relative"
    >
      <div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          className="w-full border-2 border-gray-200 hover:border-gray-500 duration-500 p-2 rounded"
        />
      </div>
      <div>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full border-2 border-gray-200 hover:border-gray-500 duration-500 p-2 rounded"
        />
        <button
          className="absolute right-2 top-20 cursor-pointer"
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
      <button className="w-full bg-slate-900 rounded text-white hover:bg-slate-800 duration-500 p-2">
        Login
      </button>
      {error && (
        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
          {error}
        </div>
      )}
    </form>
  );
}
