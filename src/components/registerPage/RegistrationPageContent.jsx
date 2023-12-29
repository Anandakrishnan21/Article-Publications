import React from "react";
import RegisterForm from "./RegisterForm";
import AuthPageTitle from "../auths/AuthPageTitle";
import TextAnimation from "../animation/TextAnimation";

function RegistrationPageContent() {
  return (
    <div className="authPage">
    <div className="flex w-3/4 h-3/4 rounded-xl bg-neutral-50">
      <div className="w-1/2 rounded-xl flex flex-col justify-center items-center gap-2">
        <AuthPageTitle />
        <RegisterForm />
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

export default RegistrationPageContent;
