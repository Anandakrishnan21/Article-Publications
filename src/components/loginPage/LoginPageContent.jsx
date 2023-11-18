import React from "react";
import LoginForm from "./LoginForm";
import AuthPageTitle from "../auths/AuthPageTitle";

function LoginPageContent() {
  return (
    <div className="font-custom flex flex-col justify-center items-center gap-6 text-center mt-10 mb-10">
      <AuthPageTitle title="Sign in" />
      <LoginForm />
    </div>
  );
}

export default LoginPageContent;
