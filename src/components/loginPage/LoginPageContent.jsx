import React from "react";
import LoginForm from "./LoginForm";
import AuthPageTitle from "../auths/AuthPageTitle";
import TextAnimation from "../animation/TextAnimation";

function LoginPageContent() {
  return (
    <div className="authPage">
      <div className="AuthPageDiv">
        <div className="AuthFormDiv">
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
