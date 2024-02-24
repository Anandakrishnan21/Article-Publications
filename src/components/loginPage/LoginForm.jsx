"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { Button } from "../ui/button";
import Separator from "../auths/Separator";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/Input";

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
    <div className="w-3/4 flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-7 relative">
        <div>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
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
            className="absolute right-2 top-[55px] cursor-pointer"
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
        <Button>Login</Button>
      </form>
      <Separator url="/register" linkName="Register" />
    </div>
  );
}
