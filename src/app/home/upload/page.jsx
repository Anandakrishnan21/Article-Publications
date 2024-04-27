import UploadCard from "@/components/uploadPage/UploadCard";
import React, { Suspense } from "react";
import Loading from "../loading";

function page() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <UploadCard />
      </Suspense>
    </>
  );
}

export default page;
