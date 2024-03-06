// updateImage.js
import User from "@/models/User";
import { NextResponse } from "next/server";
import { connection } from "@/utils/db";

export const PUT = async (req, { params }) => {
  try {
    const { id } = params;
    const {
      newName: name,
      newEmail: email,
      newScholar: scholar,
      newScopus: scopus,
      newOrcid: orcid,
      imgUrl
     } = await req.json();
    await connection();
    await User.findByIdAndUpdate(id, { imgUrl ,name, email, scopus, scholar, orcid});
    return NextResponse.json({ message: "Image URL updated." }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while updating the image URL." },
      { status: 500 }
    );
  }
};