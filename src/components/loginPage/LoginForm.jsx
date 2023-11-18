"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { Button } from "../ui/button";
import Link from "next/link";
import GoogleButton from "../registerPage/GoogleButton";

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
      className="AuthForm"
    >
      <div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          className="inputFields"  //inputFieds class is defined in globals.css
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
      <Button>Login</Button>
      {error && (
        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
          {error}
        </div>
      )}
      <p className="text-slate-600 text-sm md:text-base leading-normal text-center">
        Don&apos;t have an account ? {""}
        <Link
          href="/register"
          className="blueLink"
        >
          Sign Up
        </Link>
      </p>
      <p className="text-center text-neutral-500">or</p>
      <GoogleButton />
    </form>
  );
}
