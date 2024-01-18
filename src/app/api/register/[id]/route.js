import User from "@/models/User";
import { connection } from "@/utils/db";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  const { id } = params;
  const {
    newName: name,
    newDept: dept,
    newEmail: email,
    newScholar: scholar,
    newImageUrl: imgUrl,
    newScopus: scopus,
    newOrcid: orcid,
  } = await req.json();
  await connection();
  await User.findByIdAndUpdate(id, {
    name,
    dept,
    email,
    imgUrl,
    scholar,
    scopus,
    orcid,
  });
  return NextResponse.json({ message: "User Updated" }, { status: 200 });
};

export const GET = async (req, { params }) => {
  const { id } = params;
  await connection();
  const user = await User.findOne({ _id: id });
  return NextResponse.json({ user }, { status: 200 });
};
