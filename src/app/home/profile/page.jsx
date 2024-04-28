import ProfilePageContent from "@/components/profilePage/ProfilePageContent";
import React, { Suspense } from "react";
import Loading from "../loading";

async function ProfilePage() {
  return (
    <div className="box-border flex justify-center items-center">
      <Suspense fallback={<Loading />}>
        <ProfilePageContent />
      </Suspense>
    </div>
  );
}

export default ProfilePage;
