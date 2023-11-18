import { NextResponse } from "next/server";
import { connection } from "@/utils/db";
import Paper from "@/models/Paper";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import User from "@/models/User";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  try {
    const {
      title,
      author1,
      author2,
      author3,
      author4,
      author5,
      dept,
      journal,
      month,
      pubYear,
      issn,
      vol,
      issue,
      pageno,
      doi,
    } = await req.json();

    await connection();
    await Paper.create({
      email,
      title,
      author1,
      author2,
      author3,
      author4,
      author5,
      dept,
      journal,
      month,
      pubYear,
      issn,
      vol,
      issue,
      pageno,
      doi,
    });

    return NextResponse.json({ message: "Paper added." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while submission." },
      { status: 500 }
    );
  }
}

export const GET = async (req) => {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    await connection();
    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const papers = await Paper.find({ dept: user.affiliation });

    return new NextResponse(JSON.stringify(papers), { status: 200 });
  } catch (error) {
    return new NextResponse("Error fetching papers: " + error, { status: 500 });
  }
};