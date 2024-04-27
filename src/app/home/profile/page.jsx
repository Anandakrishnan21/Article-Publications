import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfilePageContent from "@/components/profilePage/ProfilePageContent";
import { getServerSession } from "next-auth";
import React, { Suspense } from "react";
import Loading from "../loading";

async function ProfilePage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="box-border h-screen">
      <Suspense fallback={<Loading />}>
        <ProfilePageContent session={session} />
      </Suspense>
    </div>
  );
}

export default ProfilePage;
