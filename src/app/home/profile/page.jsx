import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfilePageContent from "@/components/profilePage/ProfilePageContent";
import { getServerSession } from "next-auth";
import React from "react";

async function ProfilePage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="box-border h-screen">
      <ProfilePageContent session={session} />
    </div>
  );
}

export default ProfilePage;
