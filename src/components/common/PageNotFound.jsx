import Image from "next/image";
import React from "react";

function PageNotFound({ paper }) {
  return (
    <div className="w-full mt-14 flex flex-col justify-center items-center">
      <Image src="/img/pageNotFound.png" alt="png1" className="" height={400} width={400}/>
      <h1 className="text-xl md:text-3xl text-center font-bold text-neutral-600">Sorry no result found!</h1>
      <p className="text-center">Upload your {paper} papers</p>
    </div>
  );
}

export default PageNotFound;
