import React from "react";
import RegisterForm from "./RegisterForm";
import AuthPageTitle from "../auths/AuthPageTitle";

function RegistrationPageContent() {
  return (
    <div className="font-custom flex flex-col justify-center items-center gap-6 text-center mt-5 mb-10">
      <AuthPageTitle title="Sign Up" />
      <RegisterForm />
    </div>
  );
}

export default RegistrationPageContent;
