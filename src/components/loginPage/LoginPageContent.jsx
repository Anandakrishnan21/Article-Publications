import React from "react";
import LoginForm from "./LoginForm";
import AuthPageTitle from "../auths/AuthPageTitle";
import TextAnimation from "../animation/TextAnimation";

function LoginPageContent() {
  return (
    <div className="authPage">
      <div className="flex w-3/4 h-3/4 rounded-xl bg-neutral-50">
        <div className="w-1/2 rounded-xl flex flex-col justify-center items-center gap-2">
          <AuthPageTitle />
          <LoginForm />
        </div>
        <div className="cardRight">
          <div className="innerCard">
            <TextAnimation text="A publication is not just ink on paper; it's a testament to collective intelligence and progress." />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPageContent;
