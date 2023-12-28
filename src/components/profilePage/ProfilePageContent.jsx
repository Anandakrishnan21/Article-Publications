"use client";
import { useSession } from "next-auth/react";
import React from "react";

function ProfilePageContent() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (!session?.user) {
    return <div>Please log in to view this page.</div>;
  }

  const { name, email, password, dept, orcid, scopus, scholar } = session?.user;
  return (
    <div className="box-content h-full flex gap-2 items-center p-6">
      <div className="w-1/3 h-96 border-[1px] border-neutral-900 rounded-sm bg-neutral-50">
        <p>Name: {name}</p>
        <p>Name: {email}</p>
        <p>Name: {password}</p>
        <p>Name: {dept}</p>
        <p>Name: {orcid}</p>
        <p>Name: {scopus}</p>
        <p>Name: {scholar}</p>
      </div>
      <div className="w-2/3 h-96 flex flex-col gap-2">
        <div className="w-full h-1/2 border-[1px] border-neutral-900 bg-neutral-50 rounded-sm"></div>
        <div className="w-full h-1/2 border-[1px] border-neutral-900 bg-neutral-50 rounded-sm"></div>
      </div>
    </div>
  );
}

export default ProfilePageContent;
