import Image from "next/image";
import React from "react";
import { Input } from "../ui/Input";
import { Label } from "../ui/label";
import { ProfileUpdate } from "./ProfileUpdate";

function CardProfile({ data, user }) {
  const info = [
    {
      id: 1,
      label: "Full Name",
      input: data.name,
    },
    {
      id: 2,
      label: "Email",
      input: data.email,
    },
    {
      id: 3,
      label: "Department",
      input: data.dept,
    },
  ];
  return (
    <div className="cardDesign w-full items-center lg:w-1/3 h-[90%] p-2 gap-4">
      <div className="colorDiv">
        <Image
          className="w-20 h-20 lg:w-24 lg:h-24 rounded-full p-1 bg-white"
          src={data?.imgUrl ? data.imgUrl : "/img/avatar.png"}
          width={100}
          height={100}
          alt="profile picture"
        />
      </div>
      <div className="w-11/12 lg:h-3/4 flex flex-col gap-4">
        <div className="lg:h-1/5">
          <h1 className="text-xl font-semibold">Personal Information</h1>
          <p className="text-sm font-light dark:text-neutral-400">
            Information you provided are listed here
          </p>
        </div>
        <div className="lg:h-3/5 flex flex-col justify-center gap-4">
          {info.map((item) => (
            <div className="flex flex-col gap-1">
              <Label className="font-semibold">{item.label}</Label>
              <Input
                className="inputFields cursor-pointer"
                value={item.input}
                readOnly
              />
            </div>
          ))}
          <ProfileUpdate user={user} id={data._id} />
        </div>
      </div>
    </div>
  );
}

export default CardProfile;
