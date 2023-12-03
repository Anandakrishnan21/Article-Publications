"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { Button } from "../ui/button";
import GoogleButton from "../registerPage/GoogleButton";
import Separator from "../auths/Separator";
import { useToast } from "../ui/use-toast";

export default function LoginForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      if (res) {
        console.log(res);
      }
      if (res.error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Invalid Credentials.",
          description: "Email or password given is wrong.",
        });
        return;
      }

      router.replace("home");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="AuthForm">
      <div>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
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
          className="absolute right-2 top-[72px] cursor-pointer"
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

      <Separator url="/register" linkName="Register" />
      <GoogleButton />
    </form>
  );
}
