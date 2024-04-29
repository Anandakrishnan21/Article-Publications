import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/Input";

function ScholarID({ data }) {
  const info = [
    {
      id: 1,
      label: "Scholar ID",
      input: data.scholar,
    },
    {
      id: 2,
      label: "Scopus ID",
      input: data.scopus,
    },
    {
      id: 3,
      label: "Orcid ID",
      input: data.orcid,
    },
  ];
  return (
    <div className="cardDesign h-3/5 p-2 md:p-4 py-6 gap-4">
      <div className="px-4 lg:px-6">
        <h1 className="text-xl font-semibold">Scholar Identification</h1>
        <p className="text-sm dark:text-neutral-400">
          Your identification information
        </p>
      </div>
      <div className="px-4 lg:px-6 h-2/3 flex flex-col justify-center gap-4">
        {info.map((item) => (
          <div key={item.id} className="flex flex-col gap-1">
            <Label htmlFor={item.label} className="font-semibold">
              {item.label}
            </Label>
            <Input
              id={item.label}
              className="inputFields cursor-pointer"
              value={item.input}
              readOnly
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScholarID;
